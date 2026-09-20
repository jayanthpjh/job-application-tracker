/* Job Application Tracker — Jayanth Pasupuleti
   OPS DECK edition: kanban mission-control. Plain JS, no dependencies.
   Seed data is versioned: bumping DATA_VERSION merges new/changed seed
   entries into every visitor's saved list (localStorage) without wiping
   their own additions or status changes. */

"use strict";

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


/* Bump this whenever DEFAULT_APPS changes so saved lists get the update.
   v3: OPS DECK redesign. Schema unchanged; migration re-runs the safe
   seed merge (adds missing seeds, refreshes seed fields, preserves the
   visitor's own statuses, applied dates, and custom records). */
const DATA_VERSION = 3;

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
  "not-applied": "Queue", "applied": "Applied", "screening": "Screening",
  "interview": "Interview", "offer": "Offer", "on-hold": "On hold", "rejected": "Rejected"
};

/* Kanban lanes: the board's columns. */
const LANES = [
  { key: "queue",  label: "QUEUE",       statuses: ["not-applied"], color: "#8e8e93" },
  { key: "applied", label: "APPLIED",    statuses: ["applied"],     color: "#46d9ff" },
  { key: "screen", label: "SCREENING",   statuses: ["screening"],   color: "#ffb224" },
  { key: "talks",  label: "INTERVIEW",   statuses: ["interview"],   color: "#b48cff" },
  { key: "offer",  label: "OFFER",       statuses: ["offer"],       color: "#c8ff2e" },
  { key: "hold",   label: "ON HOLD",     statuses: ["on-hold"],     color: "#ff6b6b" },
  { key: "shelf",  label: "SHELF",       statuses: ["rejected"],    color: "#5f665c" }
];
const PRIO_RANK = { High: 3, Medium: 2, Low: 1 };
const PRIO_COLORS = { High: "#ff6b6b", Medium: "#ffb224", Low: "#5f665c" };
const LS_KEY = "jp-job-tracker-v1";
const THEME_KEY = "jp-job-tracker-theme";

/* ---------------- State ---------------- */
let apps = [];
let lastSyncAt = null;
let migrateReport = null;
const filters = { q: "", status: "all", priority: "all", remote: false };
let sortBy = "priority";
let view = "board";
let editingId = null;
let firstPaint = true;
let activeLaneIdx = 0;

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
  } catch (e) { toast("SAVE FAILED — STORAGE UNAVAILABLE"); }
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

/* ---------------- Theme ---------------- */
function initTheme() {
  let t = null;
  try { t = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (t !== "light" && t !== "dark") t = "dark";
  document.documentElement.setAttribute("data-theme", t);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", cur);
  try { localStorage.setItem(THEME_KEY, cur); } catch (e) {}
  toast(cur === "light" ? "PAPER MODE" : "DARK OPS MODE");
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
    try { document.execCommand("copy"); toast("COPIED TO CLIPBOARD"); }
    catch (e) { toast("COPY FAILED"); }
    document.body.removeChild(ta);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      function () { toast("COPIED TO CLIPBOARD"); },
      function () { fallback(); }
    );
  } else { fallback(); }
}

function isAppliedStage(a) { return STAGE_ORDER.indexOf(a.status) > 0; }
function laneOf(status) {
  for (let i = 0; i < LANES.length; i++) {
    if (LANES[i].statuses.indexOf(status) !== -1) return LANES[i];
  }
  return LANES[0];
}

/* ---------------- Filtering / sorting ---------------- */
function matchFilters(a, useStatus) {
  if (useStatus) {
    if (filters.status === "not-applied" && a.status !== "not-applied") return false;
    if (filters.status === "applied" && !isAppliedStage(a)) return false;
    if (filters.status === "on-hold" && a.status !== "on-hold" && a.status !== "rejected") return false;
  }
  if (filters.priority !== "all" && a.priority !== filters.priority) return false;
  if (filters.remote && !a.remote) return false;
  const q = filters.q.trim().toLowerCase();
  if (q) {
    const hay = [a.company, a.title, a.location, a.pay, a.board, a.notes]
      .map(function (x) { return String(x || "").toLowerCase(); }).join(" ");
    if (hay.indexOf(q) === -1) return false;
  }
  return true;
}

