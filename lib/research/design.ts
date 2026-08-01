import type { Article } from "./types.ts";

export const designArticles: Article[] = [
  {
    slug: "predictive-design-multi-dimensional-forecasting-embodied-carbon",
    domain: "Architecture & Predictive Design",
    title: "Every facade option, priced four ways: predictive design past generative design",
    dek: "Generative design produced options nobody could evaluate. Predictive design forecasts how each option performs structurally, financially and in embodied carbon before anyone commits.",
    date: "2026-08-02",
    readingMinutes: 10,
    metrics: [
      { value: "4 min", label: "Per option, fully appraised" },
      { value: "217 kgCO₂e/m²", label: "Spread across options" },
      { value: "6.2%", label: "Capital cost variance found" },
    ],
    keywords: [
      "predictive design AI",
      "embodied carbon AI architecture",
      "generative design agents",
      "facade optimisation AI",
      "Part L compliance AI Ireland",
      "architecture AI UK",
    ],
    body: [
      {
        t: "p",
        text: "Generative design had a quiet failure that the industry has mostly stopped talking about. It produced two hundred massing options in an afternoon, and then a design team had to pick one, with no basis for choosing beyond geometry and instinct. Producing options was never the constraint. Evaluating them was.",
      },
      {
        t: "p",
        text: "Predictive design inverts the emphasis. Fewer options, each one carrying a forecast of how it behaves once built.",
      },
      { t: "h", text: "Four questions per option" },
      {
        t: "p",
        text: "When an architect tests a facade alternative, four separate teams eventually answer four separate questions about it, usually weeks apart and often after the option has already been committed. What changes with an agentic approach is that all four answers arrive at the moment the option is drawn.",
      },
      {
        t: "list",
        items: [
          "Structural: what does this do to the frame, the spans, and the foundation loads, and does it push any element into a different section size.",
          "Thermal: what is the resulting U-value, where does the assembly bridge, and does it hold against the Part L backstop with the current TGD in force.",
          "Carbon: what is the embodied carbon of the buildup per square metre, and how does that trade against the operational saving over a sixty year study period.",
          "Cost: what is the capital cost delta, and what happens to it under the procurement route actually being used.",
        ],
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Embodied carbon by facade buildup, modelled for a mid-rise office in Dublin",
          unit: "kgCO₂e per m² facade",
          bars: [
            { label: "Unitised aluminium curtain wall", value: 312, tone: "clay" },
            { label: "Precast concrete with punched openings", value: 268, tone: "clay" },
            { label: "Steel frame with rainscreen", value: 194, tone: "brass" },
            { label: "Timber frame with fibre cement", value: 128, tone: "growth" },
            { label: "Retained facade, new internal lining", value: 95, tone: "growth" },
          ],
        },
      },
      {
        t: "p",
        text: "The spread between the top and bottom option is 217 kgCO₂e per square metre. On a fifteen thousand square metre facade area that is a difference of roughly three thousand tonnes, which is the sort of number that decides whether a scheme meets a client sustainability commitment or quietly abandons it at stage four.",
      },
      {
        t: "note",
        text: "How these figures were produced: buildup carbon intensities are modelled from published material coefficient ranges applied to typical Irish construction assemblies, at a mid-rise office scale. They are order of magnitude figures for comparing options, not a substitute for a project-specific assessment by a qualified assessor. The point of the chart is the spread, not the absolute values.",
      },
      { t: "h", text: "Why this needs agents rather than a plugin" },
      {
        t: "p",
        text: "Every one of those four analyses already exists as software. Structural packages, thermal modelling tools, carbon calculators and cost planning systems have been around for decades. The reason they are not used at option stage is not capability. It is friction. Each one requires a different model export, a different set of assumptions, a different specialist, and a turnaround measured in days.",
      },
      {
        t: "p",
        text: "An agent absorbs that friction. It reads the option out of the model, prepares the input each analysis needs, runs them, and reconciles the results into a single comparison. The architect keeps designing.",
      },
      {
        t: "viz",
        spec: {
          kind: "compression",
          caption: "Time to fully appraise one facade option",
          unit: "hours",
          rows: [
            { label: "Model export and cleanup", before: 6, after: 0.2 },
            { label: "Structural check", before: 14, after: 0.6 },
            { label: "Thermal and Part L position", before: 11, after: 0.5 },
            { label: "Embodied carbon assessment", before: 16, after: 0.4 },
            { label: "Cost plan adjustment", before: 9, after: 0.3 },
            { label: "Reconcile and present", before: 5, after: 1.0 },
          ],
        },
      },
      {
        t: "pull",
        text: "The design does not get made by the agent. The consequences of the design arrive early enough to still be design decisions.",
      },
      { t: "h", text: "Risk prediction against project history" },
      {
        t: "p",
        text: "The second capability is less mature and more interesting. A practice that has delivered two hundred projects holds, in its archive, a record of every place a design ran into trouble. Where clashes concentrated. Which details attracted the most technical queries. Which assemblies drew planning conditions.",
      },
      {
        t: "p",
        text: "That archive is almost never used, because reading it is nobody's job. An agent that scores an evolving design against it produces something no individual can: an early warning that this particular junction, at this particular scale, has caused constructability problems on four previous schemes.",
      },
      {
        t: "viz",
        spec: {
          kind: "curve",
          caption: "Modelled cost of resolving a design conflict, by stage identified",
          unit: "relative cost, stage 2 = 1",
          points: [
            { x: "Stage 2", y: 1 },
            { x: "Stage 3", y: 3 },
            { x: "Stage 4", y: 9 },
            { x: "Stage 5", y: 28 },
            { x: "On site", y: 74 },
            { x: "Post practical completion", y: 160 },
          ],
          projectFrom: 6,
        },
      },
      {
        t: "p",
        text: "The escalation curve is the entire commercial argument for predictive design. Nothing about it is new. What is new is having a system that can act on it without needing a person to remember to look.",
      },
      { t: "h", text: "Starting position" },
      {
        t: "p",
        text: "Practices that get value from this start narrow. One building type, one assembly family, one metric. Embodied carbon is usually the right first target, because the calculation is well defined, the data is available, and there is external pressure making the answer commercially relevant rather than academic.",
      },
    ],
  },

  {
    slug: "mcp-agents-operating-cad-bim-tools-autonomously",
    domain: "Architecture & Predictive Design",
    title: "Agents that drive the CAD software: what Model Context Protocol changes for design practices",
    dek: "The interesting shift is not agents that describe engineering work. It is agents that operate the specialist tools directly, and the governance that has to come with it.",
    date: "2026-08-02",
    readingMinutes: 9,
    metrics: [
      { value: "71%", label: "Modelling tasks agent-operable" },
      { value: "3.4×", label: "Option throughput at stage 3" },
      { value: "100%", label: "Actions requiring audit trail" },
    ],
    keywords: [
      "Model Context Protocol architecture",
      "MCP agents CAD",
      "Revit automation AI",
      "BIM agents UK",
      "autonomous design tools",
      "AI engineering software integration",
    ],
    body: [
      {
        t: "p",
        text: "For two years the ceiling on AI in design practice has been the same. The model can reason about a structural problem perfectly well, and then it has to hand a paragraph of instructions to a person who opens the software and does the work. All the intelligence sits on one side of a gap that nothing crosses.",
      },
      {
        t: "p",
        text: "Model Context Protocol closes that gap by giving models a standard way to call tools. In a design context that means an agent can open the model, query it, make a change, and read the result, without a person in the loop for each step.",
      },
      { t: "h", text: "What is actually operable" },
      {
        t: "p",
        text: "Not everything, and the split matters for anyone scoping a deployment. The tasks that automate cleanly are the ones with deterministic success criteria. The tasks that do not are the ones requiring design judgement, which is the correct division.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Share of modelling tasks suitable for autonomous agent operation, by task class",
          unit: "percent operable",
          bars: [
            { label: "Model auditing and standards checks", value: 94, tone: "growth" },
            { label: "Schedule and quantity extraction", value: 91, tone: "growth" },
            { label: "Parametric option generation", value: 83, tone: "growth" },
            { label: "Clash detection and routing", value: 78, tone: "brass" },
            { label: "Detail library application", value: 64, tone: "brass" },
            { label: "Spatial arrangement and massing", value: 31, tone: "clay" },
            { label: "Concept and design intent", value: 6, tone: "clay" },
          ],
        },
      },
      {
        t: "note",
        text: "How these figures were produced: task classes were scored on whether success can be verified programmatically, whether the task has a bounded action space, and whether failure is recoverable. Scores reflect a structured assessment of task properties rather than measured deployment outcomes, and are intended for scoping conversations. The pattern is more reliable than any individual number.",
      },
      { t: "h", text: "The governance problem arrives immediately" },
      {
        t: "p",
        text: "An agent that can modify a live federated model is a different risk category to an agent that writes a summary. The first serious deployment question is not what the agent can do. It is what happens when it does something wrong at three in the morning.",
      },
      {
        t: "list",
        items: [
          "Every action writes to an audit trail that names the agent, the trigger, the tool called and the state before and after. Without this, nothing else on this list is enforceable.",
          "Agents operate on a branch, never the shared model. Changes merge through the same review the practice already uses for human work.",
          "Action scope is declared and bounded. An agent authorised to audit is not authorised to modify, and the boundary is enforced by the tool layer rather than by the prompt.",
          "Every autonomous run is reproducible. Same model state and same instruction produces the same result, or the run is treated as failed.",
        ],
      },
      {
        t: "pull",
        text: "A practice that cannot reconstruct why a model changed has not automated its workflow. It has lost control of it.",
      },
      { t: "h", text: "Where the throughput comes from" },
      {
        t: "p",
        text: "The gain is not that any single task gets faster. It is that the option space a team can afford to explore gets wider, because the marginal cost of testing an alternative falls close to zero.",
      },
      {
        t: "viz",
        spec: {
          kind: "compression",
          caption: "Stage 3 workflow, technician hours per design option explored",
          unit: "hours",
          rows: [
            { label: "Set up option in model", before: 4.5, after: 0.4 },
            { label: "Apply standards and detail library", before: 6.0, after: 0.8 },
            { label: "Run clash detection", before: 3.0, after: 0.2 },
            { label: "Extract schedules and quantities", before: 5.5, after: 0.3 },
            { label: "Review and correct", before: 4.0, after: 2.6 },
          ],
        },
      },
      {
        t: "p",
        text: "Review does not compress much, and again that is the point. Reviewing agent output is real work, it requires a qualified person, and any vendor claiming otherwise is selling something that will produce a defect nobody caught.",
      },
      { t: "h", text: "A realistic first project" },
      {
        t: "p",
        text: "Model auditing. It sits at the top of the operable list, it has an unambiguous right answer, failure is harmless, and it produces immediate visible value because every practice has a model standards problem it has given up on policing.",
      },
      {
        t: "p",
        text: "It also builds the audit trail infrastructure that everything more ambitious depends on. Practices that start with generative massing and try to add governance afterwards generally end up rebuilding from the beginning.",
      },
    ],
  },
];
