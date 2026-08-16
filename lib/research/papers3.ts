import type { Article } from "./types.ts";

export const paperArticles3: Article[] = [
  {
    slug: "llm-automated-compliance-checking-front-half-nearly-solved",
    cardHook: {
      lead: "of clause dependencies identified correctly",
      counter: "F1 on classifying which rules a model can even answer",
    },
    domain: "Construction Management",
    title: "The front half of compliance checking is nearly solved. The back half is where the work is",
    dek: "97% F1 on rule classification and 100% on dependency identification. Interpreting regulations turns out to be the easy part, and the industry has been optimising the wrong end.",
    date: "2026-08-16",
    readingMinutes: 9,
    metrics: [
      { value: "97%", label: "F1, rule classification" },
      { value: "100%", label: "Dependency identification" },
      { value: "97%", label: "Correct tool selection" },
    ],
    keywords: [
      "automated compliance checking BIM",
      "LLM building regulations",
      "ACC construction AI",
      "rule interpretation automation",
      "BIM regulatory compliance Ireland",
      "IDS compliance checking",
    ],
    sourcePaper: {
      title: "Leveraging large language models for BIM-based automated compliance checking",
      authors: "Published in Automation in Construction",
      venue: "Automation in Construction (Elsevier)",
      date: "December 2025, in a 2026 volume",
      url: "https://www.sciencedirect.com/science/article/pii/S0926580525007472",
      paywalled: true,
    },
    body: [
      {
        t: "p",
        text: "Checking a building against regulations is still mostly a person reading a document and a model side by side. Slow, expensive, and error-prone in the specific way that human checking always is: fine on the clauses you remembered to look at.",
      },
      {
        t: "p",
        text: "Every previous attempt at automating this hit the same wall. Somebody had to hand-translate the regulations into machine-readable rules first, and that translation was itself months of specialist work that went stale the moment the code was amended.",
      },
      { t: "h", text: "What this paper did differently" },
      {
        t: "p",
        text: "It let the model read the regulation directly. No intermediate human translation step. The LLM interprets the text, extracts the relevant BIM data, executes the checks, and writes reports that include its own step-by-step reasoning.",
      },
      {
        t: "p",
        text: "The work is framed as four sub-questions, which is a useful way to think about the whole problem: interpret the rule, prepare the building model, execute the rule, report the result.",
      },
      {
        t: "viz",
        spec: {
          kind: "flow",
          steps: [
            { label: "Structure the code", detail: "The building code is converted to JSON, segmented by clause, and validated against a JSON Schema so the structure is guaranteed before anything reasons over it." },
            { label: "Map dependencies", detail: "Clauses that depend on other clauses are identified, and query strings are generated for the model." },
            { label: "Classify checkability", detail: "Each rule is assessed for whether BIM can answer it at all. Does it involve geometry, or is it a procedural requirement no model can settle?" },
            { label: "Filter by relevance", detail: "BIM metadata decides which clauses actually apply to this building, rather than checking everything against everything." },
            { label: "Extract and check", detail: "Geometry is pulled according to the model's interpretation of the applicable clauses." },
          ],
          caption: "The pipeline, as described in the paper",
        },
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Reported performance by pipeline stage",
          unit: "percent",
          bars: [
            { label: "Dependency identification", value: 100, tone: "growth" },
            { label: "Rule classification (F1)", value: 97, tone: "growth" },
            { label: "Data extraction tool selection", value: 97, tone: "growth" },
          ],
        },
      },
      { t: "h", text: "Why these numbers are less exciting than they look" },
      {
        t: "p",
        text: "Those are strong figures and they measure the front half of the problem. Interpretation, preparation and tool selection.",
      },
      {
        t: "p",
        text: "What they do not measure is whether the checks then run correctly against a messy real model and produce findings a coordinator would agree with. The paper is honest about this framing, and the authors' own conclusion is the interesting one: the hard part that remains is reliable execution and reporting.",
      },
      {
        t: "pull",
        text: "We have spent a decade automating the part that turned out to be easy.",
      },
      {
        t: "p",
        text: "That reframing is worth more than the percentages. The industry's assumption has been that rule translation was the bottleneck, which is why so much effort went into rule languages and standardised requirement formats. If a language model can now read a regulation and correctly decide what it applies to, the bottleneck moves downstream to execution against imperfect models.",
      },
      { t: "h", text: "The companion study that got the design right" },
      {
        t: "p",
        text: "Worth pairing this with a 2026 EC3 paper from TUM, because it solves a problem this one does not: how do you know the agent is right?",
      },
      {
        t: "p",
        text: "Their approach was to run Solibri rule sets against IFC models, extract the GUIDs of the violating elements from the resulting BCF reports, and use those as ground truth to benchmark an LLM agent. They also gave the agent a classify_spaces tool so it was working with the same information the commercial verifier had.",
      },
      {
        t: "p",
        text: "That is the cleanest agent-versus-incumbent comparison design I have seen in this area. The industry tool becomes the reference answer, the agent is given equal footing rather than being handicapped, and the comparison is on identical models. Anyone evaluating a compliance product should be asking their vendor for exactly this.",
      },
      { t: "h", text: "What to do with this if you run a practice" },
      {
        t: "list",
        items: [
          "Stop waiting for perfect machine-readable regulations. The evidence here is that models can work from the text. Structuring the code as JSON helped, but it is a preparation step rather than a prerequisite years away.",
          "Ask vendors what their ground truth is. If a compliance tool cannot tell you what it was measured against, it has not been measured.",
          "Watch the reporting, not the detection. A finding that does not say which element, which clause and why is a finding nobody actions.",
          "Assume a person still signs it off. Nothing in this literature supports unsupervised regulatory approval, and the liability question has not moved at all.",
        ],
      },
      {
        t: "note",
        text: "How to read this piece: the full text sits behind Elsevier's paywall and I have not been able to access it, so the pipeline description and the three percentages follow the accessible abstract and summary. The tech stack is not fully visible in what I could read; IFC via a Python toolkit is a reasonable inference from the tool-selection metric rather than something the paper states in the part I saw. Treat that specific detail as unconfirmed.",
      },
    ],
  },

  {
    slug: "five-papers-one-pattern-orchestration-beats-model-size",
    cardHook: {
      lead: "advantage for adaptive exploration over static queries",
      counter: "advantage for the weak adaptive model over the strong static one",
    },
    domain: "Architecture & Predictive Design",
    title: "Five papers, one pattern: nobody won by using a bigger model",
    dek: "Reading a month of agentic AI research in the built environment side by side. The architectures differ completely and the conclusion is the same one every time.",
    date: "2026-08-16",
    readingMinutes: 7,
    metrics: [
      { value: "5 papers", label: "Read side by side" },
      { value: "0", label: "Won by scaling the model" },
      { value: "2", label: "Where data quality set the ceiling" },
    ],
    keywords: [
      "agentic AI construction research",
      "AI built environment 2026",
      "LLM orchestration construction",
      "AI readiness BIM data",
      "construction AI strategy Ireland",
      "agentic AI literature review",
    ],
    body: [
      {
        t: "p",
        text: "I read five papers on agentic AI in the built environment this month and wrote each of them up separately. Reading them together is more useful than reading any one of them, because the architectures have almost nothing in common and the conclusions keep converging.",
      },
      { t: "h", text: "Five different answers to the same question" },
      {
        t: "list",
        items: [
          "An LLM orchestrating Revit and Blender through MCP servers, closing the loop from site photo to updated 4D model.",
          "A multi-agent system with a publish-subscribe bus and shared memory, producing cost distributions instead of point estimates.",
          "A code-executing agent that explores an IFC model at runtime rather than assuming its structure.",
          "A fine-tuned 7B model, trained with reinforcement learning, generating regulatory rule skeletons.",
          "A structured-regulation pipeline that reads building codes directly and decides what applies.",
        ],
      },
      {
        t: "p",
        text: "MCP orchestration, multi-agent coordination, iterative code execution, small-model fine-tuning, structured pipelines. Five architectures. None of them is a bigger model.",
      },
      { t: "h", text: "The pattern" },
      {
        t: "p",
        text: "Every one of these wins through orchestration, tool access and a feedback loop. The two results that state it most directly are worth putting next to each other.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Two findings that say the same thing in different domains",
          unit: "percentage points of advantage",
          bars: [
            { label: "Adaptive exploration over static queries (TUM)", value: 37, tone: "growth" },
            { label: "Weak adaptive model over strong static model (TUM)", value: 25, tone: "growth" },
            { label: "Multi-agent over single-prompt GPT-4 (MDPI, MAPE gap)", value: 15, tone: "growth" },
          ],
        },
      },
      {
        t: "p",
        text: "In the TUM study, the weaker model using the better paradigm beat the stronger model using the worse one. In the cost estimation study, handing the whole problem to one strong model in a single prompt performed worse than a deterministic spreadsheet method.",
      },
      {
        t: "pull",
        text: "Two independent teams, two unrelated tasks, same finding: how you arrange the work beats which model does it.",
      },
      { t: "h", text: "Everyone measured the same thing first" },
      {
        t: "p",
        text: "Every paper that compared against a baseline led with hours saved and manual interventions avoided. Accuracy came second.",
      },
      {
        t: "p",
        text: "That is not because accuracy matters less. It is because time is the number a client can act on immediately, and a 12.5% error rate means nothing to someone who has never been told what their current error rate is. If you are writing a proposal, lead where the research leads.",
      },
      { t: "h", text: "Data quality is the ceiling, twice over" },
      {
        t: "p",
        text: "Two of the five hit the same wall from opposite directions.",
      },
      {
        t: "p",
        text: "In the TUM work, models that had been checked and corrected in Solibri scored noticeably higher. The agent was not the limit; the model was. In the cost estimation study, variation in the source data caused 58% of the errors.",
      },
      {
        t: "p",
        text: "That makes getting models into a defined, checked state a legitimate service in its own right rather than housekeeping you do before the interesting work. If a client's data sets a hard ceiling on what any agent can achieve, raising the ceiling is the first engagement, not a precondition you complain about.",
      },
      { t: "h", text: "Nobody claimed autonomy" },
      {
        t: "p",
        text: "The best result in the set is 55 to 57% strict accuracy on a benchmark. The most impressive demo is one wall built from miniature bricks. The strongest compliance numbers measure interpretation rather than end-to-end correctness.",
      },
      {
        t: "p",
        text: "Not one of these papers claims deployment-ready autonomy, and the honest pitch that follows is decision support. An agent that does the first pass and routes what it is unsure about to a person. That is also where liability sits comfortably, which matters more in this industry than in most.",
      },
      {
        t: "note",
        text: "How to read this piece: this is my synthesis across five papers I wrote up individually, and each of those articles carries its own citation and its own note on what I could and could not verify. Two of the five I verified directly against the arXiv record; three sit behind paywalls and I have worked from abstracts and summaries. The links are in the related articles below if you want to go to the sources.",
      },
      { t: "h", text: "What I would tell a firm this week" },
      {
        t: "list",
        items: [
          "Do not buy on model brand. The research says the arrangement of the work matters more, and that is a question about the vendor's engineering, not their API contract.",
          "Ask what it was measured against. Three of these five compared against a real baseline. Most products compare against nothing.",
          "Fix the models first. It is the cheapest available uplift and it improves everything downstream at once.",
          "Scope for supervision. Every credible result in this literature has a person in the loop. Any proposal that does not is either overselling or has not been measured.",
        ],
      },
    ],
  },
];
