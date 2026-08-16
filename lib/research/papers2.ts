import type { Article } from "./types.ts";

export const paperArticles2: Article[] = [
  {
    slug: "adaptive-exploration-beats-bigger-models-bim-queries",
    cardHook: {
      lead: "accuracy when the agent explores the model by running code",
      counter: "when it assumes the structure instead",
    },
    domain: "Architecture & Predictive Design",
    title: "Let the agent write code: TUM's result that the paradigm beats the model",
    dek: "A 1,027-task benchmark across 37 IFC models found that letting an agent explore a model by running code beat static query generation by 37 points. The weaker adaptive model beat the stronger static one.",
    date: "2026-08-16",
    readingMinutes: 10,
    metrics: [
      { value: "+36.8 to 38.5pp", label: "Adaptive over static, p < 0.001" },
      { value: "1,027", label: "Benchmark tasks, 37 models" },
      { value: "55 to 57%", label: "Strict accuracy, still not enough" },
    ],
    keywords: [
      "BIM information extraction LLM",
      "ifc-bench benchmark",
      "CodeAct agent IFC",
      "IFC query natural language",
      "adaptive exploration BIM",
      "IfcOpenShell agent",
    ],
    sourcePaper: {
      title: "BIM Information Extraction Through LLM-based Adaptive Exploration",
      authors: "Sylvain Hellin, Suhyung Jang, Stefan Fuchs, Stavros Nousias, André Borrmann",
      venue: "arXiv, Technical University of Munich",
      date: "3 May 2026",
      url: "https://arxiv.org/abs/2605.01698",
    },
    body: [
      {
        t: "p",
        text: "Two problems sit on top of each other here, and the paper is unusually clear about both.",
      },
      {
        t: "p",
        text: "The first is that the people who need information out of a building model rarely know how to get it. An architect, a construction manager or a facilities manager wants to know how many fire doors are on level three. Getting that answer requires a query language or an API neither of them writes.",
      },
      {
        t: "p",
        text: "The second is worse. The same property is stored differently depending on which tool authored the model, which convention the team followed, and what language they worked in. Door width might be Width, or Rough Width, or NominalWidth, or Breite (B). There is no canonical place to look.",
      },
      {
        t: "p",
        text: "Existing systems translate a natural language question into one fixed query, which works until the model is organised differently than assumed. The same team's earlier agent had twenty-nine hand-coded tools, and 45% of its errors traced back to the limits of those tools.",
      },
      { t: "h", text: "The idea: stop assuming, start looking" },
      {
        t: "p",
        text: "Adaptive exploration means a CodeAct-style agent that writes and runs arbitrary Python against the live model, looks at what came back, and adjusts. It discovers how the model is structured rather than assuming it.",
      },
      {
        t: "p",
        text: "The loop is simple. The agent receives the question, the model path, its execution history and optionally some tool descriptions. It emits either a code action, meaning reasoning plus Python, or a final answer. The code runs in a sandbox with no network access, the output is appended to history, and an iteration cap forces the agent to abstain rather than loop forever.",
      },
      {
        t: "pull",
        text: "The agent is not told where door width lives. It goes and finds out.",
      },
      { t: "h", text: "How it was tested" },
      {
        t: "p",
        text: "This is the most rigorous evaluation design in any of the five papers I have read this month. A three by four factorial ablation, run on the 514-question held-out half of a new benchmark the team released alongside the work.",
      },
      {
        t: "p",
        text: "That benchmark, ifc-bench v2, is 1,027 tasks across 37 IFC models from 21 projects. Crucially it spans Revit 2011 through 2025, ArchiCAD 11 through 25, Synchro and DDS-CAD, several IFC schema versions and multiple languages. It is built to be heterogeneous on purpose, which is the whole point.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Strict accuracy by approach, from the paper's factorial ablation",
          unit: "percent, higher is better",
          bars: [
            { label: "Adaptive, strong model", value: 56, tone: "growth" },
            { label: "Adaptive, weak model", value: 44, tone: "growth" },
            { label: "Static, strong model", value: 19, tone: "clay" },
          ],
        },
      },
      {
        t: "p",
        text: "Adaptive beat static by 36.8 to 38.5 percentage points across every augmentation configuration, at p below 0.001. The strong adaptive model reached 55 to 57% strict accuracy while abstaining on under 7% of questions. The static approach abstained on roughly half.",
      },
      {
        t: "p",
        text: "The result I would put in front of anyone choosing an AI vendor: the weaker adaptive model beat the stronger static one. Architecture beat capability.",
      },
      { t: "h", text: "The augmentation finding is the useful one" },
      {
        t: "p",
        text: "They tested two ways of helping the agent. Hybrid documentation retrieval, combining dense and BM25 search with reverse-question search, RRF fusion and a cross-encoder rerank. And domain tools, either hand-written or auto-generated by a seven-agent pipeline that identifies patterns, creates tools, debugs them and prunes the ones that earn their keep.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Effect of augmentation on the weaker model, percentage points",
          unit: "change in accuracy",
          bars: [
            { label: "Documentation retrieval", value: 4.9, tone: "growth" },
            { label: "Strong model, any augmentation", value: 0.6, tone: "brass" },
            { label: "Hand-written domain tools", value: -10.2, tone: "clay" },
          ],
        },
      },
      {
        t: "p",
        text: "Read that last bar again. Giving the weaker model hand-written tools made it 10.2 points worse. The tools trapped it in unproductive loops, because a tool is an instruction about how to think, and a weak model follows it off a cliff.",
      },
      {
        t: "p",
        text: "For the strong model, augmentation moved the needle by under a point in either direction. All that tool engineering was noise.",
      },
      { t: "h", text: "Two things worth carrying into your own work" },
      {
        t: "p",
        text: "First, the authors expect the finding to generalise beyond Python. Whether the harness is an MCP tool server, SQL, Cypher or a CLI, the claim is that iterative execution with feedback is what matters, not the interface. If they are right, that is a design principle rather than a result.",
      },
      {
        t: "p",
        text: "Second, and this is the line I would underline: models that had been checked and corrected in Solibri scored noticeably higher. Model quality raised the ceiling on what any agent could extract.",
      },
      {
        t: "p",
        text: "That is a commercial observation dressed as a footnote. If cleaning a model measurably improves what AI can do with it, then getting models into a defined state is not preparatory work you do before the interesting project. It is the project.",
      },
      { t: "h", text: "The number that keeps this honest" },
      {
        t: "p",
        text: "55 to 57% strict accuracy. On a benchmark. Under lab conditions.",
      },
      {
        t: "p",
        text: "That is nowhere near enough for unsupervised use on anything safety-critical, and the authors say so. It is enough for a first pass that a person checks, which is the same conclusion every serious paper in this area reaches. It also covers IFC only, and tested one model family.",
      },
      {
        t: "note",
        text: "How to read this piece: I verified the title, authors, submission date and abstract directly against the arXiv record. The accuracy figures come from the full text as summarised to me rather than from the abstract, which states the direction of the result but not the numbers. The benchmark and code are released under CC-BY-4.0, so this one is genuinely reproducible if you want to check it yourself.",
      },
    ],
  },

  {
    slug: "small-model-beats-frontier-code-compliance-reinforcement-learning",
    cardHook: {
      lead: "better on token-level distance after reinforcement learning",
      counter: "better on tree edit distance, from a 7B model",
    },
    domain: "Architecture & Predictive Design",
    title: "A 7B model that beat Claude and GPT-5.2 at reading building regulations",
    dek: "Fine-tuning plus reinforcement learning on a narrow regulatory task outperformed frontier models zero-shot. The argument for training rather than prompting, and for keeping regulation on your own hardware.",
    date: "2026-08-16",
    readingMinutes: 8,
    metrics: [
      { value: "−23.8%", label: "Tree edit distance vs SFT baseline" },
      { value: "−38.6%", label: "Token-level Levenshtein distance" },
      { value: "7B", label: "Parameters, locally hostable" },
    ],
    keywords: [
      "automated code compliance LLM",
      "building regulation AI",
      "GRPO reinforcement learning construction",
      "small language model compliance",
      "regulatory AI built environment",
      "data sovereignty AI construction",
    ],
    sourcePaper: {
      title: "Reinforcement learning to improve large language model-based automated code compliance systems",
      authors: "Jack Wei Lun Shi, Minghao Dang, Wawan Solihin, Leong Hien Poh, Justin K. W. Yeoh",
      venue: "arXiv, National University of Singapore",
      date: "21 June 2026",
      url: "https://arxiv.org/abs/2606.22402",
    },
    body: [
      {
        t: "p",
        text: "Automated code compliance means turning regulatory text into something a computer can execute against a model. The obvious approach is to ask a large language model to do the translation.",
      },
      {
        t: "p",
        text: "The obvious approach fails in a specific and dangerous way. The models generate rules that look right and are wrong, or invent requirements that do not exist. In compliance, a plausible-but-wrong rule is worse than no rule at all, because no rule gets noticed and a wrong rule gets trusted.",
      },
      { t: "h", text: "Two stages, doing two different jobs" },
      {
        t: "p",
        text: "P4IR, the framework in this paper, splits the problem. Supervised fine-tuning first, to instil the domain knowledge and get the semantics right. Then Group Relative Policy Optimization, a reinforcement learning method, to improve the structure of what gets generated and cut hallucination.",
      },
      {
        t: "p",
        text: "The intermediate representation is a code skeleton: the classes, functions and parameters an executable rule would need, without the implementation. The reward signal is Jaccard similarity between the generated skeleton and a reference one, measured over those three components.",
      },
      {
        t: "p",
        text: "Two details I found interesting. The base model is Mistral 7B Instruct v0.3, chosen specifically because it is open source. And the GRPO stage deliberately omits chain-of-thought reasoning steps, which is against current fashion and evidently worked.",
      },
      {
        t: "viz",
        spec: {
          kind: "stack",
          caption: "Improvement over supervised fine-tuning alone, from the paper's abstract",
          unit: "percent reduction in distance, higher is better",
          bars: [
            { label: "Token-level Levenshtein distance", value: 38.6, tone: "growth" },
            { label: "Tree edit distance", value: 23.8, tone: "growth" },
          ],
        },
      },
      { t: "h", text: "The result that should change how firms buy" },
      {
        t: "p",
        text: "In zero-shot comparison, this 7B model outperformed Claude Opus, Sonnet 4.5, GPT-5.2 and Qwen on both code structure and semantics.",
      },
      {
        t: "p",
        text: "Sit with that. A model small enough to run on a workstation, trained on the right domain data, beat the frontier on a narrow regulatory task. The GRPO stage also produced a small but statistically significant reduction in false positives, which in compliance is the metric that decides whether anyone keeps using the system.",
      },
      {
        t: "pull",
        text: "On a narrow task with good training data, the question stops being which frontier model you subscribe to.",
      },
      { t: "h", text: "Why this matters commercially, not just technically" },
      {
        t: "p",
        text: "Two arguments follow, and they compound.",
      },
      {
        t: "list",
        items: [
          "Train, do not just prompt. Where a task is narrow, repetitive and accuracy-critical, and where you can assemble paired training data, fine-tuning a small model is a defensible engineering decision rather than a cost-saving compromise.",
          "Keep the data where it belongs. A 7B model runs on your own hardware. For a practice handling regulatory submissions, client drawings or anything commercially sensitive, that removes the conversation about what leaves the building entirely.",
        ],
      },
      {
        t: "p",
        text: "The second point lands harder in Ireland and the UK than the paper's authors probably intended. Every AI conversation with a public sector client or a large contractor eventually reaches data residency, and the honest answer for a frontier-API architecture is complicated. For a locally hosted 7B model it is one sentence.",
      },
      { t: "h", text: "Where this stops" },
      {
        t: "p",
        text: "Singapore regulations only. Building codes are not transferable, and a model trained on Singaporean requirements tells you nothing about how it performs on Irish Technical Guidance Documents or UK Approved Documents. The training data is the moat and it does not travel.",
      },
      {
        t: "p",
        text: "More importantly, the metrics measure similarity to reference skeletons rather than whether the resulting checks are correct when run against a real model. That is a meaningful gap. Producing a well-structured rule and producing a rule that catches the right violations are different achievements, and only the first is measured here.",
      },
      {
        t: "note",
        text: "How to read this piece: I verified the title, authors, submission date and the two headline percentages directly against the arXiv abstract. The Mistral 7B base model and the Singapore dataset are not named in the abstract, so those come from the full text as summarised to me. The comparison against Claude Opus, Sonnet 4.5, GPT-5.2 and Qwen is confirmed in the abstract.",
      },
    ],
  },
];
