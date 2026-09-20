/* Job Application Tracker — Jayanth Pasupuleti
   Plain JS, no dependencies. State persists in localStorage. */

"use strict";

/* ---------------- Profile & quick facts ---------------- */
const PROFILE = {
  name: "Jayanth Pasupuleti",
  title: "Senior Data Engineer",
  location: "Dayton, OH — open to anywhere in the US (remote / hybrid / relocate)",
  auth: "STEM OPT — authorized, E-Verify employer required",
  salary: "$110,000 target",
  availability: "Immediate",
  email: "pasupuletij398@gmail.com",
  linkedin: "linkedin.com/in/pjayanth3998",
  linkedinUrl: "https://www.linkedin.com/in/pjayanth3998",
  skills: ["Python", "SQL", "PySpark", "Databricks", "Delta Lake", "Snowflake", "dbt", "Kafka", "Airflow", "AWS", "Azure", "GCP", "DataStage", "SSIS"]
};

const QUICK_FACTS = [
  { label: "Email", value: "pasupuletij398@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/pjayanth3998" },
  { label: "Work authorization", value: "STEM OPT — authorized to work, E-Verify employer required, no sponsorship needed" },
  { label: "Salary expectation", value: "$110,000" },
  { label: "Start date", value: "Immediately" },
  { label: "Veteran status", value: "No" },
  { label: "Disability", value: "No" },
  { label: "Previously employed here", value: "No — fresh applicant" }
];

/* ---------------- Preloaded applications ----------------
   status: not-applied | applied | screening | interview | offer | on-hold | rejected
   priority: High | Medium | Low                                            */
