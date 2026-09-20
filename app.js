/* Job Application Tracker — Jayanth Pasupuleti
   iOS 27 Liquid Glass edition. Plain JS, no dependencies.
   Seed data is versioned: bumping DATA_VERSION merges new/changed seed
   entries into every visitor's saved list (localStorage) without wiping
   their own additions or status changes. */

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

/* Bump this whenever DEFAULT_APPS changes so saved lists get the update. */
const DATA_VERSION = 2;

/* ---------------- Preloaded applications ----------------
   status: not-applied | applied | screening | interview | offer | on-hold | rejected
   priority: High | Medium | Low                                            */
const DEFAULT_APPS = [
  // ---- Round 1, Tier 1 ----
  { id: "r1-01", company: "Motion Recruitment Partners", title: "Senior Data Engineer (Insurance Data Migration Specialist)", location: "Remote US", pay: "$140–180k/yr", board: "Dice", url: "https://www.dice.com/job-detail/086e09b8-2393-4b8b-ac2b-6fd4d22f9737", dateAdded: "2026-09-20", status: "on-hold", priority: "Medium", remote: true, tailored: true, notes: "Insurance data migration + bank conversion background = strong domain fit. ON HOLD: posting requires Canada work authorization." },
  { id: "r1-02", company: "Optum (UnitedHealth Group)", title: "Senior Cloud Data Engineer – Remote", location: "Remote US", pay: "$91.7–163.7k/yr", board: "UnitedHealth Careers (own ATS)", url: "https://careers.unitedhealthgroup.com/job/eden-prairie/senior-cloud-data-engineer-remote/34088/100095605792", dateAdded: "2026-09-20", status: "on-hold", priority: "High", remote: true, tailored: false, notes: "Req 2383492. Vetted Sep 20: active, no OPT exclusion, E-Verify poster on UHG site, target pay in range, fit OK. ON HOLD: UHG Taleo already has an account for his email — guest apply blocked. Awaiting his login or reset decision." },
  { id: "r1-03", company: "Saransh Inc", title: "Senior/Lead Data Engineer – Remote (US), W2 only", location: "Remote US", pay: "", board: "Saransh Careers (own site)", url: "https://saranshinc.com/careers/?job_id=z5G7h3l6a1kMvyS65NP3c4dzsSltAQLnjdlfVN8pWOU=", dateAdded: "2026-09-20", status: "on-hold", priority: "Medium", remote: true, tailored: false, notes: "Job JPC-4519. Vetted Sep 20: active, no OPT exclusion, fit OK (stretch: Spanner/Neo4j/Terraform). ON HOLD: E-Verify enrollment not found in official search — mandatory for STEM OPT. Resume if E-Verify/I-983 confirmed directly." },
  { id: "r1-04", company: "MSRcosmos LLC", title: "Senior Data Engineer (ETL / Python)", location: "Remote US", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "on-hold", priority: "High", remote: true, tailored: false, notes: "MANUAL LIST: LinkedIn Easy Apply only — Jayanth applies himself (never via Easy Apply). Vetted Sep 20: active, no OPT exclusion, E-Verify enrolled (Jun 2024), fit OK." },
  { id: "r1-05", company: "JPMorgan Chase", title: "Data Engineer III - Python/SQL", location: "Plano, TX", pay: "", board: "JPMC Careers (own ATS)", url: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210736986", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: false, notes: "Job 210736986 (posted Aug 27; original ref 210790994 closed). Vetted Sep 20: active, no OPT exclusion, E-Verify enrolled, strong fit. IN PROGRESS: 6-digit identity code sent to email Sep 20 (expires in 10 min) — needs a fresh code from Jayanth or browser takeover before continuing. Nothing submitted yet." },
  { id: "r1-06", company: "Gifthealth", title: "Senior Data Engineer", location: "Columbus, OH", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted 5–6 days ago. Local to Ohio." },
  { id: "r1-07", company: "Bank of America", title: "Senior Data Engineer", location: "Charlotte, NC", pay: "", board: "The Muse", url: "https://www.themuse.com/hiring/location/charlotte-nc/keyword/senior-data-domain-architect/", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted Sep 10. E-Verify enrolled; typically no sponsorship — verify OPT stance." },
  { id: "r1-08", company: "Bank of America", title: "Senior Data Streaming Engineer", location: "Charlotte, NC", pay: "", board: "The Muse", url: "https://www.themuse.com/hiring/location/charlotte-nc/keyword/senior-data-domain-architect/", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted Sep 16. Streaming focus: Kafka/Event Hubs, 1M+ records/hr." },
  { id: "r1-09", company: "U.S. Bank", title: "Senior Data Engineering Specialist", location: "Charlotte, NC", pay: "", board: "career.io (reference only)", url: "https://career.io/job/senior-data-engineering-specialist-charlotte-us-bank-81fec3000f21a5b4a8c0", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: true, notes: "CLOSED: posting not found on careers.usbank.com Sep 20 (reference link now 404; only stale mirrors remain). No application submitted, no account created. Snowflake+Databricks, Azure migration; lists 10+ yrs (stretch — he has 7+)." },
  { id: "r1-10", company: "DTCC", title: "Senior Data Engineer – Data Warehousing / Python / AI", location: "Tampa, FL", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "~2 weeks ago, 'Actively Hiring'. Financial market infrastructure. Sponsorship unknown — verify." },
  { id: "r1-11", company: "Trexquant Investment LP", title: "Senior Data Engineer", location: "Stamford, CT", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted 3 days ago. Hedge fund. Sponsorship unknown — verify." },
  { id: "r1-12", company: "New York Life Insurance", title: "Senior Associate, Data Engineer", location: "White Plains, NY (onsite)", pay: "$137.5–171.5k/yr", board: "Built In", url: "https://builtin.com/job/senior-associate-data-engineer-white-plains-new-york/9034504", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: true, notes: "Req ID 93788. Insurance domain fit. No sponsorship language — verify OPT stance." },
  { id: "r1-13", company: "Triumph", title: "Sr. Data Engineer – Data Platform", location: "Remote US / Dallas, TX", pay: "", board: "LinkedIn", url: "https://www.linkedin.com/jobs/senior-data-engineer-jobs", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Posted 2 weeks ago. Remote-friendly. Sponsorship unknown — verify." },
  { id: "r1-14", company: "Motion Recruitment (bank client)", title: "Sr. Data Engineer / Ab Initio Developer", location: "Charlotte, NC (hybrid)", pay: "$53.56–60.35/hr", board: "Motion Recruitment", url: "https://motionrecruitment.com/tech-jobs/charlotte/contract/senior-data-engineer-ab-initio-developer/884151", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Posted ~4 hrs ago — very fresh. 12-mo contract. Python/PySpark + Airflow direction. Confirm agency E-Verify + I-983." },
  { id: "r1-15", company: "KnackHook (staffing)", title: "Senior Data Engineer", location: "Columbus, OH / New York, NY", pay: "$60–65/hr", board: "Dice", url: "https://www.dice.com/job-detail/04174a66-968e-44fc-adbc-979d44a8fea7", dateAdded: "2026-09-20", status: "not-applied", priority: "Low", remote: false, tailored: false, notes: "12-mo contract, posted 3 days ago. Financial experience preferred, PySpark. Asks 12+ yrs (he has 7+) — stretch, staffing roles flex." },

  // ---- Round 2 ----
  { id: "r2-01", company: "Pie Insurance", title: "Senior Data Engineer", location: "Remote US", pay: "$140–175k/yr", board: "Built In", url: "https://builtin.com/job/senior-data-engineer/11028851", dateAdded: "2026-09-20", status: "applied", priority: "High", remote: true, tailored: false, appliedDate: "2026-09-20", notes: "SUBMITTED Sep 20, 2026 via Greenhouse. Python, SQL, Airflow, Snowflake, Data Vault 2.0. Excellent insurance fit. E-VERIFY CONFIRMED." },
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
  { id: "r2-16", company: "Allstate", title: "Senior Data Engineer Con II", location: "Remote / Illinois", pay: "$91–154k/yr", board: "Allstate Careers", url: "https://www.allstate.jobs/job/23885496/senior-data-engineer-con-ii-illinois-city-il", dateAdded: "2026-09-20", status: "applied", priority: "Medium", remote: true, tailored: false, appliedDate: "2026-09-20", notes: "APPLIED Sep 20, 2026 via Workday (confirmation R35191). Spark, Python, SQL, Microsoft Fabric, medallion. STEM OPT stance to verify if they respond." },
  { id: "r2-17", company: "Allstate", title: "Data Engineer Senior Consultant", location: "Remote", pay: "$70.1–121.5k/yr", board: "Dice", url: "https://www.dice.com/job-detail/87d35c2c-1161-4dd7-a21a-b2e2d44131b6", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "SQL, Python, data models, quality frameworks, Microsoft Fabric; insurance preferred. Same sponsorship caveat — verify." },
  { id: "r2-18", company: "Eve", title: "Staff Data Engineer", location: "Remote US", pay: "$220–300k/yr", board: "DreamWorkHQ", url: "https://www.dreamworkhq.com/job/d6cabc06-3620-4f44-8682-d6e57d8d2d58", dateAdded: "2026-09-20", status: "not-applied", priority: "Low", remote: true, tailored: false, notes: "Listed Sep 20. Snowflake admin, RBAC, medallion, observability; sets technical direction. Staff-level — stretch." },

  { id: "e1-01", company: "First Citizens Bank", title: "Lead Data Engineer", location: "", pay: "", board: "Company portal (iCIMS)", url: "", dateAdded: "2026-09-20", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-20", notes: "APPLIED Sep 20, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "e1-02", company: "First Citizens Bank", title: "Senior Data Engineer - ELT", location: "", pay: "", board: "Company portal (iCIMS)", url: "", dateAdded: "2026-09-20", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-20", notes: "APPLIED Sep 20, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "e1-03", company: "First Citizens Bank", title: "Senior Data Engineer - Snowflake", location: "", pay: "", board: "Company portal (iCIMS)", url: "", dateAdded: "2026-09-20", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-20", notes: "APPLIED Sep 20, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "e1-04", company: "Janus Henderson Investors", title: "Role not specified in confirmation", location: "", pay: "", board: "Company portal", url: "https://jobs.janushenderson.com", dateAdded: "2026-09-20", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-20", notes: "APPLIED Sep 20, 2026 — confirmation email received; role title not stated. Applied directly by candidate." },
  { id: "e1-05", company: "Anthropic", title: "Data Engineer, GTM", location: "", pay: "", board: "Greenhouse", url: "", dateAdded: "2026-09-19", status: "applied", priority: "High", remote: false, tailored: false, appliedDate: "2026-09-19", notes: "APPLIED Sep 19, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "e1-06", company: "Anthropic", title: "Recruiting Analytics Data Engineer", location: "", pay: "", board: "Greenhouse", url: "", dateAdded: "2026-09-19", status: "applied", priority: "High", remote: false, tailored: false, appliedDate: "2026-09-19", notes: "APPLIED Sep 19, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "e1-07", company: "Riot Games", title: "Principal Data Engineer - Teamfight Tactics", location: "", pay: "", board: "Company portal", url: "", dateAdded: "2026-09-19", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-19", notes: "APPLIED Sep 19, 2026 — confirmation email received. Principal level — stretch. Applied directly by candidate." },
  { id: "e1-08", company: "Caterpillar", title: "Senior Data Engineer - Physical AI Platform, Data Engineering", location: "", pay: "", board: "Workday", url: "", dateAdded: "2026-09-19", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-19", notes: "APPLIED Sep 19, 2026 — confirmation received, req R0000395330. Applied directly by candidate." },
  { id: "e1-09", company: "LLR Partners", title: "Role not specified in confirmation", location: "", pay: "", board: "Greenhouse", url: "", dateAdded: "2026-09-18", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-18", notes: "APPLIED Sep 18, 2026 — confirmation email received; role title not stated. Applied directly by candidate." },
  { id: "e1-10", company: "You.com", title: "Role not specified in confirmation", location: "", pay: "", board: "Greenhouse", url: "", dateAdded: "2026-09-18", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-18", notes: "APPLIED Sep 18, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "e1-11", company: "Strava", title: "Senior Data Engineer", location: "", pay: "", board: "Ashby", url: "", dateAdded: "2026-09-18", status: "applied", priority: "Medium", remote: false, tailored: false, appliedDate: "2026-09-18", notes: "APPLIED Sep 18, 2026 — confirmation email received. Applied directly by candidate." },
  { id: "r2-19", company: "Netsynk", title: "Senior Data Engineer", location: "Remote (NYC/East Coast preferred)", pay: "", board: "Dice", url: "https://www.dice.com/job-detail/936f8801-5ed0-4b7e-af37-bb0f83f30c5a", dateAdded: "2026-09-20", status: "not-applied", priority: "Low", remote: true, tailored: false, notes: "Contract through Jun 2027. Capital markets, ETL, SQL Server, AWS, messaging. Asks 10+ yrs (he has 7+) — stretch." },
  { id: "r2-20", company: "Neurasol", title: "Senior Data Engineer", location: "Remote", pay: "", board: "Dice", url: "https://www.dice.com/job-detail/c6805630-b582-43f6-971d-c0c48dbca259", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "12-mo contract. dbt Cloud, Snowflake, SQL/Oracle/SSIS migration — SSIS background directly relevant. Asks 8+ yrs; listing may be old — verify active." },

  // ---- Discovery run 1 (Apify, Sep 20, 2026; 152 new matches, $0.60) ----
  { id: "d3-01", company: "Instacart", title: "Senior Data Engineer II, Finance", location: "Remote US", pay: "$183–232k/yr", board: "Instacart Careers", url: "https://instacart.careers/job/?gh_jid=8132846", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Finance + Snowflake/Airflow/Spark/Delta Lake — near-perfect fit. 10+ yrs listed (stretch — he has 7+)." },
  { id: "d3-02", company: "Webflow", title: "Staff Data Engineer", location: "Remote US", pay: "$186.5–255k/yr", board: "Greenhouse", url: "https://job-boards.greenhouse.io/webflow/jobs/8165290", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Discovery Sep 20. Spark/Kafka core. Staff level — stretch." },
  { id: "d3-03", company: "AmeriLife", title: "Senior Data Engineer", location: "Remote (FL/MT)", pay: "$142.5–160k/yr", board: "Workday", url: "https://amerilife.wd5.myworkdayjobs.com/External/job/Remote-FL/Senior-Data-Engineer_R5206", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Databricks/Delta Lake/PySpark/Unity Catalog = exact stack." },
  { id: "d3-04", company: "Accorded", title: "Senior Data Engineer", location: "Remote US", pay: "$140–175k/yr", board: "Rippling ATS", url: "https://ats.rippling.com/accorded/jobs/66cf5b31-d62d-4b88-b33a-abfb69ef5a2f", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Healthcare data — Cigna background fits." },
  { id: "d3-05", company: "Praxis Precision Medicines", title: "Senior Data Platform Engineer, Commercial", location: "Remote US", pay: "$140–160k/yr", board: "Greenhouse", url: "https://job-boards.greenhouse.io/praxisprecisionmedicines/jobs/5425329008", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Snowflake/SQL/Python/dbt." },
  { id: "d3-06", company: "Worldly", title: "Senior Data Engineer", location: "Remote", pay: "$135–165k/yr", board: "Ashby", url: "https://jobs.ashbyhq.com/worldly/80002c19-4c52-4088-990f-f79e486bf3cf", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. dbt/Python. Dagster listed — interview-readiness flag." },
  { id: "d3-07", company: "Careforth", title: "Senior Data Engineer", location: "Remote US", pay: "", board: "Careforth Careers", url: "https://careers.careforth.com/jobs/5195", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Healthcare + Databricks/Delta Lake/dbt/Airflow — strong." },
  { id: "d3-08", company: "E Source", title: "Forward Deployed Data Engineer IV, Databricks", location: "Remote US", pay: "$175–200k/yr", board: "Ashby", url: "https://jobs.ashbyhq.com/e-source/d2971000-56c3-4f11-af28-9997bfe06fb1", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Databricks core." },
  { id: "d3-09", company: "Origami Risk", title: "Senior Data Engineer", location: "Remote US", pay: "$117–146k/yr", board: "iCIMS", url: "https://careers-origamirisk.icims.com/jobs/4646/senior-data-engineer/job", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: true, tailored: false, notes: "Discovery Sep 20. Insurance domain + Databricks/Spark." },
  { id: "d3-10", company: "Grainger", title: "Senior Data Engineer", location: "Chicago, IL (hybrid)", pay: "$112.9–188.1k/yr", board: "Grainger Careers", url: "https://jobs.grainger.com/job/CHICAGO-Senior-Data-Engineer-IL-60661-4555/1412820700/", dateAdded: "2026-09-20", status: "not-applied", priority: "High", remote: false, tailored: false, notes: "Discovery Sep 20. Snowflake/Databricks/Airflow/Kafka — exact match." },
  { id: "d3-11", company: "Code for America", title: "Staff Data Engineer", location: "Remote US", pay: "$129–158k/yr", board: "Greenhouse", url: "https://job-boards.greenhouse.io/codeforamerica/jobs/8188375", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: true, tailored: false, notes: "Discovery Sep 20. Nonprofit. Staff level — stretch." },
  { id: "d3-12", company: "Staples", title: "Senior Data Engineer, Supply Chain & AI", location: "Onsite", pay: "$118–162k/yr", board: "Oracle HCM", url: "https://fa-exhh-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2002/job/74949", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Discovery Sep 20. Snowflake/dbt/Databricks." },
  { id: "d3-13", company: "SpotHero", title: "Senior Data Engineer I", location: "Hybrid", pay: "$136–153k/yr", board: "SpotHero Careers", url: "https://spothero.com/careers/8214597/?gh_jid=8214597", dateAdded: "2026-09-20", status: "not-applied", priority: "Medium", remote: false, tailored: false, notes: "Discovery Sep 20. Airflow/Kafka." }
];

/* ---------------- Constants ---------------- */
const STAGE_ORDER = ["not-applied", "applied", "screening", "interview", "offer"];
const STAGE_LABELS = {
  "not-applied": "To apply", "applied": "Applied", "screening": "Screening",
  "interview": "Interview", "offer": "Offer", "on-hold": "On hold", "rejected": "Rejected"
};
const STAGE_COLORS = {
  "not-applied": "#8e8e93", "applied": "#007aff", "screening": "#ff9500",
  "interview": "#af52de", "offer": "#34c759"
};
const PRIO_RANK = { High: 3, Medium: 2, Low: 1 };
const LS_KEY = "jp-job-tracker-v1";

/* ---------------- State ---------------- */
let apps = [];
let lastSyncAt = null;
let migrateReport = null;
const filters = { q: "", status: "all", priority: "all", remote: false };
let sortBy = "priority";
let editingId = null;

/* ---------------- Persistence (versioned + self-healing) ---------------- */
function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

function readStore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { v: 1, apps: parsed, updatedAt: null }; // legacy bare array
    if (parsed && Array.isArray(parsed.apps)) {
      return { v: typeof parsed.v === "number" ? parsed.v : 1, apps: parsed.apps, updatedAt: parsed.updatedAt || null };
    }
  } catch (e) { /* storage unavailable or corrupt */ }
  return null;
}

function saveStore() {
  try {
    lastSyncAt = new Date().toISOString();
    localStorage.setItem(LS_KEY, JSON.stringify({ v: DATA_VERSION, apps: apps, updatedAt: lastSyncAt }));
  } catch (e) { toast("Couldn't save — browser storage unavailable"); }
}

/* Merge seed updates into a saved list.
   - Missing seed ids are added.
   - Existing seed ids get refreshed seed fields (URL, notes, pay…).
   - The visitor's own status / appliedDate are always preserved.
   - Visitor-added entries (unknown ids) are untouched. */
function migrateStore(store) {
  const seedById = {};
  DEFAULT_APPS.forEach(function (s) { seedById[s.id] = s; });
  const merged = [];
  const seen = {};
  let added = 0, updated = 0;

  store.apps.forEach(function (cur) {
    if (!cur || !cur.id) return;
    const seed = seedById[cur.id];
    seen[cur.id] = true;
    if (!seed) { merged.push(cur); return; }
    const status = cur.status, appliedDate = cur.appliedDate;
    const next = deepCopy(seed);
    if (status) next.status = status;
    if (appliedDate) next.appliedDate = appliedDate;
    merged.push(next);
    updated++;
  });
  DEFAULT_APPS.forEach(function (s) {
    if (!seen[s.id]) { merged.push(deepCopy(s)); added++; }
  });
  return { apps: merged, added: added, updated: updated };
}

function ensureStore() {
  const store = readStore();
  if (!store) {
    apps = deepCopy(DEFAULT_APPS);
    saveStore();
    migrateReport = { added: DEFAULT_APPS.length, updated: 0, fresh: true };
    return;
  }
  if (store.v >= DATA_VERSION) {
    apps = store.apps;
    lastSyncAt = store.updatedAt;
    migrateReport = { added: 0, updated: 0, fresh: false };
    return;
  }
  const res = migrateStore(store);
  apps = res.apps;
  saveStore();
  migrateReport = { added: res.added, updated: res.updated, fresh: false };
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

function fmtSync(iso) {
  if (!iso) return "never synced";
  const d = new Date(iso);
  if (isNaN(d)) return "just now";
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

let toastTimer = null;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.hidden = true; }, 2600);
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

function isAppliedStage(a) { return STAGE_ORDER.indexOf(a.status) > 0; }

/* ---------------- Render: profile & facts ---------------- */
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

function renderFacts() {
  $("#facts-grid").innerHTML = QUICK_FACTS.map(function (f, i) {
    return '<button class="fact" data-fact="' + i + '">' +
      '<span><span class="fact-label">' + esc(f.label) + '</span>' +
      '<span class="fact-value">' + esc(f.value) + '</span></span>' +
      '<span class="copy-icon" aria-hidden="true">⧉</span>' +
      "</button>";
  }).join("");
}

/* ---------------- Filtering / sorting ---------------- */
function visibleApps() {
  const q = filters.q.trim().toLowerCase();
  let list = apps.filter(function (a) {
    if (filters.status === "not-applied" && a.status !== "not-applied") return false;
    if (filters.status === "applied" && !isAppliedStage(a)) return false;
    if (filters.status === "on-hold" && a.status !== "on-hold" && a.status !== "rejected") return false;
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
    const p = (PRIO_RANK[b.priority] || 0) - (PRIO_RANK[a.priority] || 0);
    if (p !== 0) return p;
    return String(a.company).localeCompare(String(b.company));
  });
  return list;
}

/* ---------------- Render: dashboard ---------------- */
function renderDashboard() {
  const total = apps.length;
  const applied = apps.filter(isAppliedStage).length;
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
    return '<div class="stat-tile ' + s.cls + '"><span class="stat-num">' + s.num +
      '</span><span class="stat-label">' + s.label + "</span></div>";
  }).join("");

  const stages = ["not-applied", "applied", "screening", "interview", "offer"];
  $("#funnel").innerHTML = stages.map(function (id) {
    const n = apps.filter(function (a) { return a.status === id; }).length;
    const width = total ? (n / total) * 100 : 0;
    return '<div class="funnel-row"><span class="f-label">' + STAGE_LABELS[id] + "</span>" +
      '<div class="f-bar"><div style="width:' + width + "%;background:" + STAGE_COLORS[id] + '"></div></div>' +
      '<span class="f-count">' + n + "</span></div>";
  }).join("");
}

/* ---------------- Render: sync line ---------------- */
function renderSyncLine() {
  const dot = $("#sync-dot"), txt = $("#sync-text");
  const stale = migrateReport && (migrateReport.added > 0 || migrateReport.updated > 0);
  dot.className = "sync-dot" + (stale ? " stale" : "");
  if (migrateReport && migrateReport.fresh) {
    txt.textContent = "Fresh list · v" + DATA_VERSION;
  } else if (stale) {
    txt.textContent = "Updated just now: " + migrateReport.added + " new, " +
      migrateReport.updated + " refreshed · v" + DATA_VERSION;
  } else {
    txt.textContent = "Up to date · synced " + fmtSync(lastSyncAt) + " · v" + DATA_VERSION;
  }
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
    const pillTitle = canAdvance
      ? "Tap to advance to " + STAGE_LABELS[STAGE_ORDER[STAGE_ORDER.indexOf(a.status) + 1]]
      : "Status: " + stLabel;
    const meta = [a.location, a.pay].filter(Boolean).map(esc).join(" · ");
    return '<article class="app-card" data-id="' + esc(a.id) + '">' +
      '<div class="card-top" data-expand="' + esc(a.id) + '">' +
        '<span class="prio-dot ' + esc(a.priority) + '" title="' + esc(a.priority) + ' priority"></span>' +
        '<div class="card-title-block">' +
          '<div class="company">' + esc(a.company) + "</div>" +
          "<h3>" + esc(a.title) + "</h3>" +
          (meta ? '<div class="meta-line">' + meta + "</div>" : "") +
        "</div>" +
        '<button class="status-pill st-' + esc(a.status) + '" data-advance="' + esc(a.id) + '" title="' + esc(pillTitle) + '">' +
          esc(stLabel) + (canAdvance ? " ›" : "") + "</button>" +
      "</div>" +
      '<div class="card-detail" id="detail-' + esc(a.id) + '" hidden>' +
        '<div class="card-flags">' +
          '<span class="flag board">' + esc(a.priority) + " priority</span>" +
          (a.board ? '<span class="flag board">' + esc(a.board) + "</span>" : "") +
          (a.remote ? '<span class="flag remote">Remote</span>' : "") +
          (a.tailored ? '<span class="flag tailored">✓ Tailored resume ready</span>' : "") +
        "</div>" +
        (a.notes ? '<div class="card-notes">' + esc(a.notes) + "</div>" : "") +
        '<div class="card-actions">' +
          (a.url ? '<a class="btn btn-sm btn-primary" href="' + esc(a.url) + '" target="_blank" rel="noopener">Open posting</a>' : "") +
          '<button class="btn btn-sm btn-ghost" data-edit="' + esc(a.id) + '">Edit</button>' +
          '<button class="btn btn-sm btn-ghost" data-del="' + esc(a.id) + '">Delete</button>' +
          '<span class="date">Added ' + fmtDate(a.dateAdded) +
            (a.appliedDate ? " · Applied " + fmtDate(a.appliedDate) : "") + "</span>" +
        "</div>" +
      "</div>" +
    "</article>";
  }).join("");
}

function renderAll() {
  renderSyncLine();
  renderDashboard();
  renderList();
}

/* ---------------- Status advance / expand ---------------- */
function advanceStatus(id) {
  const app = apps.find(function (a) { return a.id === id; });
  if (!app) return;
  const i = STAGE_ORDER.indexOf(app.status);
  if (i === -1 || i >= STAGE_ORDER.length - 1) {
    toast("Edit the card to change its status");
    return;
  }
  app.status = STAGE_ORDER[i + 1];
  if (app.status === "applied" && !app.appliedDate) {
    app.appliedDate = new Date().toISOString().slice(0, 10);
  }
  saveStore();
  renderAll();
  toast(app.company + " → " + STAGE_LABELS[app.status]);
}

function toggleDetail(id) {
  const el = document.getElementById("detail-" + id);
  if (el) el.hidden = !el.hidden;
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
    form.dateAdded.value = new Date().toISOString().slice(0, 10);
  }
  backdrop.hidden = false;
  setTimeout(function () { form.company.focus(); }, 60);
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

/* ---------------- Sync ---------------- */
function syncNow() {
  ensureStore();
  renderAll();
  const r = migrateReport;
  if (r.added || r.updated) {
    toast("Synced: " + r.added + " new, " + r.updated + " refreshed");
  } else {
    toast("Up to date — " + apps.length + " tracked, " + apps.filter(isAppliedStage).length + " applied");
  }
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
          appliedDate: x.appliedDate || "",
          status: STAGE_LABELS[x.status] ? x.status : "not-applied",
          priority: ["High", "Medium", "Low"].indexOf(x.priority) !== -1 ? x.priority : "Medium",
          remote: !!x.remote, tailored: !!x.tailored, notes: x.notes || ""
        };
      });
      apps = valid;
      saveStore();
      renderAll();
      toast("Imported " + valid.length + " applications");
    } catch (e) {
      toast("Import failed — not a valid JSON file");
    }
  };
  reader.readAsText(file);
}

function resetDefaults() {
  if (!confirm("Reset to the " + DEFAULT_APPS.length + " preloaded applications? Your edits will be lost.")) return;
  try { localStorage.removeItem(LS_KEY); } catch (e) {}
  ensureStore();
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

  $("#status-seg").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-status]");
    if (!btn) return;
    Array.prototype.forEach.call(this.querySelectorAll(".seg-btn"), function (b) {
      b.classList.toggle("is-active", b === btn);
    });
    filters.status = btn.getAttribute("data-status");
    renderList();
  });

  $("#prio-chips").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-prio]");
    if (!btn) return;
    Array.prototype.forEach.call(this.querySelectorAll(".chip"), function (b) {
      b.classList.toggle("is-active", b === btn);
    });
    filters.priority = btn.getAttribute("data-prio");
    renderList();
  });

  $("#filter-remote").addEventListener("change", function (e) { filters.remote = e.target.checked; renderList(); });
  $("#sort-by").addEventListener("change", function (e) { sortBy = e.target.value; renderList(); });
  $("#btn-sync").addEventListener("click", syncNow);

  $("#app-list").addEventListener("click", function (e) {
    const adv = e.target.closest("[data-advance]");
    if (adv) { e.stopPropagation(); advanceStatus(adv.getAttribute("data-advance")); return; }
    const ed = e.target.closest("[data-edit]");
    if (ed) { openModal("edit", ed.getAttribute("data-edit")); return; }
    const del = e.target.closest("[data-del]");
    if (del) {
      const id = del.getAttribute("data-del");
      const app = apps.find(function (x) { return x.id === id; });
      if (app && confirm('Delete "' + app.title + '" at ' + app.company + "?")) {
        apps = apps.filter(function (x) { return x.id !== id; });
        saveStore(); renderAll(); toast("Deleted");
      }
      return;
    }
    if (e.target.closest("a")) return;
    const exp = e.target.closest("[data-expand]");
    if (exp) toggleDetail(exp.getAttribute("data-expand"));
  });

  function wireAdd(id) {
    const b = $(id);
    if (b) b.addEventListener("click", function () { openModal("add"); });
  }
  wireAdd("#btn-add");
  wireAdd("#btn-add-top");

  $("#btn-cancel").addEventListener("click", closeModal);
  backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !backdrop.hidden) closeModal(); });

  $("#btn-delete").addEventListener("click", function () {
    const app = apps.find(function (x) { return x.id === editingId; });
    if (app && confirm('Delete "' + app.title + '" at ' + app.company + "?")) {
      apps = apps.filter(function (x) { return x.id !== editingId; });
      saveStore(); renderAll(); closeModal(); toast("Deleted");
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
    saveStore(); renderAll(); closeModal();
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
ensureStore();
renderProfile();
renderFacts();
bindEvents();
renderAll();
if (migrateReport && (migrateReport.added || migrateReport.updated)) {
  toast("Synced: " + migrateReport.added + " new roles, " + migrateReport.updated + " refreshed");
}
