import type { Article } from "./types.ts";

export const constructionArticles: Article[] = [
  {
    slug: "rfi-submittal-agents-construction-document-processing",
    domain: "Construction Management",
    title: "The first draft of every RFI: document agents on live construction projects",
    dek: "Site teams lose more hours to structured paperwork than to any technical problem. That work has a shape, and the shape is automatable.",
    date: "2026-08-02",
    readingMinutes: 8,
    metrics: [
      { value: "11.4 hrs", label: "Weekly admin recovered per PM" },
      { value: "2.1 days", label: "RFI turnaround, from 6.8" },
      { value: "412 pp", label: "Tender reviewed in one pass" },
    ],
    keywords: [
      "construction AI RFI automation",
      "submittal review AI",
      "tender analysis agentic AI",
      "construction document processing",
      "AI construction management Ireland",
      "site admin automation UK",
    ],
    body: [
      {
        t: "p",
        text: "Ask a project manager on an Irish or UK site where their week goes and the answer is rarely construction. It is the request for information that needs writing up properly, the submittal that needs checking against the specification, the daily log nobody filled in, and the tender addendum that changed something in a document five hundred pages long.",
      },
      {
        t: "p",
        text: "This is highly structured work. It has a template, a required set of references, and a defined output. Those properties are exactly what makes it suitable for agents, and they are also why construction has adopted this faster than more glamorous applications.",
      },
      { t: "h", text: "Where the hours actually go" },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Project manager time by activity, typical week on a live commercial project",
          unit: "hours per week",
          bars: [
            { label: "RFI drafting and chasing", value: 6.4, tone: "clay" },
            { label: "Submittal review", value: 5.1, tone: "clay" },
            { label: "Daily logs and reporting", value: 4.2, tone: "brass" },
            { label: "Tender and variation review", value: 3.8, tone: "brass" },
            { label: "Correspondence and records", value: 3.3, tone: "brass" },
            { label: "Site walking and coordination", value: 12.5, tone: "growth" },
            { label: "Meetings", value: 8.7, tone: "slate" },
          ],
        },
      },
      {
        t: "p",
        text: "The first five bars total 22.8 hours. That is more than half a working week on document handling, and it is the half that a competent PM most resents, because it is the half that does not require them.",
      },
      {
        t: "note",
        text: "How these figures were produced: activity distribution is modelled from typical commercial project management workloads at a mid-size main contractor, on a project in the €15m to €40m range. Individual projects vary widely with procurement route and contract form. Use the shape of the distribution rather than the specific hours.",
      },
      { t: "h", text: "What first pass means" },
      {
        t: "p",
        text: "The framing that works commercially is first pass, not replacement. An agent that drafts the RFI, cites the drawing and specification clause it relates to, identifies who needs to answer it and by when, and puts it in front of the PM for approval is doing about eighty percent of the work and none of the deciding.",
      },
      {
        t: "viz",
        spec: {
          kind: "flow",
          steps: [
            { label: "Detect the trigger", detail: "A site query, a drawing discrepancy, a specification ambiguity raised in the daily log." },
            { label: "Locate the references", detail: "Pull the relevant drawing revision, specification section and contract clause." },
            { label: "Draft", detail: "Write the RFI in the project's own template with references cited and a proposed position." },
            { label: "Route", detail: "Identify the responsible discipline and the contractual response window." },
            { label: "Track", detail: "Chase the response, escalate on the contractual deadline, log the outcome against the programme." },
          ],
          caption: "The RFI loop, agent-drafted and human-approved",
        },
      },
      {
        t: "p",
        text: "The tracking step is quietly the most valuable one. RFI turnaround is a programme risk that most projects manage through somebody's memory, and the cost of a late response is usually borne long after anybody remembers who was waiting on what.",
      },
      {
        t: "pull",
        text: "Nobody on site wants an AI that makes decisions. They want the paperwork to have already started when they get back to the cabin.",
      },
      { t: "h", text: "Tender and bid analysis" },
      {
        t: "p",
        text: "The second application is less frequent and higher value. A tender pack runs to hundreds of pages across employer's requirements, specification, preliminaries and drawings, and estimating teams read it under time pressure with commercial exposure attached to anything missed.",
      },
      {
        t: "p",
        text: "An agent reading the full pack in one pass produces a different kind of output to a human reader: a complete list of every obligation, every deviation from the standard contract form, every performance requirement, and every place two documents contradict each other. It will not price the job. It will make sure the person pricing the job knows what is in it.",
      },
      {
        t: "viz",
        spec: {
          kind: "compression",
          caption: "Tender review, 412 page pack",
          unit: "hours",
          rows: [
            { label: "First read and familiarisation", before: 9, after: 0.5 },
            { label: "Obligation extraction", before: 12, after: 1.0 },
            { label: "Contract deviation check", before: 7, after: 0.8 },
            { label: "Internal contradiction check", before: 6, after: 0.4 },
            { label: "Estimator review of findings", before: 4, after: 3.5 },
          ],
        },
      },
      { t: "h", text: "What to be careful about" },
      {
        t: "p",
        text: "Two failure modes come up repeatedly. The first is deploying against document sets that are not under version control, where the agent confidently cites a superseded drawing revision. The second is allowing the agent to issue rather than draft, which converts a helpful tool into a contractual liability the first time it gets something wrong.",
      },
      {
        t: "p",
        text: "Both are solvable, and both need solving before the first live project rather than after.",
      },
    ],
  },

  {
    slug: "reality-capture-bim-feedback-loops-data-centric-engineering",
    domain: "Construction Management",
    title: "Closing the loop between site and model: reality capture as a live data asset",
    dek: "Drone and 360 capture produces enormous datasets that mostly get archived. Agents turn that data into deviation detection, and deviation detection into design action.",
    date: "2026-08-02",
    readingMinutes: 9,
    metrics: [
      { value: "8 days → 4 hrs", label: "Capture to deviation report" },
      { value: "23mm", label: "Detectable deviation threshold" },
      { value: "£1.9m", label: "Modelled rework avoided" },
    ],
    keywords: [
      "reality capture BIM AI",
      "scan to BIM automation",
      "construction deviation detection",
      "digital twin construction Ireland",
      "data centric engineering",
      "drone survey AI UK",
    ],
    body: [
      {
        t: "p",
        text: "Most large sites now capture themselves weekly. Drone photogrammetry, 360 walkthroughs, laser scanning at key milestones. The data volume is substantial and the capture cost has fallen far enough that it is close to routine.",
      },
      {
        t: "p",
        text: "What happens to that data afterwards is the problem. It goes into a folder. Someone looks at it when there is a dispute. The comparison against the model that would have caught a problem early is a specialist task that costs money and takes a week, so it happens at milestones rather than continuously.",
      },
      { t: "h", text: "Continuous comparison changes what gets caught" },
      {
        t: "p",
        text: "An agent doing registration and comparison automatically shifts this from a milestone exercise to a weekly one. The technical work is not new. Point cloud registration and deviation analysis have existed for years. What is new is removing the human coordination cost that limited how often it ran.",
      },
      {
        t: "viz",
        spec: {
          kind: "compression",
          caption: "Capture to actionable deviation report",
          unit: "hours",
          rows: [
            { label: "Data transfer and preparation", before: 8, after: 0.5 },
            { label: "Registration to project datum", before: 12, after: 0.7 },
            { label: "Model comparison", before: 20, after: 1.2 },
            { label: "Deviation classification", before: 14, after: 0.8 },
            { label: "Report and route to discipline", before: 10, after: 0.8 },
          ],
        },
      },
      {
        t: "p",
        text: "Eight days becomes about four hours. The interesting consequence is not the time saving. It is that a four hour turnaround means capture can happen weekly and still be acted on inside the same week, which puts deviation detection ahead of the work that would build on top of the deviation.",
      },
      {
        t: "viz",
        spec: {
          kind: "curve",
          caption: "Modelled cost to correct a positional deviation, by weeks between occurrence and detection",
          unit: "£ thousand per instance",
          points: [
            { x: "Week 1", y: 4 },
            { x: "Week 2", y: 11 },
            { x: "Week 4", y: 38 },
            { x: "Week 8", y: 96 },
            { x: "Week 12", y: 178 },
            { x: "At handover", y: 340 },
          ],
          projectFrom: 5,
        },
      },
      {
        t: "note",
        text: "How these figures were produced: correction costs are modelled on a structural or MEP positional deviation on a commercial project, escalating as following trades build on the error and as access becomes restricted. Figures assume no consequential programme delay, which makes them conservative. Real disputes routinely exceed the handover figure.",
      },
      { t: "h", text: "Treating engineering data as an asset" },
      {
        t: "p",
        text: "The wider shift underneath all of this is that structured data starts being managed as a primary output of engineering rather than a byproduct. Sensor readings, inspection records and as-built models are all describing the same physical thing at different moments, and connecting them enables a question that has historically been very hard to ask: is this element behaving the way we assumed it would.",
      },
      {
        t: "list",
        items: [
          "Deterioration patterns become visible across a portfolio rather than a single asset, because inspection records from twenty buildings can be read together.",
          "Design assumptions can be tested against measured behaviour, which slowly improves the assumptions rather than repeating them.",
          "What-if analysis runs against historical evidence instead of engineering judgement alone, which does not replace the judgement but does give it something to check against.",
        ],
      },
      {
        t: "pull",
        text: "The scan is not the deliverable. The difference between the scan and the model is the deliverable.",
      },
      { t: "h", text: "Practical constraints worth knowing early" },
      {
        t: "p",
        text: "Deviation thresholds have to be set against what matters rather than what is detectable. Modern capture will happily report every point that sits 5mm from where the model says it should be, and a report containing forty thousand deviations is functionally identical to no report. Thresholds should come from the tolerance in the specification, and classification should distinguish between a deviation that affects a following trade and one that does not.",
      },
      {
        t: "p",
        text: "Registration accuracy is the other constraint. If the point cloud is not tied properly to the project datum, everything downstream is measuring the registration error rather than the building. This is the single most common reason these deployments produce noise instead of insight.",
      },
      { t: "h", text: "Where to begin" },
      {
        t: "p",
        text: "Structural frame position on a single storey, compared weekly, with a threshold taken from the structural specification. It is narrow, the tolerance is unambiguous, the consequence of a missed deviation is well understood by everyone on the project, and it produces a result inside a month that either works or clearly does not.",
      },
    ],
  },
];
