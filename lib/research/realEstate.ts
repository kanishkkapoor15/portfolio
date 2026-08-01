import type { Article } from "./types.ts";

export const realEstateArticles: Article[] = [
  {
    slug: "agentic-site-selection-due-diligence-ireland-uk",
    domain: "Real Estate & Development",
    title: "Site selection in eleven days: running development due diligence with agents",
    dek: "A worked model of agentic site screening for Irish and UK development, including where the time actually goes and which parts refuse to automate.",
    date: "2026-08-02",
    readingMinutes: 9,
    metrics: [
      { value: "14 wks → 11 days", label: "Brief to ranked shortlist" },
      { value: "63", label: "Sites screened per cycle" },
      { value: "€31k", label: "Modelled saving per scheme" },
    ],
    keywords: [
      "agentic AI site selection",
      "development due diligence Ireland",
      "AI property development UK",
      "automated zoning analysis",
      "real estate AI Dublin",
      "site appraisal automation",
    ],
    body: [
      {
        t: "p",
        text: "Most development teams do not lose time on analysis. They lose it on retrieval. A land team in Dublin or Manchester spends the bulk of a site appraisal cycle finding documents, not reading them: pulling the development plan, checking the zoning objective, tracing whether a site sits inside a Strategic Development Zone, confirming flood classification, working out who owns the adjoining strip, and reconciling three different sources that disagree about site area.",
      },
      {
        t: "p",
        text: "That is the part agents are genuinely good at. Not judgement. Retrieval, reconciliation, and the first pass of arithmetic.",
      },
      { t: "h", text: "Where the fourteen weeks go" },
      {
        t: "p",
        text: "The figure below models a mid-sized developer running a residential or mixed-use scheme through appraisal. The stage durations come from a composite of how these teams typically sequence work: an initial long list, a manual planning and constraints review, a preliminary financial appraisal, and then a partner review that sends roughly a third of sites back for rework.",
      },
      {
        t: "viz",
        spec: {
          kind: "compression",
          caption: "Appraisal stage duration, conventional process against an agent-assisted one",
          unit: "working days",
          rows: [
            { label: "Long list assembly", before: 12, after: 1 },
            { label: "Planning and zoning review", before: 18, after: 2 },
            { label: "Environmental and flood screening", before: 14, after: 2 },
            { label: "Preliminary financial model", before: 10, after: 1 },
            { label: "Constraints reconciliation", before: 9, after: 2 },
            { label: "Partner review and rework", before: 7, after: 3 },
          ],
        },
      },
      {
        t: "p",
        text: "The last row matters more than the others. Partner review does not compress much, and it should not. What changes is that the review happens against six well-evidenced sites rather than sixty thinly-evidenced ones, so the rework loop mostly disappears.",
      },
      { t: "h", text: "What the agent actually does" },
      {
        t: "p",
        text: "A site selection agent is not a chatbot with a property database bolted on. It is a sequence of tool calls with a verification step after each one, and the verification step is where most implementations fail.",
      },
      {
        t: "viz",
        spec: {
          kind: "flow",
          steps: [
            { label: "Parse the brief", detail: "Use class, target unit count, budget envelope, minimum site area, acceptable travel time to transit." },
            { label: "Assemble candidates", detail: "Cross-reference land registry, agent listings and off-market records into a deduplicated candidate set." },
            { label: "Pull the planning position", detail: "Development plan zoning objective, planning history on the folio, live applications on adjoining land." },
            { label: "Screen constraints", detail: "Flood classification, protected structures, archaeological zones, tree preservation, services capacity." },
            { label: "Run the appraisal", detail: "Residual land value against build cost assumptions, sales rates and a finance cost curve." },
            { label: "Rank and evidence", detail: "Ordered shortlist where every figure carries a link back to the document it came from." },
          ],
          caption: "The pipeline behind an eleven day cycle",
        },
      },
      {
        t: "p",
        text: "The last step is the commercial one. An agent that produces a ranked list is interesting. An agent that produces a ranked list where a director can click any number and land on the page of the development plan it came from is something a firm will actually put money behind. Evidence links are what move an output from advisory to usable.",
      },
      { t: "h", text: "The Irish and UK specifics that break naive automation" },
      {
        t: "p",
        text: "Generic property AI tends to be built against United States data conventions, and it degrades quickly here. Four things cause most of the failures.",
      },
      {
        t: "list",
        items: [
          "Development plans are PDFs with maps, not APIs. Zoning objectives sit in a written statement, the boundaries sit in a separate map layer, and the two are frequently ambiguous at the edges. An agent has to read both and flag its own uncertainty rather than guessing.",
          "Folio and title data does not align cleanly with mapped site boundaries. A candidate site is often several folios with different registered owners, and the arithmetic on developable area changes materially depending on how that resolves.",
          "Planning history is the strongest single predictor of consent risk, and it is the least structured data in the process. A refused application on an adjoining site three years ago tells you more than any generic model score.",
          "Part L and the wider Building Regulations changed the cost floor. Any appraisal running pre-2022 build cost assumptions is producing a residual land value that will not survive contact with a quantity surveyor.",
        ],
      },
      {
        t: "pull",
        text: "The value is not that the agent is clever. It is that it never gets bored on the fortieth site.",
      },
      { t: "h", text: "What this is worth across a pipeline" },
      {
        t: "p",
        text: "Cycle time compression only pays if it changes a commercial outcome. In development it does, through three routes: more sites screened for the same team cost, faster movement on off-market opportunities, and fewer schemes carried into expensive due diligence before a fatal constraint is found.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Modelled annual effect for a developer running twelve schemes a year",
          unit: "€ thousand",
          bars: [
            { label: "Analyst time recovered", value: 186, tone: "growth" },
            { label: "External consultant spend avoided", value: 142, tone: "brass" },
            { label: "Abortive legal and survey cost", value: 96, tone: "clay" },
            { label: "Implementation and run cost", value: -78, tone: "slate" },
          ],
        },
      },
      {
        t: "note",
        text: "How these figures were produced: modelled on a twelve scheme annual pipeline, a four person land team at a fully loaded cost of €95k, external planning and environmental consultancy at typical Irish market rates, and an assumed 30 percent reduction in schemes that reach legal due diligence before being abandoned. These are illustrative models built from stated assumptions, not survey findings. Every input is adjustable and I am happy to run the model against a real pipeline.",
      },
      { t: "h", text: "Where to start" },
      {
        t: "p",
        text: "The instinct is to build the whole pipeline. That is usually the wrong first move, because the constraint screening step is the one that carries the most risk and the least tolerance for error. Start instead with planning position retrieval on sites the team has already appraised. You get a clean accuracy benchmark against known answers, the team builds trust in the evidence links, and you find out early how badly the source documents are going to fight you.",
      },
      {
        t: "p",
        text: "Once retrieval is trusted, the appraisal arithmetic is comparatively easy. Most firms have the model already. It just runs on a spreadsheet that one person maintains.",
      },
    ],
  },

  {
    slug: "lease-compliance-agents-commercial-portfolio",
    domain: "Real Estate & Development",
    title: "The lease portfolio that reads itself: compliance agents across commercial estates",
    dek: "Rent review triggers, break clauses and statutory deadlines are a data extraction problem that portfolios keep solving with calendar reminders and hope.",
    date: "2026-08-02",
    readingMinutes: 8,
    metrics: [
      { value: "1,240", label: "Leases parsed per run" },
      { value: "94%", label: "Clause extraction accuracy" },
      { value: "£410k", label: "Missed escalation exposure found" },
    ],
    keywords: [
      "lease abstraction AI",
      "commercial property compliance automation",
      "rent review agent",
      "portfolio management AI UK",
      "facilities management AI Ireland",
      "lease management agentic AI",
    ],
    body: [
      {
        t: "p",
        text: "Every commercial portfolio of any size has the same quiet problem. The lease data in the management system is a summary of the lease, written by somebody who has since left, and nobody has read the underlying document since it was signed. The summary captures rent, term and break date. It does not capture the clause that says the service charge cap falls away on assignment.",
      },
      {
        t: "p",
        text: "That gap is where money leaks, and it leaks in both directions. Escalations that were never applied. Dilapidations positions that were never argued. Statutory obligations sitting in a schedule nobody indexed.",
      },
      { t: "h", text: "Extraction is the easy half" },
      {
        t: "p",
        text: "Parsing a lease into structured fields is close to a solved problem now, provided the model is given the document rather than a scan of a fax of the document. Accuracy on core commercial terms sits high enough to be operationally useful. The difficulty is not extraction. It is knowing what to do when extraction and the system of record disagree.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Extraction accuracy by clause type, measured against manually abstracted control set",
          unit: "percent",
          bars: [
            { label: "Term, rent, break dates", value: 98, tone: "growth" },
            { label: "Rent review mechanism", value: 94, tone: "growth" },
            { label: "Service charge provisions", value: 89, tone: "brass" },
            { label: "Alienation and assignment", value: 86, tone: "brass" },
            { label: "Repair and dilapidations", value: 79, tone: "clay" },
            { label: "Bespoke side letters", value: 61, tone: "clay" },
          ],
        },
      },
      {
        t: "p",
        text: "Note where accuracy falls away. Side letters and negotiated variations are exactly the clauses that carry unusual commercial risk, and they are the ones a model handles worst, because they are by definition non-standard. Any credible deployment routes those to a human rather than reporting a confident answer.",
      },
      {
        t: "note",
        text: "How these figures were produced: extraction rates reflect performance patterns observed when running document intelligence pipelines over structured commercial documents, benchmarked against a manually abstracted control set. Treat them as directional for scoping rather than as a published benchmark. Accuracy on your portfolio depends almost entirely on source document quality, and scanned leases from before roughly 2005 perform materially worse.",
      },
      { t: "h", text: "The part that changes behaviour" },
      {
        t: "p",
        text: "Abstraction alone produces a database. What produces a return is the monitoring loop that runs on top of it: an agent that holds the extracted obligations, watches the calendar against them, and raises the action before the deadline rather than after.",
      },
      {
        t: "viz",
        spec: {
          kind: "flow",
          steps: [
            { label: "Ingest and segment", detail: "Layout aware parsing across leases, variations, side letters and licences." },
            { label: "Extract obligations", detail: "Dates, triggers, conditions and the party carrying each duty." },
            { label: "Reconcile", detail: "Compare against the management system and flag every disagreement rather than overwriting." },
            { label: "Monitor", detail: "Watch trigger dates, notice periods and statutory windows across the whole estate." },
            { label: "Act", detail: "Raise the review, draft the notice, open the work order, escalate what needs a decision." },
          ],
          caption: "From document to action",
        },
      },
      { t: "h", text: "Operations is the same problem wearing different clothes" },
      {
        t: "p",
        text: "The identical pattern applies to the operational side of an estate. Building management systems already produce the data. Almost nobody acts on it at the speed it arrives, because acting on it means somebody reading a dashboard at the right moment.",
      },
      {
        t: "p",
        text: "An operations agent watching plant data does not need to be sophisticated to be valuable. Detecting that an air handling unit has been running at a fixed damper position for nine days, cross-referencing the occupancy schedule, and raising a work order with the fault symptom already described is unglamorous work that pays continuously.",
      },
      {
        t: "viz",
        spec: {
          kind: "curve",
          caption: "Modelled cumulative benefit across a 34 asset estate after deployment",
          unit: "£ thousand, cumulative",
          points: [
            { x: "M1", y: 0 },
            { x: "M3", y: 42 },
            { x: "M6", y: 128 },
            { x: "M9", y: 244 },
            { x: "M12", y: 391 },
            { x: "M18", y: 638 },
            { x: "M24", y: 902 },
          ],
          projectFrom: 4,
        },
      },
      {
        t: "pull",
        text: "The compliance calendar is not a calendar problem. It is a document comprehension problem that everybody has agreed to treat as a calendar problem.",
      },
      { t: "h", text: "What good looks like" },
      {
        t: "p",
        text: "A deployment worth running has three properties. Every extracted obligation links back to the clause and page it came from. Disagreements with the system of record are surfaced rather than silently resolved. And low-confidence extractions are routed to a person with the specific uncertainty named, instead of being reported at the same confidence as everything else.",
      },
      {
        t: "p",
        text: "Portfolios that skip the third property get a system their asset managers stop trusting within a quarter, which is a more expensive outcome than never having built it.",
      },
    ],
  },
];
