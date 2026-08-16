import type { Article } from "./types.ts";

/**
 * Analyses of published research. Distinct from the modelled-economics pieces:
 * the numbers here belong to the papers, and each article carries its source as
 * structured data rather than a link buried in the prose.
 */

export const paperArticles1: Article[] = [
  {
    slug: "mcp-4d-bim-progress-monitoring-from-a-single-photo",
    domain: "Construction Management",
    title: "One photo, one updated model: what the first MCP progress-monitoring paper actually shows",
    dek: "A research team wired Claude to Revit and Blender through MCP and closed the loop from site photograph to updated 4D model with nobody in the middle. The result is an existence proof, not a product.",
    date: "2026-08-16",
    readingMinutes: 8,
    metrics: [
      { value: "4 stages", label: "Fully autonomous loop" },
      { value: "91.4%", label: "Completion computed from one image" },
      { value: "1 wall", label: "Total experimental scope" },
    ],
    keywords: [
      "MCP BIM progress monitoring",
      "4D BIM automation",
      "Revit MCP Blender MCP",
      "construction progress AI",
      "agentic AI construction Ireland",
      "as-built model automation",
    ],
    sourcePaper: {
      title: "MCP-enabled LLM for automated 4D BIM progress monitoring",
      authors: "Published at AIACT 2026",
      venue: "ACM AIACT 2026",
      date: "April 2026",
      url: "https://dl.acm.org/doi/10.1145/3795496.3795715",
      paywalled: true,
    },
    body: [
      {
        t: "p",
        text: "Progress monitoring on most sites still works the way it did thirty years ago. Somebody walks the job, compares what they see against the programme, forms a judgement, and later types that judgement into a report. The 4D model, the one that supposedly links the geometry to the schedule, is updated afterwards if anyone gets round to it.",
      },
      {
        t: "p",
        text: "It is slow, it is subjective, and the model drifts away from reality within weeks of the project starting. What this paper does is close that loop end to end.",
      },
      { t: "h", text: "What they built" },
      {
        t: "p",
        text: "An LLM acting as an orchestrator, driving BIM and 3D tools through MCP servers. No human step between the photograph and the updated as-built model. Four stages run in sequence.",
      },
      {
        t: "viz",
        spec: {
          kind: "flow",
          steps: [
            { label: "Match image to model", detail: "The LLM's multimodal reasoning matches what is in the site photograph to the corresponding elements in the 4D BIM." },
            { label: "Reconstruct in 3D", detail: "Hyper3D generates a 3D reconstruction from the single image. Revit dimensions provide the scale calibration." },
            { label: "Assess progress by volume", detail: "Blender computes the built volume and compares it against the volume the element should have when complete." },
            { label: "Write back to the model", detail: "The completion figure is matched to 4D BIM time steps, producing a quantitative progress rate, and the as-built model updates." },
          ],
          caption: "The four autonomous stages, as described in the paper",
        },
      },
      {
        t: "p",
        text: "The stack is worth reading closely because it is unusually specific. Claude is the orchestrator. Revit MCP and Blender MCP give it tool access. Hyper3D handles single-image reconstruction. The 4D BIM supplies the schedule link.",
      },
      {
        t: "pull",
        text: "The interesting claim is not that an AI looked at a photo. It is that nothing in the chain needed a person.",
      },
      { t: "h", text: "The experiment, and why you should read it carefully" },
      {
        t: "p",
        text: "A masonry wall mock-up, built from miniature bricks. From one photograph the system reconstructed the partially built wall, computed a 91.4% completion ratio, classified the element as delayed, and updated the 4D BIM.",
      },
      {
        t: "p",
        text: "That is one wall, made of toy bricks, in controlled conditions. There are no accuracy figures beyond the single case, no repeat runs, and no live site. Anyone quoting 91.4% as evidence that progress monitoring is solved has not read past the abstract.",
      },
      {
        t: "note",
        text: "How to read this piece: the figures above are the paper's, not mine. I have not been able to access the full text, which sits behind the ACM paywall, so the description of the pipeline follows the published abstract and summary. Treat the stage breakdown as accurate and the performance claim as a single uncontrolled data point.",
      },
      { t: "h", text: "What it is actually evidence of" },
      {
        t: "p",
        text: "Read as a product claim, this paper is thin. Read as an architecture claim, it is significant, and that is the reading I would take to a client.",
      },
      {
        t: "list",
        items: [
          "The orchestration pattern works. An LLM can hold a multi-step engineering task, call specialist tools in the right order, and pass state between them without a human sequencing the steps.",
          "MCP is doing real work here rather than being a wrapper. Revit and Blender are not being scripted through bespoke integrations; they are being exposed as tools an agent can reason about.",
          "The hard part turned out to be perception, not reasoning. Single-image reconstruction with scale calibration is the fragile link, and it is the one a real site will break first.",
          "Volume-based assessment is a genuinely good choice. It gives a continuous number rather than a binary complete or not, which is what a schedule actually needs.",
        ],
      },
      { t: "h", text: "What breaks on a real site" },
      {
        t: "p",
        text: "A miniature wall photographed in good light is the easiest case that could still be called a case. On a live job you get partial occlusion from scaffolding and plant, weather and shadow, elements that are wrapped or propped, and the ordinary chaos of materials stacked in front of the thing you are trying to measure.",
      },
      {
        t: "p",
        text: "You also get the problem nobody in the paper had to solve: knowing which element you are looking at when forty of them are identical. Grid reference and level are obvious to a person standing there and invisible in a photograph.",
      },
      { t: "h", text: "What I would take from it" },
      {
        t: "p",
        text: "If you are a contractor being pitched automated progress monitoring in the next year, this paper tells you what to ask. Not whether the AI can assess a photograph, but how the system knows which element the photograph shows, what it does when it cannot tell, and whether it writes back to the model or produces yet another report nobody reads.",
      },
      {
        t: "p",
        text: "The write-back is the part that matters commercially. A monitoring system that updates the 4D model keeps the model honest. One that emits a PDF adds to the pile.",
      },
    ],
  },

  {
    slug: "probabilistic-cost-estimation-multi-agent-llm-study",
    cardHook: {
      lead: "estimating error with a multi-agent system",
      counter: "when one strong model is given the whole problem in a single prompt",
    },
    domain: "Real Estate & Development",
    title: "A number is not an estimate: the multi-agent study that produced cost distributions instead",
    dek: "Twelve cost engineers, three real buildings, and a measured comparison against deterministic BIM, manual probabilistic estimating and single-prompt GPT-4. The agents won, and the ablation says why.",
    date: "2026-08-16",
    readingMinutes: 10,
    metrics: [
      { value: "12.5%", label: "MAPE, against 18.7 to 27.4%" },
      { value: "4.2 min", label: "Per estimate, from 18.5 to 68" },
      { value: "$0.15", label: "API cost per run" },
    ],
    keywords: [
      "probabilistic cost estimation AI",
      "multi-agent LLM construction",
      "BIM cost estimating automation",
      "Monte Carlo cost estimation",
      "AutoGen construction",
      "quantity surveying AI Ireland",
    ],
    sourcePaper: {
      title: "Agentic AI and LLM framework for probabilistic cost estimation from fragmented BIM data",
      authors: "Published in Intelligent Infrastructure and Construction",
      venue: "MDPI Intelligent Infrastructure and Construction",
      date: "28 June 2026",
      url: "https://doi.org/10.3390/iic2030008",
    },
    body: [
      {
        t: "p",
        text: "Cost data for a building does not live anywhere. It lives in an IFC file, and a spreadsheet, and a PDF quote from a subcontractor, and someone's handwritten note, and a paragraph of contract text. Different units, different resolutions, different levels of confidence.",
      },
      {
        t: "p",
        text: "An estimator reconciles all of that by hand and then produces a single number. That number then travels through the business as though it were a fact.",
      },
      {
        t: "p",
        text: "The research team quantified both halves of that problem before building anything, which is the part I respect most. Interviews with twelve cost engineers and analysis of three real projects put manual reconciliation at an average of 14.3 hours per project, and cost overruns at an average of 15.8% against the initial deterministic estimate.",
      },
      { t: "h", text: "One agent per job" },
      {
        t: "p",
        text: "Rather than one model doing everything, the system assigns each part of the estimating job to an agent, coordinated by an orchestrator.",
      },
      {
        t: "viz",
        spec: {
          kind: "flow",
          steps: [
            { label: "Orchestrator", detail: "Decomposes the task, allocates work, routes exceptions." },
            { label: "Three ingestion agents", detail: "One each for text, tabular and geometric sources. The formats never meet until they have been read." },
            { label: "Integration and alignment", detail: "Entity resolution and semantic conflicts. Metres against feet. Concrete grade 30 against C30." },
            { label: "Uncertainty quantification", detail: "Finds missing fields, infers distribution types (triangular, beta-PERT, lognormal) and flags its own assumptions." },
            { label: "Monte Carlo", detail: "Ten thousand iterations produce a cost distribution rather than a point." },
          ],
          caption: "Agent roles, as specified in the paper",
        },
      },
      {
        t: "p",
        text: "Agents communicate over a publish-subscribe bus with shared memory that persists between runs. The stack is Python 3.11, AutoGen 0.2 for the agent roles, LangChain calling GPT-4 Turbo, IfcOpenShell for the IFC, pandas with pdfplumber and Tesseract for the documents, and NumPy with SciPy for the simulation.",
      },
      {
        t: "p",
        text: "Two temperature settings, and this is a nice detail: 0.2 for parsing, where you want determinism, and 0.7 for uncertainty reasoning, where you want the model to consider alternatives.",
      },
      { t: "h", text: "How it was measured" },
      {
        t: "p",
        text: "Three real buildings, a concert hall, an exhibition veranda and a teaching building, with between 98 and 386 cost elements each. Compared against three baselines: deterministic BIM using Revit and CostX, manual probabilistic estimation in @RISK, and a non-agentic single-prompt GPT-4 Turbo. Three runs each, paired t-tests, five-fold cross-validation, and sensitivity checks on temperature and sample count.",
      },
      {
        t: "p",
        text: "That last sentence is why this paper is worth your time. Most AI-in-construction papers compare against nothing.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Mean absolute percentage error by method, lower is better",
          unit: "MAPE, percent",
          bars: [
            { label: "Multi-agent framework", value: 12.5, tone: "growth" },
            { label: "Manual probabilistic (@RISK)", value: 18.7, tone: "brass" },
            { label: "Deterministic BIM (Revit + CostX)", value: 22.1, tone: "clay" },
            { label: "Single-prompt GPT-4 Turbo", value: 27.4, tone: "clay" },
          ],
        },
      },
      {
        t: "p",
        text: "Note where the single-prompt LLM lands. Bottom. Handing the whole problem to one model in one call performed worse than a spreadsheet-based deterministic method. The agent architecture is doing the work, not the language model.",
      },
      {
        t: "viz",
        spec: {
          kind: "compression",
          caption: "Time and manual effort per estimate",
          unit: "minutes",
          rows: [
            { label: "Manual probabilistic (@RISK)", before: 68, after: 4.2 },
            { label: "Deterministic BIM", before: 42, after: 4.2 },
            { label: "Single-prompt LLM", before: 18.5, after: 4.2 },
          ],
        },
      },
      { t: "h", text: "The finding that matters most" },
      {
        t: "p",
        text: "Accuracy is the headline, but calibration is the real result. The framework achieved 86% coverage on nominal 90% prediction intervals, against 74% for manual estimation and 62% for the LLM-only approach, with intervals 38 to 46% narrower.",
      },
      {
        t: "p",
        text: "Coverage is the question of whether your confidence interval means what it says. An estimate that claims 90% confidence and is right 62% of the time is worse than useless, because people make decisions on it. The LLM-only baseline was confidently wrong. The agent system was closer to honest.",
      },
      {
        t: "pull",
        text: "A narrower interval is only an improvement if the interval was telling the truth in the first place.",
      },
      {
        t: "p",
        text: "The ablation isolates why. Removing the integration and alignment agent damaged entity resolution most, which ran at 86.5%. Removing the uncertainty quantification agent damaged calibration most. Those are two different failure modes and the architecture separates them cleanly.",
      },
      { t: "h", text: "What a developer would actually do with this" },
      {
        t: "list",
        items: [
          "Evaluate more options. At 4.2 minutes an estimate you can price six design variants in the time one used to take, which changes what gets considered rather than just what gets costed.",
          "Put contingency where the risk is. Tornado diagrams from the simulation show which inputs drive the spread, so contingency stops being a flat percentage applied out of habit.",
          "Defend the number. Agent logs give an audit trail, which matters when a board asks why the estimate moved.",
          "Improve with repetition. Shared memory persists across runs, so a firm estimating similar building types repeatedly gets compounding benefit.",
        ],
      },
      {
        t: "note",
        text: "How to read this piece: all figures belong to the paper, not to me. The full text sits behind MDPI's access controls and I have verified the DOI resolves to a genuine record in Intelligent Infrastructure and Construction, volume 2, issue 3. Sanity-check the numbers against the paper before quoting them in a proposal.",
      },
      { t: "h", text: "The caveats worth naming out loud" },
      {
        t: "p",
        text: "Three projects, all in Hong Kong and mainland China. Irish and UK cost structures, labour rates, procurement routes and contract forms are different enough that the MAPE figure will not transfer unchanged. It runs in batch rather than real time. And it depends on GPT-4, which is a genuine data privacy problem for anything commercially sensitive, and a reason to look hard at the small-model argument in the compliance research.",
      },
    ],
  },
];