const DEFAULT_APPS = [
  // ---- Round 1, Tier 1 ----
  { id: "r1-01", company: "Motion Recruitment Partners", title: "Senior Data Engineer (Insurance Data Migration Specialist)", location: "Remote US", pay: "$140–180k/yr", board: "Dice", url: "https://www.dice.com/job-detail/086e09b8-2393-4b8b-ac2b-6fd4d22f9737", dateAdded: "2026-09-20", status: "on-hold", priority: "Medium", remote: true, tailored: true, notes: "Insurance data migration + bank conversion background = strong domain fit. ON HOLD: posting requires Canada work authorization." },
  { id: "r1-02", company: "Optum (UnitedHealth Group)", title: "Senior Cloud Data Engineer – Remote", location: "Remote US", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Posted 2 days ago. Healthcare domain fits Cigna background. Verify sponsorship language." },
  { id: "r1-03", company: "Saransh Inc", title: "Senior/Lead Data Engineer – Remote (US), W2 only", location: "Remote US", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Posted 3 days ago. W2-only staffing. Ask: E-Verify enrolled + will complete the I-983 training plan?" },
  { id: "r1-04", company: "MSRcosmos LLC", title: "Senior Data Engineer (ETL / Python)", location: "Remote US", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Posted 1 day ago — very fresh. ETL/Python is a core fit. Verify sponsorship language." },
  { id: "r1-05", company: "JPMorgan Chase", title: "Software Engineer II: Data Engineer", location: "Jersey City, NJ", pay: "", board: "JPMC Careers", url: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210790994", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: false, notes: "Posted Sep 15. Banking giant; E-Verify enrolled. Sponsorship language not visible — verify." },
  { id: "r1-06", company: "Gifthealth", title: "Senior Data Engineer", location: "Columbus, OH", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted 5–6 days ago. Local to Ohio." },
  { id: "r1-07", company: "Bank of America", title: "Senior Data Engineer", location: "Charlotte, NC", pay: "", board: "The Muse", url: "https://www.themuse.com/hiring/location/charlotte-nc/keyword/senior-data-domain-architect/", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted Sep 10. E-Verify enrolled; typically no sponsorship — verify OPT stance." },
  { id: "r1-08", company: "Bank of America", title: "Senior Data Streaming Engineer", location: "Charlotte, NC", pay: "", board: "The Muse", url: "https://www.themuse.com/hiring/location/charlotte-nc/keyword/senior-data-domain-architect/", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted Sep 16. Streaming focus: Kafka/Event Hubs, 1M+ records/hr." },
  { id: "r1-09", company: "U.S. Bank", title: "Senior Data Engineering Specialist", location: "Charlotte, NC", pay: "", board: "career.io", url: "https://career.io/job/senior-data-engineering-specialist-charlotte-us-bank-81fec3000f21a5b4a8c0", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: true, notes: "Snowflake + Databricks, on-prem → Azure migration. Lists 10+ yrs (stretch — he has 7+). Verify sponsorship language." },
  { id: "r1-10", company: "DTCC", title: "Senior Data Engineer – Data Warehousing / Python / AI", location: "Tampa, FL", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "~2 weeks ago, 'Actively Hiring'. Financial market infrastructure. Sponsorship unknown — verify." },
  { id: "r1-11", company: "Trexquant Investment LP", title: "Senior Data Engineer", location: "Stamford, CT", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted 3 days ago. Hedge fund. Sponsorship unknown — verify." },
  { id: "r1-12", company: "New York Life Insurance", title: "Senior Associate, Data Engineer", location: "White Plains, NY (onsite)", pay: "$137.5–171.5k/yr", board: "Built In", url: "https://builtin.com/job/senior-associate-data-engineer-white-plains-new-york/9034504", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: true, notes: "Req ID 93788. Insurance domain fit. No sponsorship language — verify OPT stance." },
  { id: "r1-13", company: "Triumph", title: "Sr. Data Engineer – Data Platform", location: "Remote US / Dallas, TX", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Posted 2 weeks ago. Remote-friendly. Sponsorship unknown — verify." },
  { id: "r1-14", company: "Motion Recruitment (bank client)", title: "Sr. Data Engineer / Ab Initio Developer", location: "Charlotte, NC (hybrid)", pay: "$53.56–60.35/hr", board: "Motion Recruitment", url: "https://motionrecruitment.com/tech-jobs/charlotte/contract/senior-data-engineer-ab-initio-developer/884151", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted ~4 hrs ago — very fresh. 12-mo contract. Python/PySpark + Airflow direction. Confirm agency E-Verify + I-983." },
  { id: "r1-15", company: "KnackHook (staffing)", title: "Senior Data Engineer", location: "Columbus, OH / New York, NY", pay: "$60–65/hr", board: "Dice", url: "https://www.dice.com/job-detail/04174a66-968e-44fc-adbc-979d44a8fea7", dateAdded: "2026-09-20", status: "not-applied", priority: "Low", remote: false, tailored: false, notes: "12-mo contract, posted 3 days ago. Financial experience preferred, PySpark. Asks 12+ yrs (he has 7+) — stretch, staffing roles flex." },

  // ---- Round 2 ----
  { id: "r2-01", company: "Pie Insurance", title: "Senior Data Engineer", location: "Remote US", pay: "$140–175k/yr", board: "Built In", url: "https://builtin.com/job/senior-data-engineer/11028851", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Posted ~1–2 weeks ago. Python, SQL, Airflow, Snowflake, Data Vault 2.0. Excellent insurance fit. E-VERIFY CONFIRMED." },
  { id: "r2-02", company: "Eve", title: "Senior Data Engineer", location: "Remote US", pay: "$185–245k/yr", board: "DreamWorkHQ", url: "https://www.dreamworkhq.com/job/3df7767e-e3fd-4645-8f4c-3063bcb3fc75", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Listed Sep 20. Medallion architecture on Terraform-managed Snowflake; dbt orchestration, SCD patterns. 5+ yrs required — matches. Banking background fits regulated-data nice-to-have." },
  { id: "r2-03", company: "Render", title: "Senior/Staff Data Engineer", location: "Remote US/Canada", pay: "$195–268k/yr", board: "DreamWorkHQ", url: "https://www.dreamworkhq.com/job/3086d44e-ec43-4de5-bd13-e72238e42b33", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Listed Sep 20. High bar but worth an application at senior level. Verify apply path via render.com careers." },
  { id: "r2-04", company: "Travelers", title: "Emerging Technology Senior Engineer", location: "Hartford, CT (hybrid)", pay: "$139–230k/yr", board: "Travelers Careers", url: "https://careers.travelers.com/job/23629483/emerging-technology-senior-engineer-hartford-ct/", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: false, notes: "Indexed Sep 20. Databricks, Snowflake, ETL/AWS. Direct insurance match. Confirm requisition title before applying." },
  { id: "r2-05", company: "Fiserv", title: "Senior Data Engineer", location: "Fintech", pay: "", board: "Built In", url: "https://Builtin.com/job/senior-data-engineer/4448520", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: false, notes: "Snowflake, dbt, Stitch, Looker. Payments domain fits banking background. Verify location eligibility and authorization language." },
  { id: "r2-06", company: "Synchrony", title: "AVP, Senior Data Engineer", location: "Flexible / home near hub", pay: "$100–170k/yr", board: "Built In", url: "https://builtin.com/job/avp-senior-data-engineer/11183452", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Credit-card/banking/fintech experience preferred. Spark, Kafka, Hadoop, Oracle/MySQL. Verify OPT/sponsorship stance." },
  { id: "r2-07", company: "Block / Cash App", title: "Senior Data Engineer, Risk", location: "Remote possibilities", pay: "", board: "Built In", url: "https://builtin.Com/job/senior-data-engineer-risk/10049629", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Compliance and financial-risk pipelines, data modeling, ETL, quality and lineage. Verify exact US location, pay, and authorization." },
  { id: "r2-08", company: "Block / Cash App", title: "Senior Business Intelligence Engineer, Financial Platform", location: "Remote possibilities", pay: "", board: "Built In", url: "https://Builtin.com/job/senior-business-intelligence-engineer-financial-platform/3795903", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Financial data engineering, ETL, modeling. Verify the posting is current." },
  { id: "r2-09", company: "Forbright Bank", title: "Senior Data Engineer", location: "Remote / hybrid", pay: "~$140–156k/yr", board: "Built In", url: "https://builtin.com/job/senior-data-engineer/8791572", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Snowflake, dbt/Coalesce, medallion, Airflow, Terraform; banking experience preferred, 6+ yrs. Posting may be older — verify it's still active." },
  { id: "r2-10", company: "Liberty Mutual", title: "Senior Data Engineer", location: "Plano, TX (up to 100% telecommute)", pay: "", board: "Liberty Mutual Careers", url: "https://searchjobs.libertymutualgroup.com/careers/job/618498843430-senior-data-engineer-plano-texas-united-states?domain=libertymutual.com&microsite=libertymutual.com", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "AWS, S3, Athena, Snowflake, Informatica, data modeling. Insurance match. Posting metadata looked old — verify active status." },
  { id: "r2-11", company: "Motion Recruitment", title: "Senior Data Engineer | DBT Specialist", location: "Remote US", pay: "", board: "Dice", url: "https://www.dice.com/job-detail/b8557d06-2d2f-4560-98e4-319a91599bc5", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "7+ yrs DE, 3+ yrs dbt, Snowflake/Databricks/Python — near-perfect stack match. Auth language ambiguous for OPT — ask about E-Verify + I-983." },
  { id: "r2-12", company: "Robert Half (client)", title: "Senior Data Engineer", location: "Remote (PST/CST preferred)", pay: "$65–75/hr", board: "Robert Half", url: "https://www.roberthalf.com/us/en/job/seattle-wa/data-engineer/04410-0013498203-usen", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "6-mo W2 contract. Databricks, PySpark, medallion, Unity Catalog, Power BI. Verify active. Confirm Robert Half E-Verify enrollment + I-983." },
  { id: "r2-13", company: "Tongo Financial", title: "Senior Data Engineer", location: "Remote", pay: "", board: "Jaabz", url: "https://jaabz.com/jobs/120233-data-engineer-remote", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Airflow, AWS, Kafka/Kinesis, banking integrations, regulated financial data. Verify location eligibility, pay, and authorization." },
  { id: "r2-14", company: "Roberts Recruiting (client)", title: "Senior Data Engineer (Remote)", location: "Remote (Boston HQ)", pay: "", board: "CATS", url: "https://robertsrecruiting.catsone.com/careers/33035-General/jobs/15700835-Senior-Data-Engineer-Remote", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Health-equity/SDOH data platform. Healthcare domain fits Cigna background. Verify employer identity and E-Verify status." },
  { id: "r2-15", company: "Paradigm62", title: "Senior Data Engineer", location: "Remote", pay: "~$72–103k/yr", board: "web3.career", url: "https://web3.career/senior-data-engineer-paradigm62/87441", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "7+ yrs, Snowflake, Airflow/dbt, AWS, Kafka/Kinesis. Verify employer identity, US eligibility, and authorization stance." },
  { id: "r2-16", company: "Allstate", title: "Senior Data Engineer Con II", location: "Remote / Illinois", pay: "$91–154k/yr", board: "Allstate Jobs", url: "https://www.allstate.jobs/job/23885496/senior-data-engineer-con-ii-illinois-city-il", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Indexed Sep 20. Spark, Python, SQL, Microsoft Fabric, medallion. 'Generally does not sponsor' — verify how STEM OPT is treated." },
  { id: "r2-17", company: "Allstate", title: "Data Engineer Senior Consultant", location: "Remote", pay: "$70.1–121.5k/yr", board: "Dice", url: "https://www.dice.com/job-detail/87d35c2c-1161-4dd7-a21a-b2e2d44131b6", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "SQL, Python, data models, quality frameworks, Microsoft Fabric; insurance preferred. Same sponsorship caveat — verify." },
  { id: "r2-18", company: "Eve", title: "Staff Data Engineer", location: "Remote US", pay: "$220–300k/yr", board: "DreamWorkHQ", url: "https://www.dreamworkhq.com/job/d6cabc06-3620-4f44-8682-d6e57d8d2d58", dateAdded: "2026-09-20", status: "not-applied", priority: "Low", remote: true, tailored: false, notes: "Listed Sep 20. Snowflake admin, RBAC, medallion, observability; sets technical direction. Staff-level — stretch." },
  { id: "r2-19", company: "Netsynk", title: "Senior Data Engineer", location: "Remote (NYC/East Coast preferred)", pay: "", board: "Dice", url: "https://www.dice.com/job-detail/936f8801-5ed0-4b7e-af37-bb0f83f30c5a", dateAdded: "2026-09-20", status: "not-applied", priority: "Low", remote: true, tailored: false, notes: "Contract through Jun 2027. Capital markets, ETL, SQL Server, AWS, messaging. Asks 10+ yrs (he has 7+) — stretch." },
  { id: "r2-20", company: "Neurasol", title: "Senior Data Engineer", location: "Remote", pay: "", board: "Dice", url: "https://www.dice.com/job-detail/c6805630-b582-43f6-971d-c0c48dbca259", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "12-mo contract. dbt Cloud, Snowflake, SQL/Oracle/SSIS migration — SSIS background directly relevant. Asks 8+ yrs; listing may be old — verify active." }
];

/* ---------------- Constants ---------------- */
const STAGE_ORDER = ["not-applied", "applied", "screening", "interview", "offer"];
const STAGE_LABELS = {
  "not-applied": "Not applied", "applied": "Applied", "screening": "Screening",
  "interview": "Interview", "offer": "Offer", "on-hold": "On hold", "rejected": "Rejected"
};
const PRIO_RANK = { High: 3, Medium: 2, Low: 1 };
const LS_KEY = "jp-job-tracker-v1";

/* ---------------- State ---------------- */
let apps = loadApps();
let editingId = null;
const filters = { q: "", status: "all", priority: "all", remote: false };
let sortBy = "priority";

/* ---------------- Persistence ---------------- */
function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

function loadApps() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) { /* storage unavailable — use defaults */ }
  return deepCopy(DEFAULT_APPS);
}

function saveApps() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(apps)); }
  catch (e) { toast("Couldn't save — browser storage unavailable"); }
}

/* ---------------- Helpers ---------------- */
function $(sel) { return document.querySelector(sel); }

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return esc(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

let toastTimer = null;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.hidden = true; }, 2200);
}

function copyText(text) {
  function fallback() {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Copied"); }
    catch (e) { toast("Copy failed"); }
    document.body.removeChild(ta);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      function () { toast("Copied"); },
      function () { fallback(); }
    );
  } else { fallback(); }
}

/* ---------------- Render: profile ---------------- */
function renderProfile() {
  $("#p-name").textContent = PROFILE.name;
  $("#p-title").textContent = PROFILE.title;
  $("#p-location").textContent = PROFILE.location;
  $("#p-auth").textContent = PROFILE.auth;
  $("#p-salary").textContent = PROFILE.salary;
  $("#p-avail").textContent = PROFILE.availability;
  const em = $("#p-email"); em.textContent = PROFILE.email; em.href = "mailto:" + PROFILE.email;
  const li = $("#p-linkedin"); li.textContent = PROFILE.linkedin; li.href = PROFILE.linkedinUrl;
  $("#p-skills").innerHTML = PROFILE.skills.map(function (s) {
    return '<span class="skill-tag">' + esc(s) + "</span>";
  }).join("");
}

/* ---------------- Render: quick facts ---------------- */
function renderFacts() {
  $("#facts-grid").innerHTML = QUICK_FACTS.map(function (f, i) {
    return '<button class="fact" data-fact="' + i + '">' +
      '<span><span class="fact-label">' + esc(f.label) + '</span>' +
      '<span class="fact-value">' + esc(f.value) + '</span></span>' +
      '<span class="copy-icon" aria-hidden="true">&#10697;</span>' +
      "</button>";
  }).join("");
}

/* ---------------- Filtering / sorting ---------------- */
function visibleApps() {
  const q = filters.q.trim().toLowerCase();
  let list = apps.filter(function (a) {
    if (filters.status !== "all" && a.status !== filters.status) return false;
    if (filters.priority !== "all" && a.priority !== filters.priority) return false;
    if (filters.remote && !a.remote) return false;
    if (q) {
      const hay = [a.company, a.title, a.location, a.pay, a.board, a.notes]
        .map(function (x) { return String(x || "").toLowerCase(); }).join(" ");
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
  list.sort(function (a, b) {
    if (sortBy === "company") return String(a.company).localeCompare(String(b.company));
    if (sortBy === "date") {
      const d = String(b.dateAdded || "").localeCompare(String(a.dateAdded || ""));
      if (d !== 0) return d;
      return String(a.company).localeCompare(String(b.company));
    }
    // priority
    const p = (PRIO_RANK[b.priority] || 0) - (PRIO_RANK[a.priority] || 0);
    if (p !== 0) return p;
    return String(a.company).localeCompare(String(b.company));
  });
  return list;
}

/* ---------------- Render: dashboard ---------------- */
function renderDashboard() {
  const total = apps.length;
  const applied = apps.filter(function (a) { return STAGE_ORDER.indexOf(a.status) > 0; }).length;
  const active = apps.filter(function (a) { return a.status === "screening" || a.status === "interview"; }).length;
  const offers = apps.filter(function (a) { return a.status === "offer"; }).length;
  const responded = apps.filter(function (a) {
    return a.status === "screening" || a.status === "interview" || a.status === "offer";
  }).length;
  const rate = applied ? Math.round((responded / applied) * 100) : 0;

  $("#stat-cards").innerHTML = [
    { num: total, label: "Tracked", cls: "" },
    { num: applied, label: "Applied", cls: "accent" },
    { num: active, label: "Active interviews", cls: "accent" },
    { num: offers, label: "Offers", cls: "good" },
    { num: rate + "%", label: "Response rate", cls: "good" }
  ].map(function (s) {
    return '<div class="stat ' + s.cls + '"><span class="stat-num">' + s.num +
      '</span><span class="stat-label">' + s.label + "</span></div>";
  }).join("");

  const stages = [
    { id: "not-applied", color: "#93a1b8" },
    { id: "applied", color: "#22d3ee" },
    { id: "screening", color: "#fbbf24" },
    { id: "interview", color: "#a78bfa" },
    { id: "offer", color: "#34d399" }
  ];
  $("#funnel").innerHTML = stages.map(function (st) {
    const n = apps.filter(function (a) { return a.status === st.id; }).length;
    const pct = total ? Math.max(1, Math.round((n / total) * 100)) : 0;
    const width = total ? (n / total) * 100 : 0;
    return '<div class="funnel-row"><span class="f-label">' + STAGE_LABELS[st.id] + "</span>" +
      '<div class="f-bar"><div style="width:' + width + "%;background:" + st.color + '"></div></div>' +
      '<span class="f-count">' + n + "</span></div>";
  }).join("");
}

/* ---------------- Render: app list ---------------- */
function renderList() {
  const list = visibleApps();
  const box = $("#app-list");
  $("#result-count").textContent = "Showing " + list.length + " of " + apps.length + " applications";

  if (!list.length) {
    box.innerHTML = '<div class="empty-state">No applications match these filters.<br>Try clearing the search or add a new one.</div>';
    return;
  }

  box.innerHTML = list.map(function (a) {
    const stLabel = STAGE_LABELS[a.status] || a.status;
    const canAdvance = STAGE_ORDER.indexOf(a.status) !== -1 && STAGE_ORDER.indexOf(a.status) < STAGE_ORDER.length - 1;
    const badgeTitle = canAdvance
      ? "Click to advance to " + STAGE_LABELS[STAGE_ORDER[STAGE_ORDER.indexOf(a.status) + 1]]
      : "Status: " + stLabel;
    return '<article class="app-card prio-card-' + esc(a.priority) + '" data-id="' + esc(a.id) + '">' +
      '<div class="card-top"><div>' +
        '<div class="company">' + esc(a.company) + "</div>" +
        "<h3>" + esc(a.title) + "</h3>" +
      "</div>" +
      '<button class="status-badge st-' + esc(a.status) + '" data-advance="' + esc(a.id) + '" title="' + esc(badgeTitle) + '">' +
        esc(stLabel) + (canAdvance ? " &#9656;" : "") + "</button>" +
      "</div>" +
      '<div class="card-meta">' +
        (a.location ? "<span>&#128205; " + esc(a.location) + "</span>" : "") +
        (a.pay ? "<span>&#128176; " + esc(a.pay) + "</span>" : "") +
        (a.board ? "<span>&#128193; " + esc(a.board) + "</span>" : "") +
        '<span class="prio prio-' + esc(a.priority) + '">' + esc(a.priority) + " priority</span>" +
        (a.tailored ? '<span class="tailored-flag">&#10003; Tailored resume ready</span>' : "") +
      "</div>" +
      (a.notes ? '<div class="card-notes">' + esc(a.notes) + "</div>" : "") +
      '<div class="card-foot">' +
        (a.url ? '<a class="btn btn-sm btn-accent" href="' + esc(a.url) + '" target="_blank" rel="noopener">Apply</a>' : "") +
        '<button class="icon-btn" data-edit="' + esc(a.id) + '">Edit</button>' +
        '<button class="icon-btn" data-del="' + esc(a.id) + '">Delete</button>' +
        '<span class="date">Added ' + fmtDate(a.dateAdded) + "</span>" +
      "</div>" +
    "</article>";
  }).join("");
}

function renderAll() {
  renderDashboard();
  renderList();
}

/* ---------------- Status advance ---------------- */
function advanceStatus(id) {
  const app = apps.find(function (a) { return a.id === id; });
  if (!app) return;
  const i = STAGE_ORDER.indexOf(app.status);
  if (i === -1 || i >= STAGE_ORDER.length - 1) return;
  app.status = STAGE_ORDER[i + 1];
  saveApps();
  renderAll();
  toast(app.company + " → " + STAGE_LABELS[app.status]);
}

/* ---------------- Modal ---------------- */
const backdrop = $("#modal-backdrop");
const form = $("#app-form");

function openModal(mode, id) {
  editingId = mode === "edit" ? id : null;
  $("#modal-title").textContent = mode === "edit" ? "Edit application" : "Add application";
  $("#btn-delete").hidden = mode !== "edit";
  form.reset();
  if (mode === "edit") {
    const a = apps.find(function (x) { return x.id === id; });
    if (!a) return;
    form.company.value = a.company || "";
    form.title.value = a.title || "";
    form.location.value = a.location || "";
    form.pay.value = a.pay || "";
    form.board.value = a.board || "";
    form.url.value = a.url || "";
    form.status.value = a.status || "not-applied";
    form.priority.value = a.priority || "Medium";
    form.dateAdded.value = a.dateAdded || "";
    form.remote.checked = !!a.remote;
    form.tailored.checked = !!a.tailored;
    form.notes.value = a.notes || "";
  } else {
    form.dateAdded.value = "2026-09-20";
  }
  backdrop.hidden = false;
  form.company.focus();
}

function closeModal() {
  backdrop.hidden = true;
  editingId = null;
}

function collectForm() {
  return {
    company: form.company.value.trim(),
    title: form.title.value.trim(),
    location: form.location.value.trim(),
    pay: form.pay.value.trim(),
    board: form.board.value.trim(),
    url: form.url.value.trim(),
    status: form.status.value,
    priority: form.priority.value,
    dateAdded: form.dateAdded.value || new Date().toISOString().slice(0, 10),
    remote: form.remote.checked,
    tailored: form.tailored.checked,
    notes: form.notes.value.trim()
  };
}

function genId() {
  return "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ---------------- Export / import / reset ---------------- */
function exportJSON() {
  const blob = new Blob([JSON.stringify(apps, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "job-applications-" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast("Exported " + apps.length + " applications");
}

function importJSON(file) {
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const parsed = JSON.parse(reader.result);
      if (!Array.isArray(parsed)) throw new Error("not an array");
      const valid = parsed.filter(function (x) {
        return x && typeof x.company === "string" && typeof x.title === "string";
      }).map(function (x, i) {
        return {
          id: typeof x.id === "string" && x.id ? x.id : genId() + "-" + i,
          company: x.company, title: x.title,
          location: x.location || "", pay: x.pay || "", board: x.board || "",
          url: x.url || "", dateAdded: x.dateAdded || new Date().toISOString().slice(0, 10),
          status: STAGE_LABELS[x.status] ? x.status : "not-applied",
          priority: ["High", "Medium", "Low"].indexOf(x.priority) !== -1 ? x.priority : "Medium",
          remote: !!x.remote, tailored: !!x.tailored, notes: x.notes || ""
        };
      });
      apps = valid;
      saveApps();
      renderAll();
      toast("Imported " + valid.length + " applications");
    } catch (e) {
      toast("Import failed — not a valid JSON file");
    }
  };
  reader.readAsText(file);
}

function resetDefaults() {
  if (!confirm("Reset everything to the original 35 preloaded applications? Your edits will be lost.")) return;
  try { localStorage.removeItem(LS_KEY); } catch (e) {}
  apps = deepCopy(DEFAULT_APPS);
  saveApps();
  renderAll();
  toast("Reset to defaults");
}

/* ---------------- Events ---------------- */
function bindEvents() {
  $("#facts-grid").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-fact]");
    if (btn) copyText(QUICK_FACTS[+btn.getAttribute("data-fact")].value);
  });

  $("#filter-q").addEventListener("input", function (e) { filters.q = e.target.value; renderList(); });
  $("#filter-status").addEventListener("change", function (e) { filters.status = e.target.value; renderList(); });
  $("#filter-priority").addEventListener("change", function (e) { filters.priority = e.target.value; renderList(); });
  $("#filter-remote").addEventListener("change", function (e) { filters.remote = e.target.checked; renderList(); });
  $("#sort-by").addEventListener("change", function (e) { sortBy = e.target.value; renderList(); });

  $("#app-list").addEventListener("click", function (e) {
    const adv = e.target.closest("[data-advance]");
    if (adv) { advanceStatus(adv.getAttribute("data-advance")); return; }
    const ed = e.target.closest("[data-edit]");
    if (ed) { openModal("edit", ed.getAttribute("data-edit")); return; }
    const del = e.target.closest("[data-del]");
    if (del) {
      const id = del.getAttribute("data-del");
      const app = apps.find(function (x) { return x.id === id; });
      if (app && confirm('Delete "' + app.title + '" at ' + app.company + "?")) {
        apps = apps.filter(function (x) { return x.id !== id; });
        saveApps(); renderAll(); toast("Deleted");
      }
    }
  });

  $("#btn-add").addEventListener("click", function () { openModal("add"); });
  $("#btn-cancel").addEventListener("click", closeModal);
  backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !backdrop.hidden) closeModal(); });

  $("#btn-delete").addEventListener("click", function () {
    const app = apps.find(function (x) { return x.id === editingId; });
    if (app && confirm('Delete "' + app.title + '" at ' + app.company + "?")) {
      apps = apps.filter(function (x) { return x.id !== editingId; });
      saveApps(); renderAll(); closeModal(); toast("Deleted");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = collectForm();
    if (!data.company || !data.title) { toast("Company and role title are required"); return; }
    if (editingId) {
      const app = apps.find(function (x) { return x.id === editingId; });
      if (app) Object.assign(app, data);
      toast("Updated");
    } else {
      data.id = genId();
      apps.unshift(data);
      toast("Added");
    }
    saveApps(); renderAll(); closeModal();
  });

  $("#btn-export").addEventListener("click", exportJSON);
  $("#btn-import").addEventListener("click", function () { $("#import-file").click(); });
  $("#import-file").addEventListener("change", function (e) {
    if (e.target.files && e.target.files[0]) importJSON(e.target.files[0]);
    e.target.value = "";
  });
  $("#btn-reset").addEventListener("click", resetDefaults);
}

/* ---------------- Init ---------------- */
renderProfile();
renderFacts();
bindEvents();
renderAll();
