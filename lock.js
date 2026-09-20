/* Face ID (WebAuthn platform authenticator) lock for the OPS DECK tracker.
   Static-site friendly: enrollment creates a platform passkey (Face ID on
   iOS, stored in iCloud Keychain, syncs across the owner's Apple devices);
   unlock authenticates with the stored credential id. No server involved.
   NOTE: this gates the on-device view of the local list. The seed list ships
   inside app.js, so this is a privacy gate, not encryption. */
"use strict";

(function () {
  var LS_KEY = "opsdeck.faceid.lock.v1";
  var SESSION_KEY = "opsdeck.faceid.unlocked.v1";

  var lockState = loadLock();
  var booted = false;
  var pendingBoot = null;
  var availCache = null;

  function loadLock() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) {
        var s = JSON.parse(raw);
        return { enabled: !!s.enabled, credentialId: s.credentialId || null };
      }
    } catch (e) {}
    return { enabled: false, credentialId: null };
  }
  function saveLock() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(lockState)); } catch (e) {}
  }
  function sessionUnlocked() {
    try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch (e) { return false; }
  }
  function setSessionUnlocked(v) {
    try {
      if (v) sessionStorage.setItem(SESSION_KEY, "1");
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  /* --- base64url helpers --- */
  function b64urlEncode(buf) {
    var bytes = new Uint8Array(buf), s = "";
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function b64urlDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";
    var bin = atob(str), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }
  function randomBytes(n) {
    var b = new Uint8Array(n);
    crypto.getRandomValues(b);
    return b;
  }

  function platformAvailable() {
    if (availCache !== null) return Promise.resolve(availCache);
    if (window.isSecureContext && window.PublicKeyCredential &&
        typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === "function") {
      try {
        return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(function (r) {
          availCache = !!r;
          return availCache;
        }).catch(function () { availCache = false; return false; });
      } catch (e) {}
    }
    availCache = false;
    return Promise.resolve(false);
  }

  /* Must be called from a user gesture (WebAuthn requires activation). */
  function enrollFaceID() {
    var opts = { publicKey: {
      challenge: randomBytes(32),
      rp: { name: "OPS DECK Job Tracker", id: location.hostname },
      user: { id: randomBytes(16), name: "operator", displayName: "Operator" },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required", residentKey: "required" },
      timeout: 60000,
      attestation: "none"
    }};
    return navigator.credentials.create(opts).then(function (cred) {
      if (!cred || !cred.rawId) throw new Error("enroll-failed");
      lockState.enabled = true;
      lockState.credentialId = b64urlEncode(cred.rawId);
      saveLock();
      setSessionUnlocked(true);
      return true;
    });
  }

  function unlockFaceID() {
    if (!lockState.credentialId) return Promise.reject(new Error("no-credential"));
    var opts = { publicKey: {
      challenge: randomBytes(32),
      timeout: 60000,
      userVerification: "required",
      allowCredentials: [{ type: "public-key", id: b64urlDecode(lockState.credentialId), transports: ["internal"] }]
    }};
    return navigator.credentials.get(opts).then(function (a) {
      if (!a) throw new Error("auth-failed");
      setSessionUnlocked(true);
      return true;
    });
  }

  /* --- overlay UI --- */
  var screen = document.getElementById("lock-screen");
  var kicker = document.getElementById("lock-kicker");
  var title = document.getElementById("lock-title");
  var sub = document.getElementById("lock-sub");
  var primary = document.getElementById("lock-primary");
  var secondary = document.getElementById("lock-secondary");

  function showOverlay(mode) {
    if (!screen) return;
    if (mode === "locked") {
      kicker.textContent = "SECURE ACCESS";
      title.textContent = "FACE ID LOCK";
      sub.textContent = "This tracker is protected with Face ID. Authenticate to open the Ops Deck.";
      primary.textContent = "UNLOCK WITH FACE ID";
      primary.hidden = false;
      secondary.textContent = "LOCK INFO";
      secondary.hidden = false;
    } else if (mode === "enroll") {
      kicker.textContent = "BIOMETRIC SETUP";
      title.textContent = "ENABLE FACE ID";
      sub.textContent = "Register this device's Face ID as the key to this tracker. You will authenticate once to enroll; afterwards every new visit asks for Face ID.";
      primary.textContent = "ENROLL FACE ID";
      primary.hidden = false;
      secondary.textContent = "NOT NOW";
      secondary.hidden = false;
    } else { /* unsupported */
      kicker.textContent = "UNAVAILABLE";
      title.textContent = "FACE ID NOT SUPPORTED";
      sub.textContent = "This browser or device does not support platform biometrics. Use Safari on iOS 16+ with Face ID enabled, on a secure (https) page.";
      primary.hidden = true;
      secondary.textContent = "CLOSE";
      secondary.hidden = false;
    }
    screen.dataset.mode = mode;
    screen.hidden = false;
    document.body.classList.add("locked");
  }
  function hideOverlay() {
    if (!screen) return;
    screen.hidden = true;
    document.body.classList.remove("locked");
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.hidden = true; }, 2600);
  }

  function refreshButtons() {
    var b1 = document.getElementById("btn-lock");
    var b2 = document.getElementById("btn-faceid");
    if (b1) {
      b1.classList.toggle("is-on", lockState.enabled);
      var label = lockState.enabled ? "Face ID lock is ON — tap to lock now" : "Face ID lock is OFF — tap to enable";
      b1.title = label;
      b1.setAttribute("aria-label", label);
    }
    if (b2) b2.textContent = "FACE ID: " + (lockState.enabled ? "ON" : "OFF");
  }

  function doBoot(boot) {
    if (!booted) { booted = true; boot(); }
    refreshButtons();
  }

  function startEnrollFlow() {
    platformAvailable().then(function (ok) {
      if (!ok) { showOverlay("unsupported"); return; }
      showOverlay("enroll");
    });
  }

  /* overlay buttons */
  if (primary) primary.addEventListener("click", function () {
    var mode = screen ? screen.dataset.mode : "";
    primary.disabled = true;
    if (mode === "enroll") {
      enrollFaceID().then(function () {
        primary.disabled = false;
        hideOverlay();
        refreshButtons();
        toast("FACE ID ENABLED — DEVICE ENROLLED");
      }).catch(function (e) {
        primary.disabled = false;
        toast(e && e.name === "NotAllowedError" ? "ENROLLMENT CANCELLED" : "ENROLLMENT FAILED — TRY AGAIN");
      });
    } else if (mode === "locked") {
      unlockFaceID().then(function () {
        primary.disabled = false;
        hideOverlay();
        refreshButtons();
        if (pendingBoot) { var b = pendingBoot; pendingBoot = null; doBoot(b); }
        toast("UNLOCKED");
      }).catch(function (e) {
        primary.disabled = false;
        toast(e && e.name === "NotAllowedError" ? "FACE ID CANCELLED" : "FACE ID FAILED — TRY AGAIN");
      });
    } else {
      primary.disabled = false;
    }
  });

  if (secondary) secondary.addEventListener("click", function () {
    var mode = screen ? screen.dataset.mode : "";
    if (mode === "locked") {
      toast("LOCK LIVES ON THIS DEVICE — CLEAR SITE DATA TO REMOVE IT");
    } else {
      hideOverlay();
    }
  });

  /* chrome buttons: cmd-bar lock icon + footer toggle */
  var btnLock = document.getElementById("btn-lock");
  if (btnLock) btnLock.addEventListener("click", function () {
    if (!lockState.enabled) { startEnrollFlow(); return; }
    setSessionUnlocked(false);
    pendingBoot = null;
    showOverlay("locked");
  });

  var btnFace = document.getElementById("btn-faceid");
  if (btnFace) btnFace.addEventListener("click", function () {
    if (!lockState.enabled) { startEnrollFlow(); return; }
    if (window.confirm("Remove the Face ID lock from this device?")) {
      lockState = { enabled: false, credentialId: null };
      saveLock();
      setSessionUnlocked(false);
      refreshButtons();
      toast("FACE ID LOCK REMOVED");
    }
  });

  /* gate: app.js calls this with its boot function */
  window.__faceLockGate = function (boot) {
    refreshButtons();
    if (!lockState.enabled) { doBoot(boot); return; }
    if (sessionUnlocked()) { doBoot(boot); return; }
    pendingBoot = boot;
    showOverlay("locked");
  };
})();