function sortList(list) {
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

function visibleApps() {
  return sortList(apps.filter(function (a) { return matchFilters(a, view === "list"); }));
}

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
      '<span><span class="fact-label">' + esc(f.label.toUpperCase()) + '</span>' +
      '<span class="fact-value">' + esc(f.value) + '</span></span>' +
      '<span class="copy-icon" aria-hidden="true">⧉</span>' +
      "</button>";
  }).join("");
}

/* ---------------- Render: HUD ---------------- */
const prevHud = {};
function hudNum(key, val) {
  const from = firstPaint ? 0 : (prevHud[key] || 0);
  prevHud[key] = val;
  if (from === val || firstPaint === false && from === val) return String(val);
  return { animate: true, from: from, to: val };
}

function renderHUD() {
  const total = apps.length;
  const applied = apps.filter(isAppliedStage).length;
  const inPlay = apps.filter(function (a) { return a.status === "screening" || a.status === "interview"; }).length;
  const offers = apps.filter(function (a) { return a.status === "offer"; }).length;
  const responded = apps.filter(function (a) {
    return a.status === "screening" || a.status === "interview" || a.status === "offer";
  }).length;
  const rate = applied ? Math.round((responded / applied) * 100) : 0;

  const tiles = [
    { key: "total",   num: total,   label: "ROLES TRACKED",   sub: filters.q ? "FILTERED VIEW" : "FULL BOOK",  accent: "#8e8e93" },
    { key: "applied", num: applied, label: "APPLIED",         sub: total ? Math.round(applied / total * 100) + "% OF BOOK" : "", accent: "#46d9ff" },
    { key: "inplay",  num: inPlay,  label: "IN PLAY",         sub: "SCREEN + INTERVIEW", accent: "#ffb224" },
    { key: "offers",  num: offers,   label: "OFFERS",         sub: offers ? "NEGOTIATE" : "HUNT CONTINUES", accent: "#c8ff2e" },
    { key: "rate",    num: rate,     suffix: "%", label: "RESPONSE RATE", sub: responded + " RESPONSES", accent: "#b48cff" }
  ];

  $("#stat-cards").innerHTML = tiles.map(function (t) {
    const v = hudNum(t.key, t.num);
    const numHtml = (v && v.animate)
      ? '<span class="hud-num" data-count-from="' + v.from + '" data-count-to="' + v.to + '" data-suffix="' + esc(t.suffix || "") + '">0' + esc(t.suffix || "") + "</span>"
      : '<span class="hud-num">' + t.num + esc(t.suffix || "") + "</span>";
    return '<div class="hud-tile" style="--tile-accent:' + t.accent + '">' + numHtml +
      '<span class="hud-label">' + t.label + "</span>" +
      (t.sub ? '<span class="hud-sub">' + esc(t.sub) + "</span>" : "") + "</div>";
  }).join("");

  Array.prototype.forEach.call(document.querySelectorAll("[data-count-to]"), function (el) {
    const from = +el.getAttribute("data-count-from"), to = +el.getAttribute("data-count-to");
    const suffix = el.getAttribute("data-suffix") || "";
    const t0 = performance.now(), dur = 700;
    function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* ---------------- Render: pipeline flow ---------------- */
function renderFlow() {
  const total = apps.length || 1;
  const flow = ["not-applied", "applied", "screening", "interview", "offer"];
  const colors = { "not-applied": "#8e8e93", "applied": "#46d9ff", "screening": "#ffb224", "interview": "#b48cff", "offer": "#c8ff2e" };
  let prev = null;
  $("#pipeline-flow").innerHTML = flow.map(function (st) {
    const n = apps.filter(function (a) { return a.status === st; }).length;
    const conv = prev === null ? "ENTRY" : (prev ? Math.round(n / prev * 100) + "% FWD" : "—");
    prev = n;
    return '<div class="flow-node" style="--fn-color:' + colors[st] + '">' +
      '<span class="fn-count">' + n + "</span>" +
      '<span class="fn-label">' + STAGE_LABELS[st].toUpperCase() + "</span>" +
      '<span class="fn-conv">' + conv + "</span>" +
      '<div class="flow-bar"><div style="width:' + Math.max(2, Math.round(n / total * 100)) + '%"></div></div>' +
      "</div>";
  }).join("");
  const hold = apps.filter(function (a) { return a.status === "on-hold"; }).length;
  const shelf = apps.filter(function (a) { return a.status === "rejected"; }).length;
  $("#flow-sub").textContent = "HOLD " + hold + " · SHELF " + shelf;
}

/* ---------------- Render: cards (shared) ---------------- */
function cardInner(a, idx) {
  const lane = laneOf(a.status);
  const stLabel = (STAGE_LABELS[a.status] || a.status).toUpperCase();
  const i = STAGE_ORDER.indexOf(a.status);
  const canAdvance = i !== -1 && i < STAGE_ORDER.length - 1;
  const meta = [a.location, a.pay].filter(Boolean).map(esc).join("  ·  ");
  const tags =
    (a.priority ? '<span class="tag" style="color:' + (PRIO_COLORS[a.priority] || "#8e8e93") + ";border:1px solid " + (PRIO_COLORS[a.priority] || "#8e8e93") + '44">' + esc(a.priority.toUpperCase()) + "</span>" : "") +
    (a.remote ? '<span class="tag tag-cyan">REMOTE</span>' : "") +
    (a.tailored ? '<span class="tag tag-lime">TAILORED CV</span>' : "") +
    (a.board ? '<span class="tag tag-gray">' + esc(a.board.toUpperCase().slice(0, 22)) + "</span>" : "");
  return '<div class="card-top" data-expand="' + esc(a.id) + '">' +
      '<div class="card-main">' +
        '<div class="card-company">' + esc(a.company) + "</div>" +
        '<div class="card-title">' + esc(a.title) + "</div>" +
        (meta ? '<div class="card-meta">' + meta + "</div>" : "") +
      "</div>" +
    "</div>" +
    (tags ? '<div class="card-tags">' + tags + "</div>" : "") +
    '<div class="card-foot">' +
      '<button class="status-chip" data-advance="' + esc(a.id) + '" title="' +
        (canAdvance ? "Advance to " + STAGE_LABELS[STAGE_ORDER[i + 1]] : "Status: " + stLabel) + '">' +
        esc(stLabel) + (canAdvance ? " →" : "") + "</button>" +
      '<span class="card-date">' + fmtDate(a.dateAdded) +
        (a.appliedDate ? " · ✓ " + fmtDate(a.appliedDate) : "") + "</span>" +
    "</div>" +
    '<div class="card-detail" id="detail-' + esc(a.id) + '" hidden>' +
      (a.notes ? '<div class="card-notes">' + esc(a.notes) + "</div>" : "") +
      '<div class="card-actions">' +
        (a.url ? '<a class="mini-btn go" href="' + esc(a.url) + '" target="_blank" rel="noopener">OPEN POSTING ↗</a>' : "") +
        '<button class="mini-btn" data-edit="' + esc(a.id) + '">EDIT</button>' +
        '<button class="mini-btn" data-del="' + esc(a.id) + '">DELETE</button>' +
        '<span class="card-jobid">ID ' + esc(a.id) + "</span>" +
      "</div>" +
    "</div>";
}

/* ---------------- Render: board ---------------- */
function renderBoard() {
  const board = $("#board");
  board.innerHTML = LANES.map(function (lane, li) {
    const cards = sortList(apps.filter(function (a) {
      return lane.statuses.indexOf(a.status) !== -1 && matchFilters(a, false);
    }));
    const cardsHtml = cards.length
      ? cards.map(function (a, ci) {
          return '<div class="card" draggable="true" data-card="' + esc(a.id) + '" data-lane="' + lane.key + '"' +
            ' style="--lane-color:' + lane.color + ";--prio-color:" + (PRIO_COLORS[a.priority] || "#5f665c") +
            ";animation-delay:" + Math.min(ci * 30, 420) + 'ms">' +
            cardInner(a, ci) + "</div>";
        }).join("")
      : '<div class="lane-empty">EMPTY LANE<br>DRAG CARDS HERE</div>';
    return '<div class="lane" data-lane-col="' + lane.key + '" style="--lane-color:' + lane.color + '">' +
      '<div class="lane-head"><span class="lane-dot"></span>' +
      '<span class="lane-name">' + lane.label + '</span>' +
      '<span class="lane-count">' + cards.length + "</span></div>" +
      '<div class="lane-body" data-drop="' + lane.statuses[0] + '">' + cardsHtml + "</div>" +
      "</div>";
  }).join("");
  updateLaneName();
}

/* ---------------- Render: list ---------------- */
function renderList() {
  const list = visibleApps();
  const box = $("#app-list");
  $("#result-count").textContent = "SHOWING " + list.length + " / " + apps.length;
  if (!list.length) {
    box.innerHTML = '<div class="empty-state">NO RECORDS MATCH — CLEAR FILTERS OR LOG A NEW ONE</div>';
    return;
  }
  box.innerHTML = list.map(function (a, i) {
    const lane = laneOf(a.status);
    const stLabel = (STAGE_LABELS[a.status] || a.status).toUpperCase();
    const meta = [a.location, a.pay, a.board].filter(Boolean).map(esc).join("  ·  ");
    return '<div class="row" data-expand="' + esc(a.id) + '" style="--prio-color:' + (PRIO_COLORS[a.priority] || "#5f665c") +
      ";animation-delay:" + Math.min(i * 22, 400) + 'ms">' +
      '<span class="row-prio"></span>' +
      '<div class="row-main"><div class="row-company">' + esc(a.company) + '</div>' +
      '<div class="row-title">' + esc(a.title) + "</div></div>" +
      '<div class="row-meta">' + meta + "</div>" +
      '<button class="status-chip" data-advance="' + esc(a.id) + '" style="--lane-color:' + lane.color + '">' + esc(stLabel) + "</button>" +
      '<div class="row-detail" id="detail-' + esc(a.id) + '" hidden>' +
        '<div class="card-tags">' +
          (a.priority ? '<span class="tag" style="color:' + (PRIO_COLORS[a.priority] || "#8e8e93") + '">' + esc(a.priority.toUpperCase()) + "</span>" : "") +
          (a.remote ? '<span class="tag tag-cyan">REMOTE</span>' : "") +
          (a.tailored ? '<span class="tag tag-lime">TAILORED CV</span>' : "") +
          '<span class="tag tag-gray">ADDED ' + fmtDate(a.dateAdded).toUpperCase() + "</span>" +
          (a.appliedDate ? '<span class="tag tag-lime">APPLIED ' + fmtDate(a.appliedDate).toUpperCase() + "</span>" : "") +
        "</div>" +
        (a.notes ? '<div class="card-notes">' + esc(a.notes) + "</div>" : "") +
        '<div class="card-actions">' +
          (a.url ? '<a class="mini-btn go" href="' + esc(a.url) + '" target="_blank" rel="noopener">OPEN POSTING ↗</a>' : "") +
          '<button class="mini-btn" data-edit="' + esc(a.id) + '">EDIT</button>' +
          '<button class="mini-btn" data-del="' + esc(a.id) + '">DELETE</button>' +
          '<span class="card-jobid">ID ' + esc(a.id) + "</span>" +
        "</div>" +
      "</div>" +
    "</div>";
  }).join("");
}

/* ---------------- Render: sync ---------------- */
function renderSync() {
  const dot = $("#sync-dot"), txt = $("#sync-text");
  const stale = migrateReport && (migrateReport.added > 0 || migrateReport.updated > 0);
  dot.className = "sync-dot" + (stale ? " stale" : "");
  let line;
  if (migrateReport && migrateReport.fresh) {
    line = "FRESH BOOK · v" + DATA_VERSION;
  } else if (stale) {
    line = "+" + migrateReport.added + " NEW · " + migrateReport.updated + " REFRESHED";
  } else {
    line = "IN SYNC · v" + DATA_VERSION;
  }
  txt.textContent = line;
  $("#data-version").textContent = "SEED v" + DATA_VERSION;
  $("#foot-sync").textContent = "LAST SYNC " + fmtSync(lastSyncAt).toUpperCase();
}

function renderAll() {
  renderSync();
  renderHUD();
  renderFlow();
  if (view === "board") { renderBoard(); } else { renderList(); }
  firstPaint = false;
}

/* ---------------- Status ops ---------------- */
function setStatus(id, status) {
  const app = apps.find(function (a) { return a.id === id; });
  if (!app || app.status === status) return;
  app.status = status;
  if (status === "applied" && !app.appliedDate) {
    app.appliedDate = new Date().toISOString().slice(0, 10);
  }
  saveStore();
  renderAll();
  toast(app.company.toUpperCase() + " → " + (STAGE_LABELS[status] || status).toUpperCase());
}

function advanceStatus(id) {
  const app = apps.find(function (a) { return a.id === id; });
  if (!app) return;
  const i = STAGE_ORDER.indexOf(app.status);
  if (i === -1 || i >= STAGE_ORDER.length - 1) {
    toast("EDIT THE RECORD TO CHANGE STATUS");
    return;
  }
  setStatus(id, STAGE_ORDER[i + 1]);
}

function toggleDetail(id) {
  const el = document.getElementById("detail-" + CSS.escape(id));
  if (el) el.hidden = !el.hidden;
}

/* ---------------- View switching ---------------- */
function setView(v) {
  view = v;
  $("#view-board").classList.toggle("is-active", v === "board");
  $("#view-list").classList.toggle("is-active", v === "list");
  $("#view-board").setAttribute("aria-selected", v === "board");
  $("#view-list").setAttribute("aria-selected", v === "list");
  $("#board-section").hidden = v !== "board";
  $("#list-section").hidden = v !== "list";
  $("#status-seg").hidden = v !== "list";
  renderAll();
}

/* ---------------- Lane navigator (mobile) ---------------- */
function updateLaneName() {
  const board = $("#board");
  const lanes = board.querySelectorAll(".lane");
  if (!lanes.length) return;
  let best = 0, bestDist = Infinity;
  const bx = board.getBoundingClientRect().left;
  lanes.forEach(function (l, i) {
    const d = Math.abs(l.getBoundingClientRect().left - bx);
    if (d < bestDist) { bestDist = d; best = i; }
  });
  activeLaneIdx = best;
  const lane = LANES[best];
  if (lane) $("#lane-name").textContent = lane.label + " · " + board.querySelectorAll(".lane")[best].querySelector(".lane-count").textContent;
}
function gotoLane(idx) {
  const board = $("#board");
  const lanes = board.querySelectorAll(".lane");
  if (!lanes.length) return;
  idx = Math.max(0, Math.min(lanes.length - 1, idx));
  lanes[idx].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
}

/* ---------------- Modal ---------------- */
const backdrop = $("#modal-backdrop");
const form = $("#app-form");

function openModal(mode, id) {
  editingId = mode === "edit" ? id : null;
  const app = mode === "edit" ? apps.find(function (x) { return x.id === id; }) : null;
  $("#modal-title").textContent = mode === "edit" ? "EDIT RECORD" : "LOG APPLICATION";
  $("#modal-sub").textContent = mode === "edit" && app ? app.company.toUpperCase().slice(0, 28) : "NEW RECORD";
  $("#btn-delete").hidden = mode !== "edit";
  form.reset();
  if (app) {
    form.elements.company.value = app.company || "";
    form.elements.title.value = app.title || "";
    form.elements.location.value = app.location || "";
    form.elements.pay.value = app.pay || "";
    form.elements.board.value = app.board || "";
    form.elements.url.value = app.url || "";
    form.elements.status.value = app.status || "not-applied";
    form.elements.priority.value = app.priority || "Medium";
    form.elements.dateAdded.value = app.dateAdded || "";
    form.elements.remote.checked = !!app.remote;
    form.elements.tailored.checked = !!app.tailored;
    form.elements.notes.value = app.notes || "";
  } else {
    form.elements.dateAdded.value = new Date().toISOString().slice(0, 10);
  }
  backdrop.hidden = false;
  setTimeout(function () { form.elements.company.focus(); }, 60);
}

function closeModal() {
  backdrop.hidden = true;
  editingId = null;
}

function collectForm() {
  return {
    company: form.elements.company.value.trim(),
    title: form.elements.title.value.trim(),
    location: form.elements.location.value.trim(),
    pay: form.elements.pay.value.trim(),
    board: form.elements.board.value.trim(),
    url: form.elements.url.value.trim(),
    status: form.elements.status.value,
    priority: form.elements.priority.value,
    dateAdded: form.elements.dateAdded.value || new Date().toISOString().slice(0, 10),
    remote: form.elements.remote.checked,
    tailored: form.elements.tailored.checked,
    notes: form.elements.notes.value.trim()
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
    toast("SYNCED: +" + r.added + " NEW · " + r.updated + " REFRESHED");
  } else {
    toast("IN SYNC — " + apps.length + " TRACKED · " + apps.filter(isAppliedStage).length + " APPLIED");
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
  toast("EXPORTED " + apps.length + " RECORDS");
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
      toast("IMPORTED " + valid.length + " RECORDS");
    } catch (e) {
      toast("IMPORT FAILED — INVALID JSON");
    }
  };
  reader.readAsText(file);
}

function resetDefaults() {
  if (!confirm("Reset to the " + DEFAULT_APPS.length + " preloaded records? Your edits will be lost.")) return;
  try { localStorage.removeItem(LS_KEY); } catch (e) {}
  ensureStore();
  renderAll();
  toast("RESET TO SEED BOOK");
}

/* ---------------- Events ---------------- */
function bindEvents() {
  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#view-board").addEventListener("click", function () { setView("board"); });
  $("#view-list").addEventListener("click", function () { setView("list"); });

  $("#btn-operator").addEventListener("click", function () {
    const panel = $("#operator-panel");
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      setTimeout(function () { panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 60);
    }
  });
  $("#btn-operator-close").addEventListener("click", function () {
    $("#operator-panel").hidden = true;
  });

  $("#facts-grid").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-fact]");
    if (btn) copyText(QUICK_FACTS[+btn.getAttribute("data-fact")].value);
  });

  $("#filter-q").addEventListener("input", function (e) { filters.q = e.target.value; renderAll(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      $("#filter-q").focus();
    }
  });

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
    renderAll();
  });

  $("#filter-remote").addEventListener("change", function (e) { filters.remote = e.target.checked; renderAll(); });
  $("#sort-by").addEventListener("change", function (e) { sortBy = e.target.value; renderAll(); });
  $("#btn-sync").addEventListener("click", syncNow);

  $("#lane-prev").addEventListener("click", function () { gotoLane(activeLaneIdx - 1); });
  $("#lane-next").addEventListener("click", function () { gotoLane(activeLaneIdx + 1); });
  let laneTick = false;
  $("#board").addEventListener("scroll", function () {
    if (laneTick) return;
    laneTick = true;
    requestAnimationFrame(function () { updateLaneName(); laneTick = false; });
  }, { passive: true });

  /* Card interactions (delegated for board + list) */
  function cardZoneClick(e) {
    const adv = e.target.closest("[data-advance]");
    if (adv) { e.stopPropagation(); advanceStatus(adv.getAttribute("data-advance")); return; }
    const ed = e.target.closest("[data-edit]");
    if (ed) { e.stopPropagation(); openModal("edit", ed.getAttribute("data-edit")); return; }
    const del = e.target.closest("[data-del]");
    if (del) {
      e.stopPropagation();
      const id = del.getAttribute("data-del");
      const app = apps.find(function (x) { return x.id === id; });
      if (app && confirm('Delete "' + app.title + '" at ' + app.company + "?")) {
        apps = apps.filter(function (x) { return x.id !== id; });
        saveStore(); renderAll(); toast("RECORD DELETED");
      }
      return;
    }
    if (e.target.closest("a")) return;
    const exp = e.target.closest("[data-expand]");
    if (exp) toggleDetail(exp.getAttribute("data-expand"));
  }
  $("#board").addEventListener("click", cardZoneClick);
  $("#app-list").addEventListener("click", cardZoneClick);

  /* Drag & drop between lanes */
  let dragId = null;
  $("#board").addEventListener("dragstart", function (e) {
    const card = e.target.closest("[data-card]");
    if (!card) return;
    dragId = card.getAttribute("data-card");
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", dragId); } catch (err) {}
    setTimeout(function () { card.classList.add("dragging"); }, 0);
  });
  $("#board").addEventListener("dragend", function () {
    dragId = null;
    Array.prototype.forEach.call($("#board").querySelectorAll(".dragging"), function (c) {
      c.classList.remove("dragging");
    });
    Array.prototype.forEach.call($("#board").querySelectorAll(".drag-over"), function (z) {
      z.classList.remove("drag-over");
    });
  });
  $("#board").addEventListener("dragover", function (e) {
    const zone = e.target.closest("[data-drop]");
    if (!zone || !dragId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    zone.classList.add("drag-over");
  });
  $("#board").addEventListener("dragleave", function (e) {
    const zone = e.target.closest("[data-drop]");
    if (zone && !zone.contains(e.relatedTarget)) zone.classList.remove("drag-over");
  });
  $("#board").addEventListener("drop", function (e) {
    const zone = e.target.closest("[data-drop]");
    if (!zone || !dragId) return;
    e.preventDefault();
    zone.classList.remove("drag-over");
    setStatus(dragId, zone.getAttribute("data-drop"));
    dragId = null;
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
      saveStore(); renderAll(); closeModal(); toast("RECORD DELETED");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = collectForm();
    if (!data.company || !data.title) { toast("COMPANY + ROLE TITLE REQUIRED"); return; }
    if (editingId) {
      const app = apps.find(function (x) { return x.id === editingId; });
      if (app) Object.assign(app, data);
      toast("RECORD UPDATED");
    } else {
      data.id = genId();
      apps.unshift(data);
      toast("APPLICATION LOGGED");
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

/* ---------------- Init (gated by Face ID lock when enabled) ---------------- */
function bootApp() {
  initTheme();
  ensureStore();
  renderProfile();
  renderFacts();
  bindEvents();
  renderAll();
  if (migrateReport && (migrateReport.added || migrateReport.updated)) {
    toast("SYNCED: +" + migrateReport.added + " NEW · " + migrateReport.updated + " REFRESHED");
  }
}
if (window.__faceLockGate) { window.__faceLockGate(bootApp); } else { bootApp(); }
