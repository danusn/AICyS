import { useState } from "react";

// ─── Color & Style Constants ─────────────────────────────────────────────────
const C = {
  bg: "#F8F6FF",
  white: "#FFFFFF",
  purple: "#5B21B6",
  purpleMid: "#7C3AED",
  purpleLight: "#A78BFA",
  purplePale: "#EDE9FE",
  purpleSoft: "#F5F3FF",
  rose: "#BE185D",
  rosePale: "#FDF2F8",
  teal: "#0F766E",
  tealPale: "#F0FDFA",
  gold: "#B45309",
  goldPale: "#FFFBEB",
  text: "#1E1B4B",
  textBody: "#374151",
  textMuted: "#6B7280",
  border: "#DDD6FE",
  shadow: "0 2px 16px rgba(91,33,182,0.08)",
  shadowHover: "0 6px 24px rgba(91,33,182,0.16)",
};

// ─── Navigation Tabs ──────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",    icon: "🏛️", label: "Overview"       },
  { id: "crisis",     icon: "📊", label: "The Crisis"     },
  { id: "ai",         icon: "🤖", label: "AI Imperative"  },
  { id: "usecases",   icon: "🔧", label: "Use Cases"      },
  { id: "scenarios",  icon: "🎯", label: "Scenarios"      },
  { id: "risks",      icon: "⚠️", label: "Risks & Ethics" },
  { id: "governance", icon: "🛡️", label: "Governance"     },
  { id: "future",     icon: "🔮", label: "Future"         },
  { id: "activities", icon: "🧪", label: "Activities"     },
  { id: "quiz",       icon: "📝", label: "Quiz"           },
  { id: "assessment", icon: "🎓", label: "Assessment"     },
];

// ─── Quiz Data ────────────────────────────────────────────────────────────────
const QUIZ = [
  {
    q: "As of 2025, how many cybersecurity roles globally remain unfilled?",
    opts: ["1.5 million", "2.9 million", "4.8 million", "6.4 million"],
    ans: 2,
    exp: "4.8 million unfilled roles globally (2025). This critical gap, paired with AI being the #1 skills need cited by 41% of professionals, makes AI-assisted education urgent."
  },
  {
    q: "What percentage of organizations experienced breaches in 2024?",
    opts: ["54%", "68%", "79%", "87%"],
    ans: 3,
    exp: "87% of organizations experienced breaches in 2024. Skills gaps cost organizations an average of $1.76 million more per breach, making workforce training a direct business priority."
  },
  {
    q: "Which statement best reflects AI's role in cybersecurity education?",
    opts: [
      "AI should replace faculty to maximize efficiency",
      "AI is a co-pilot that augments, not replaces, expert instruction",
      "AI is too risky for educational use in security domains",
      "AI works best only for advanced graduate-level coursework"
    ],
    ans: 1,
    exp: "The key framing is AI as co-pilot, not replacement. '3–5x faster concept mastery' is possible when AI augments human instruction—not when it substitutes it."
  },
  {
    q: "What are the three pillars of the Responsible Adoption Framework?",
    opts: [
      "Accuracy, Agility, Awareness",
      "Authority, Automation, Accountability",
      "Access, Accountability, Assurance",
      "Adoption, Analysis, Alignment"
    ],
    ans: 2,
    exp: "Access (equitable tool availability), Accountability (transparent authorship & use policies), and Assurance (validation, human-in-the-loop checks). Together they form a governance model before any AI deployment."
  },
  {
    q: "SENSAI is best described as:",
    opts: [
      "A threat intelligence feed for SOC teams",
      "An AI-powered tutoring system in ABET-accredited cybersecurity courses",
      "A red team simulation engine for advanced practitioners",
      "A government-mandated AI certification framework"
    ],
    ans: 1,
    exp: "SENSAI is a real-world example of AI tutoring deployed at scale in ABET-accredited cybersecurity programs, demonstrating applied AI pedagogy in practice."
  },
  {
    q: "Which risk is UNIQUELY amplified in cybersecurity AI education versus other disciplines?",
    opts: [
      "Students may use AI for homework help",
      "AI-generated content can include harmful or dual-use attack techniques",
      "AI tutors respond slowly during peak usage",
      "AI cannot explain complex mathematical proofs"
    ],
    ans: 1,
    exp: "Cybersecurity's dual-use nature means AI can generate offensive techniques when prompted—a risk category absent in, say, history or business courses. This makes governance and faculty oversight especially critical."
  },
  {
    q: "What percentage of cybersecurity leaders say they are willing to fund certifications for their teams?",
    opts: ["63%", "78%", "94%", "100%"],
    ans: 2,
    exp: "94% of leaders are willing to fund certifications, yet 43% rate AI/ML skills as low in their teams—a striking gap that education programs must urgently address."
  },
  {
    q: "According to the framework, faculty's role in an AI-enhanced curriculum evolves to:",
    opts: [
      "Content delivery and lecture preparation only",
      "Grading automation and administrative tasks",
      "Orchestrator, validator, and high-value mentor",
      "AI prompt engineer and chatbot supervisor"
    ],
    ans: 2,
    exp: "Faculty shift FROM knowledge delivery TO orchestrating learning experiences, validating AI outputs for accuracy, and providing mentorship that AI fundamentally cannot replicate—judgment, ethics, and professional identity."
  },
];

// ─── Activity Data ────────────────────────────────────────────────────────────
const ACTIVITIES = [
  {
    title: "Activity 1: Prompt Engineering for SOC Scenarios",
    badge: "🧪 Hands-On Lab",
    duration: "20 min",
    color: C.purplePale,
    accent: C.purple,
    objective: "Design effective AI prompts to generate educationally sound, faculty-validated SOC incident scenarios for student practice.",
    background: "AI tools can generate synthetic SIEM alerts, firewall logs, and multi-stage attack timelines for student training—but output quality depends entirely on prompt design. Poor prompts produce hallucinated CVEs and unrealistic scenarios; well-crafted prompts produce valuable teaching material.",
    steps: [
      "Choose an attack vector (e.g., spear-phishing → credential theft → lateral movement → data exfiltration)",
      "Draft an initial prompt requesting a SOC scenario with: attack timeline, 3 SIEM alerts with log snippets, 5 IOCs, and remediation steps",
      "Run the prompt and document any hallucinations, unrealistic elements, or dangerous dual-use content",
      "Iteratively refine your prompt using: experience level specification, explicit boundaries (no real CVEs), synthetic data labeling ([SYNTHETIC]), and structured output format",
      "Develop a 5-point faculty validation checklist before the scenario enters a classroom",
    ],
    samplePrompt: `You are a cybersecurity education assistant creating practice material for undergraduate students (6–12 months of experience). Generate a realistic SOC incident scenario with ALL of the following:

SCENARIO REQUIREMENTS:
• Attack vector: Spear-phishing email → credential theft → lateral movement
• Timeline: Multi-stage attack unfolding over 48 hours
• 3 SIEM alert examples with realistic (but fictional) log snippets
• 5 Indicators of Compromise — label all IPs/hashes as [SYNTHETIC]
• 2–3 key decision points where analysts must choose next steps

EDUCATIONAL REQUIREMENTS:
• Map each stage to a MITRE ATT&CK tactic
• Include one red herring (a false positive students must recognize)
• Provide a "Learning Check" question at each stage

HARD CONSTRAINTS:
• Do NOT cite real CVEs or real company names
• Do NOT include functional exploit code
• Mark all generated data clearly as [SYNTHETIC TRAINING DATA]`,
    discussion: [
      "Which prompt elements most improved educational quality? Why?",
      "How did you identify AI-generated inaccuracies in the first draft?",
      "What 3 validation steps are non-negotiable before student use?",
      "How might geographic bias in AI training data affect scenario realism?",
    ],
    solution: "Strong prompts specify: student experience level, structured output format, explicit dual-use constraints, and synthetic data labeling. Faculty must verify: MITRE ATT&CK mapping accuracy, IOC plausibility, absence of real CVEs, and whether any generated technique is too detailed to be instructional vs. operational. The validation checklist should include at minimum: domain expert review, threat landscape currency check, and dual-use assessment.",
  },
  {
    title: "Activity 2: Ethical Fault Line Analysis",
    badge: "💬 Case Study",
    duration: "25 min",
    color: C.rosePale,
    accent: C.rose,
    objective: "Map real-world AI deployment decisions to the 5 ethical risk categories and draft institutional governance responses.",
    background: "A community college cybersecurity department is considering a rapid AI deployment to address budget shortfalls and growing enrollment. Review their proposal critically.",
    scenario: `CASE: Westfield Community College — Cybersecurity A.S. Program (340 students)

The department chair proposes the following to the college board:
① Deploy a GPT-4 tutoring system as the primary instruction mode for foundational courses
② Use AI to auto-grade 70% of lab assignments without faculty review
③ Eliminate two adjunct faculty positions to fund the AI subscription ($18K/yr savings)
④ Feed student interaction logs into the AI system to "continuously improve" responses
⑤ Allow students to use any AI tool freely during open-book midterm assessments`,
    tasks: [
      "Map EACH proposal element (①–⑤) to one or more of the 5 ethical risk categories: Academic Integrity · Accuracy & Hallucination · Security & Misuse · Bias & Fairness · Privacy & Governance",
      "Rate each element HIGH / MEDIUM / LOW risk and justify your rating",
      "Draft 3 specific governance policies the college must implement before deployment",
      "Propose 2 assessment redesigns that maintain integrity in an AI-enabled environment",
      "Identify 2 equity implications for students at an underfunded community college",
    ],
    solution: `RISK MAPPING: ① Accuracy & Hallucination (HIGH) — GPT-4 as primary instruction risks unchecked errors entering student mental models. ② Academic Integrity + Accuracy (HIGH) — auto-grading without faculty review combines integrity risk with hallucination risk in high-stakes feedback. ③ Bias & Fairness (HIGH) — eliminating human diversity in instruction while assuming AI fills the pedagogical gap is structurally inequitable. ④ Privacy & Governance (HIGH) — student interaction logs are FERPA-protected data; feeding them into AI systems requires explicit consent and data processing agreements. ⑤ Academic Integrity (HIGH) — open-book AI use on assessments without boundaries makes competency verification impossible.

GOVERNANCE POLICIES: (1) Human-in-the-loop requirement: faculty must review ALL AI-generated feedback before student exposure on graded work. (2) Data governance policy: student interaction data may not be used for AI training without opt-in consent and IRB review. (3) Approved tools policy: define explicitly which AI tools are permitted, in which contexts, with what disclosure requirements.

ASSESSMENT REDESIGNS: Live lab demonstrations of firewall configuration (AI cannot perform hands-on tasks), oral defense of incident response decisions (tests reasoning, not just output).

EQUITY: Students without reliable home internet cannot use 24/7 AI tutoring equally; students from non-English-speaking backgrounds may receive lower-quality responses from English-biased models.`,
  },
  {
    title: "Activity 3: Institutional Readiness Scorecard",
    badge: "📋 Framework Application",
    duration: "15 min",
    color: C.tealPale,
    accent: C.teal,
    objective: "Apply the Access + Accountability + Assurance framework to audit AI readiness at your institution before deployment.",
    background: "Most institutions attempt AI deployment before establishing governance. This activity uses the three-pillar framework to surface specific gaps early—when they're easy to address rather than crisis points.",
    rubricItems: {
      "🔓 Access": [
        "AI tools are equally available to all students regardless of device or internet connectivity",
        "An approved tools list exists for both faculty and students",
        "Accommodations exist for students with disabilities in AI-assisted workflows",
        "Free or institutional-license tools are identified for students without personal accounts",
      ],
      "📋 Accountability": [
        "A clear AI use disclosure policy exists in every relevant course syllabus",
        "Authorship norms are explicitly defined for AI-assisted student work",
        "A consequence framework for misuse violations is documented and communicated",
        "Faculty disclose their own use of AI in content creation to students",
      ],
      "✅ Assurance": [
        "A faculty validation protocol exists for all AI-generated course content",
        "AI outputs are reviewed by domain experts before student exposure",
        "A regular auditing process evaluates AI system accuracy over time",
        "A mechanism exists for students to report AI errors without grade penalty",
      ],
    },
    deliverable: "Score 0–2 per criterion (0 = Not in place, 1 = Partially, 2 = Fully implemented). Sum each pillar (max 8 per pillar, 24 total). Identify your top 3 priority improvements based on lowest-scoring items.",
    solution: "Score interpretation: 0–8 = Early Stage (prioritize basic policies and equitable access before any deployment). 9–16 = Developing (focus on assurance mechanisms—validation protocols are most commonly missing). 17–24 = Mature (document your model and share with WiCyS chapter networks!). Most institutions score 5–10 on first honest assessment. The framework's value is surfacing specific gaps, not achieving perfection—use the lowest-scoring items as your implementation roadmap.",
  },
];

// ─── Assessment Data ──────────────────────────────────────────────────────────
const ASSESSMENT = [
  {
    num: "01",
    title: "The Human-in-the-Loop Imperative",
    type: "Short Essay · 300–400 words",
    color: C.purplePale,
    accent: C.purple,
    prompt: `A cybersecurity program director argues: "AI tutors are available 24/7, never get tired, never hold biases, and respond with perfect consistency—so they're objectively better than human instructors for foundational content delivery."

Critically evaluate this claim. Address:
(a) What legitimate advantages does the director identify?
(b) What critical risks specific to cybersecurity education does this view overlook?
(c) What is the appropriate role of human faculty in an AI-enhanced program, and why cannot this role be automated?`,
    rubric: [
      "[20 pts] Acknowledges AI's legitimate advantages with accurate statistics from course material",
      "[25 pts] Identifies accuracy/hallucination risks with cybersecurity-domain-specific examples",
      "[20 pts] Addresses dual-use risks uniquely present in security education",
      "[20 pts] Articulates faculty's evolved role as orchestrator, validator, and mentor with specific examples",
      "[15 pts] Grounds position in evidence from course material (statistics, frameworks, examples)",
    ],
    answer: `The director correctly identifies three legitimate advantages. First, scalability: AI's 24/7 availability directly addresses the reality that 25% of organizations lack time and resources for adequate staff training. Second, consistency: AI eliminates the variance inherent in multi-instructor programs. Third, personalization: AI tutors explain foundational concepts in multiple modalities until mastery is achieved—addressing the 59% of teams facing critical skills needs without proportionally scaling faculty costs.

However, the claim contains three critical omissions specific to cybersecurity. First, accuracy is domain-dependent. Cybersecurity AI hallucinations are not harmless—fabricated CVEs, non-existent exploits, and incorrect remediation steps produce practitioners with dangerous misconceptions. Unlike a student mislearning a historical date, a practitioner who confidently applies AI-generated-but-incorrect incident response procedures can cause significant organizational harm. Second, cybersecurity's dual-use nature means AI systems can generate functional offensive techniques when prompted inappropriately—a risk absent in virtually every other educational domain. Without expert faculty oversight, AI tutoring systems become potential vectors for misuse education. Third, "no biases" is empirically false: AI training data reflects historical inequities that may systematically produce lower-quality explanations for students from underrepresented groups—a particularly acute concern for WiCyS's mission.

Human faculty's appropriate role evolves from content delivery to three irreplaceable functions: orchestrating learning experiences that AI cannot design (knowing which scenarios develop which competencies and in what sequence), validating AI-generated content for accuracy and safety before student exposure, and providing the professional mentorship—judgment, ethics, professional identity—that transforms technical knowledge into practitioner competence. The 80% of professionals who find AI effective work within human-supervised frameworks. The competitive advantage belongs not to institutions that adopt AI fastest, but to those that combine AI's efficiency with the irreplaceable depth of human expertise.`,
  },
  {
    num: "02",
    title: "WiCyS Chapter AI Integration Plan",
    type: "Applied Design · Structured Response",
    color: C.rosePale,
    accent: C.rose,
    prompt: `Your WiCyS student chapter (45 members, diverse institutional affiliations, varying income levels) wants to use AI tools to help members prepare for the CompTIA Security+ certification exam.

Design a responsible AI integration plan using the Access + Accountability + Assurance framework. For each pillar, provide: (a) at least 2 specific, actionable strategies and (b) one equity consideration specific to WiCyS's diverse membership. Include tool recommendations and a policy governing AI use during chapter mock exams.`,
    rubric: [
      "[25 pts] ACCESS: identifies free/low-cost tools, device access solutions, accommodation strategies",
      "[25 pts] ACCOUNTABILITY: drafts specific use policies with clear boundaries and disclosure requirements",
      "[25 pts] ASSURANCE: describes validation process with named responsible parties",
      "[15 pts] Equity analysis addresses WiCyS's diverse membership (income, institution, language)",
      "[10 pts] Plan is concretely implementable by a student volunteer chapter",
    ],
    answer: `ACCESS STRATEGIES: (1) Use free-tier tools (Claude.ai, ChatGPT free, Google Gemini) exclusively to ensure all members participate regardless of institutional license availability. Create a curated chapter Google Drive with AI-generated and advisor-reviewed practice question banks. (2) Partner with one local community college or public library for weekly in-person AI study sessions for members without reliable home internet. Equity consideration: Members from lower-resource institutions may lack digital literacy with AI tools—offer a 1-hour "AI for Cert Prep" orientation before deploying any study resources.

ACCOUNTABILITY STRATEGIES: (1) Chapter policy: all AI-generated practice questions labeled [AI-ASSISTED · Not for Official Study Without Verification]. Members document which Security+ domains they relied on AI for in a personal study log—building metacognitive awareness. (2) Mock exam policy: AI tools are completely prohibited during chapter mock exams to simulate real test conditions and ensure authentic competency measurement. After exams, AI may be used to review incorrect answers. Equity consideration: Non-native English speakers may receive lower-quality AI explanations in English; designate bilingual study partners for Spanish, Mandarin, and Hindi speakers based on chapter demographics.

ASSURANCE STRATEGIES: (1) All AI-generated practice questions reviewed by a chapter member who is Security+ certified (or a faculty advisor) before sharing with the full chapter. Maintain a shared error log when AI provides incorrect information—this builds critical AI evaluation skills alongside cert prep. (2) Monthly 30-minute "AI Accuracy Check" sessions where members collectively evaluate AI explanations of 3 recent Security+ exam topics against CompTIA official study materials. Equity consideration: Validation responsibilities should rotate among members, not fall permanently to the same volunteers, to distribute learning and prevent burnout.`,
  },
  {
    num: "03",
    title: "Personal Reflection: Human-AI Learning Partnership",
    type: "Reflection · 200–250 words",
    color: C.goldPale,
    accent: C.gold,
    prompt: `Reflect on your own learning journey in cybersecurity (or a closely related technical field). Identify:

(a) ONE specific concept or skill where AI assistance would have been most valuable to you as a learner—and explain precisely why
(b) ONE area where human mentorship was irreplaceable—and what specifically the human provided that AI cannot
(c) What does this personal reflection reveal about optimal curriculum design for cybersecurity programs?`,
    rubric: [
      "[30 pts] Genuine personal reflection with specific, concrete examples (not generic observations)",
      "[35 pts] Demonstrates nuanced understanding of AI capabilities AND limitations",
      "[35 pts] Draws meaningful, specific implications for curriculum design",
    ],
    answer: `SAMPLE RESPONSE (personal answers will vary significantly—this models the depth expected):

When learning cryptographic protocol analysis, I repeatedly misunderstood why specific padding schemes existed—textbooks explained the 'what' but not the 'why,' and office hours were infrequent. An AI tutor capable of generating five different analogies (from postal systems to locked boxes to mathematical proofs) and immediately diagnosing which mental model I was using incorrectly would have halved my confusion period. The immediate, patient, multi-modal explanation loop is precisely where AI's value is clearest—and where human instructors are often unavailable.

However, during my first real penetration testing engagement, my supervisor's judgment about which findings to escalate immediately versus document in the report—calibrated to the client's risk tolerance, their organizational culture, and the legal context—was something no AI could have provided. She read the room in ways that required years of professional experience and emotional intelligence. That interaction taught me that cybersecurity is fundamentally a human practice embedded in human organizations.

This reflection suggests curriculum should follow a clear sequence: use AI for deliberate practice in the 'mechanical mastery' phase (syntax, concept drilling, scenario exposure at scale), transition to human mentorship for the 'professional judgment' phase (contextual decision-making, ethics, client communication). Conflating these phases—expecting AI to develop professional judgment or humans to outcompete AI on patient, repetitive explanation—is where curriculum design fails.`,
  },
];

// ─── Shared UI Components ─────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.white, borderRadius: 16, padding: "1.5rem",
    boxShadow: C.shadow, border: `1px solid ${C.border}`, ...style
  }}>
    {children}
  </div>
);

const Badge = ({ children, color = C.purple, bg = C.purplePale }) => (
  <span style={{
    background: bg, color, borderRadius: 20, padding: "3px 12px",
    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em"
  }}>
    {children}
  </span>
);

const StatCard = ({ value, label, color = C.purple }) => (
  <div style={{
    background: C.white, borderRadius: 14, padding: "1.25rem 1rem",
    textAlign: "center", boxShadow: C.shadow, border: `2px solid ${color}20`
  }}>
    <div style={{ fontSize: "2.25rem", fontWeight: 800, color, fontFamily: "Georgia, serif" }}>{value}</div>
    <div style={{ fontSize: "0.82rem", color: C.textBody, marginTop: 4, lineHeight: 1.4 }}>{label}</div>
  </div>
);

const SectionHeader = ({ icon, title, subtitle }) => (
  <div style={{ marginBottom: "2rem" }}>
    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{icon}</div>
    <h2 style={{ fontSize: "1.9rem", fontWeight: 800, color: C.text, fontFamily: "Georgia, serif", margin: 0 }}>{title}</h2>
    {subtitle && <p style={{ color: C.textMuted, marginTop: 8, fontSize: "1.05rem" }}>{subtitle}</p>}
    <div style={{ width: 60, height: 4, background: C.purpleLight, borderRadius: 4, marginTop: 12 }} />
  </div>
);

// ─── Section: Overview ────────────────────────────────────────────────────────
const OverviewSection = () => (
  <div>
    <div style={{
      background: `linear-gradient(135deg, ${C.purple} 0%, #9333EA 100%)`,
      borderRadius: 20, padding: "2.5rem", marginBottom: "2rem",
      display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap"
    }}>
      <div style={{ flex: "1 1 300px" }}>
        <div style={{ color: "#D4B8FF", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
          WICYS 2026 · ACADEMIC CONFERENCE TUTORIAL
        </div>
        <h1 style={{ color: C.white, fontSize: "1.9rem", fontWeight: 800, margin: "0 0 0.75rem", fontFamily: "Georgia, serif", lineHeight: 1.25 }}>
          AI in Cybersecurity Education
        </h1>
        <p style={{ color: "#E9D5FF", fontSize: "1.05rem", margin: "0 0 1.25rem", lineHeight: 1.6 }}>
          Opportunities, Ethics, and the Future of Learning
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {["60–90 Minutes", "Faculty & Trainers", "March 2026"].map(t => (
            <span key={t} style={{ background: "rgba(255,255,255,0.15)", color: C.white, borderRadius: 20, padding: "4px 14px", fontSize: "0.8rem" }}>{t}</span>
          ))}
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
        alt="Women in cybersecurity"
        style={{ width: 200, height: 160, objectFit: "cover", borderRadius: 14, border: "3px solid rgba(255,255,255,0.3)" }}
        onError={e => { e.target.style.display = "none"; }}
      />
    </div>

    <h3 style={{ color: C.text, fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>📋 What We'll Cover Today</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
      {[
        { n: "01", title: "The Cybersecurity Education Crisis", desc: "Three converging pressures reshaping how we prepare defenders", color: C.purple },
        { n: "02", title: "AI as Strategic Inflection Point", desc: "Four pillars transforming cybersecurity pedagogy", color: "#7C3AED" },
        { n: "03", title: "High-Value Use Cases", desc: "From classroom instruction to cyber range simulations", color: C.rose },
        { n: "04", title: "Practical Scenarios", desc: "Three real-world demos with problem-solution analysis", color: "#0F766E" },
        { n: "05", title: "Risks & Ethical Fault Lines", desc: "Five critical concerns requiring institutional attention", color: "#B45309" },
        { n: "06", title: "Responsible Adoption Framework", desc: "Access + Accountability + Assurance model", color: "#065F46" },
        { n: "07", title: "The Future of Learning", desc: "From memorization to judgment and verification", color: "#1D4ED8" },
        { n: "08", title: "Institutional Recommendations", desc: "Six actionable strategies for future-ready programs", color: "#9D174D" },
      ].map(item => (
        <Card key={item.n} style={{ borderLeft: `4px solid ${item.color}`, padding: "1.25rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 800, color: item.color, letterSpacing: "0.1em", marginBottom: 4 }}>MODULE {item.n}</div>
          <div style={{ fontWeight: 700, color: C.text, fontSize: "0.95rem", marginBottom: 4 }}>{item.title}</div>
          <div style={{ fontSize: "0.82rem", color: C.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
        </Card>
      ))}
    </div>

    <Card style={{ background: C.purpleSoft, border: `1px solid ${C.border}` }}>
      <h4 style={{ color: C.purple, margin: "0 0 0.75rem", fontWeight: 700 }}>🔑 Key Statistics Driving This Talk</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
        <StatCard value="4.8M" label="Unfilled global cybersecurity roles (2025)" color={C.purple} />
        <StatCard value="87%" label="Orgs that experienced breaches in 2024" color={C.rose} />
        <StatCard value="41%" label="Professionals citing AI as top skills need" color={C.teal} />
        <StatCard value="$1.76M" label="Extra breach cost from skills gaps" color={C.gold} />
      </div>
    </Card>
  </div>
);

// ─── Section: Crisis ──────────────────────────────────────────────────────────
const CrisisSection = () => (
  <div>
    <SectionHeader icon="📊" title="The Cybersecurity Education Crisis" subtitle="Three converging pressures reshaping how we prepare defenders" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
      {[
        {
          n: "1", icon: "🦠", title: "Evolving Threat Landscape", color: C.rose, bg: C.rosePale,
          body: "74% of security professionals call the current threat landscape the most challenging in five years. Attackers leverage AI for polymorphic malware, deepfake phishing, and automated lateral movement.",
          impact: "Curriculum cannot adapt as fast as threats evolve",
          example: "Example: An AI-generated phishing email trained on a target's LinkedIn posts, Slack messages, and email style can defeat even security-aware employees—a threat that didn't exist at scale three years ago.",
        },
        {
          n: "2", icon: "👥", title: "Critical Skills Gap", color: C.purple, bg: C.purplePale,
          body: "4.8 million unfilled roles globally with 87% of organizations experiencing breaches. Skills shortages now eclipse headcount as the primary concern, with 59% citing critical or significant skills needs.",
          impact: "Traditional training models cannot scale to meet demand",
          example: "Example: A mid-sized hospital's security team of 4 analysts is expected to monitor 50,000 endpoints, investigate alerts, train staff, and maintain compliance—with no budget for 2 more hires.",
        },
        {
          n: "3", icon: "⚡", title: "Scalable Training Imperative", color: C.teal, bg: C.tealPale,
          body: "Organizations with skills gaps face breach costs averaging $1.76M more per incident. Yet 25% lack time/resources to train staff, and 31% of teams have zero entry-level professionals.",
          impact: "Need for hands-on, personalized, scalable training",
          example: "Example: A national guard cybersecurity unit needs to bring 200 reservists from Security+ level to incident response proficiency in 6 weeks—a timeline no traditional classroom model can achieve.",
        },
      ].map(p => (
        <Card key={p.n} style={{ borderTop: `4px solid ${p.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.75rem" }}>{p.icon}</span>
            <div>
              <Badge color={p.color} bg={p.bg}>Pressure {p.n}</Badge>
              <div style={{ fontWeight: 700, color: C.text, marginTop: 4, fontSize: "1.05rem" }}>{p.title}</div>
            </div>
          </div>
          <p style={{ color: C.textBody, fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "0.75rem" }}>{p.body}</p>
          <div style={{ background: p.bg, borderRadius: 10, padding: "0.75rem", marginBottom: "0.75rem" }}>
            <strong style={{ color: p.color, fontSize: "0.82rem" }}>💡 Detailed Example</strong>
            <p style={{ color: C.textBody, fontSize: "0.85rem", margin: "4px 0 0", lineHeight: 1.55 }}>{p.example}</p>
          </div>
          <div style={{ fontSize: "0.82rem", color: C.textMuted, fontStyle: "italic" }}>📌 {p.impact}</div>
        </Card>
      ))}
    </div>
    <Card style={{ background: C.purpleSoft }}>
      <strong style={{ color: C.purple }}>🤔 The Critical Question:</strong>
      <p style={{ color: C.text, margin: "8px 0 0", fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.6 }}>
        "How do we prepare defenders when threats evolve faster than our ability to train them? Traditional education models are reaching their limits."
      </p>
    </Card>
  </div>
);

// ─── Section: AI Imperative ───────────────────────────────────────────────────
const AISection = () => (
  <div>
    <SectionHeader icon="🤖" title="AI as Strategic Inflection Point" subtitle="Four pillars transforming how cybersecurity is taught and learned" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
      {[
        {
          icon: "📝", title: "Content Generation", subtitle: "Scale & Speed",
          color: C.purple, bg: C.purplePale,
          desc: "AI produces lecture materials, case studies, quizzes, and assessments at unprecedented scale. Faculty generate multiple differentiated assignment versions in minutes, not hours.",
          items: ["Lecture materials & slide decks", "Multiple assessment variants", "Scenario-based case studies", "Differentiated instruction content"],
          example: "A professor creates 5 variations of a network forensics lab—each with different attack patterns—so student groups cannot simply share answers. AI generates each variant in under 3 minutes."
        },
        {
          icon: "🎓", title: "Adaptive Tutoring", subtitle: "Personalization",
          color: C.rose, bg: C.rosePale,
          desc: "Personalized learning paths adjust to individual knowledge gaps and learning styles. AI tutors explain complex concepts in multiple modalities until the student achieves mastery.",
          items: ["Individual knowledge gap detection", "Multiple explanation modalities", "Real-time difficulty adjustment", "Socratic questioning capability"],
          example: "A student struggling with TCP three-way handshake receives an analogy explanation, then a diagram walkthrough, then a Wireshark packet trace—each generated on the fly until the concept clicks."
        },
        {
          icon: "🔬", title: "Simulation & Labs", subtitle: "Realism & Safety",
          color: C.teal, bg: C.tealPale,
          desc: "AI-powered cyber ranges generate realistic threat scenarios including polymorphic malware, deepfake phishing, and AI-assisted lateral movement—all in contained, safe environments.",
          items: ["SOC workflow simulations", "Red team / blue team exercises", "Synthetic malware samples", "Realistic network topologies"],
          example: "Cloud Range's AI generates a new ransomware variant each session—different encryption algorithm, different C2 pattern, different initial access vector—so students cannot memorize a single playbook."
        },
        {
          icon: "📊", title: "Assessment Automation", subtitle: "Feedback & Tracking",
          color: C.gold, bg: C.goldPale,
          desc: "Real-time feedback on labs, skills diagnostics, and progression mapping enable continuous competency tracking. Automated formative feedback accelerates learning cycles.",
          items: ["Automated formative feedback", "Skills progression mapping", "Rubric-assisted grading", "Competency gap identification"],
          example: "Students receive detailed feedback on their firewall rule configuration within 30 seconds of submission—including which rules conflict, which ports are unnecessarily exposed, and a priority-ordered fix list."
        },
      ].map(p => (
        <Card key={p.title} style={{ borderLeft: `4px solid ${p.color}` }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{p.icon}</div>
          <Badge color={p.color} bg={p.bg}>{p.subtitle}</Badge>
          <h3 style={{ color: C.text, margin: "8px 0 0.5rem", fontSize: "1.1rem", fontWeight: 700 }}>{p.title}</h3>
          <p style={{ color: C.textBody, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{p.desc}</p>
          <ul style={{ margin: "0 0 0.75rem", paddingLeft: "1.25rem" }}>
            {p.items.map(i => <li key={i} style={{ fontSize: "0.82rem", color: C.textBody, marginBottom: 3 }}>{i}</li>)}
          </ul>
          <div style={{ background: p.bg, borderRadius: 10, padding: "0.75rem" }}>
            <strong style={{ color: p.color, fontSize: "0.78rem" }}>💡 CLASSROOM EXAMPLE</strong>
            <p style={{ color: C.textBody, fontSize: "0.82rem", margin: "4px 0 0", lineHeight: 1.5 }}>{p.example}</p>
          </div>
        </Card>
      ))}
    </div>
    <Card style={{ background: "#F5F3FF", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
      <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=300&q=80"
        alt="AI visualization" style={{ width: 180, height: 130, objectFit: "cover", borderRadius: 12 }}
        onError={e => { e.target.style.display = "none"; }} />
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ color: C.purple, margin: "0 0 0.5rem", fontWeight: 700 }}>⚖️ The Framing Question</h4>
        <p style={{ color: C.textBody, fontSize: "0.95rem", lineHeight: 1.65, margin: 0 }}>
          <em>"Can AI improve cybersecurity education without weakening critical thinking, ethics, and trust? The answer depends not on the technology itself, but on how we implement it."</em>
        </p>
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div><span style={{ fontWeight: 800, color: C.purple, fontSize: "1.4rem" }}>10:1</span><br /><span style={{ fontSize: "0.78rem", color: C.textMuted }}>Student-faculty ratio improvement potential</span></div>
          <div><span style={{ fontWeight: 800, color: C.rose, fontSize: "1.4rem" }}>24/7</span><br /><span style={{ fontSize: "0.78rem", color: C.textMuted }}>AI tutoring availability</span></div>
          <div><span style={{ fontWeight: 800, color: C.teal, fontSize: "1.4rem" }}>3–5×</span><br /><span style={{ fontSize: "0.78rem", color: C.textMuted }}>Faster concept mastery reported</span></div>
        </div>
      </div>
    </Card>
  </div>
);

// ─── Section: Use Cases ───────────────────────────────────────────────────────
const UseCasesSection = () => (
  <div>
    <SectionHeader icon="🔧" title="High-Value Use Cases" subtitle="From classroom instruction to cyber range simulations—a complete taxonomy" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
      {[
        {
          label: "A. Teaching Support", color: C.purple, bg: C.purplePale,
          items: [
            { icon: "📄", name: "Content Generation", desc: "AI drafts lecture materials, quizzes, case studies, and rubrics. Faculty curate and validate." },
            { icon: "🔍", name: "Concept Simplification", desc: "Complex topics (cryptography, network defense, secure coding) explained at multiple levels." },
            { icon: "🌈", name: "Differentiated Instruction", desc: "Multiple assignment versions for diverse learners—different attack vectors, same learning objectives." },
          ]
        },
        {
          label: "B. Student Learning Support", color: C.rose, bg: C.rosePale,
          items: [
            { icon: "🤖", name: "AI Tutors", desc: "SENSAI and similar systems explain foundational topics with personalized, patient, multi-modal responses." },
            { icon: "🐛", name: "Debugging Support", desc: "Guided assistance on secure programming exercises with hints, not answers—preserving learning." },
            { icon: "🚩", name: "CTF Walkthroughs", desc: "Step-by-step guidance on capture-the-flag tasks calibrated to student experience level." },
          ]
        },
        {
          label: "C. Practical Training", color: C.teal, bg: C.tealPale,
          items: [
            { icon: "🖥️", name: "SOC Simulations", desc: "Cloud Range-style AI scenarios: realistic phishing campaigns, incident response drills, workflow exercises." },
            { icon: "📁", name: "Synthetic Datasets", desc: "AI-generated network logs, malware samples, and forensic images where real data is too sensitive to use." },
            { icon: "⚔️", name: "Red/Blue Team Scenarios", desc: "AI generates attack playbooks for red team while supporting blue team analysis and detection logic." },
          ]
        },
        {
          label: "D. Assessment & Feedback", color: C.gold, bg: C.goldPale,
          items: [
            { icon: "⚡", name: "Automated Formative Feedback", desc: "Real-time guidance on labs—not grades, but learning signals—that accelerate iteration cycles." },
            { icon: "🗺️", name: "Skills Diagnostics", desc: "Competency mapping identifies which NICE Framework categories each student needs to strengthen." },
            { icon: "📝", name: "Rubric-Assisted Grading", desc: "AI provides consistent first-pass evaluation of lab reports; faculty review edge cases and final scores." },
          ]
        },
      ].map(cat => (
        <Card key={cat.label}>
          <div style={{ background: cat.bg, borderRadius: 10, padding: "0.6rem 1rem", marginBottom: "1rem", display: "inline-block" }}>
            <strong style={{ color: cat.color, fontSize: "0.9rem" }}>{cat.label}</strong>
          </div>
          {cat.items.map(item => (
            <div key={item.name} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem" }}>
              <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: C.text, fontSize: "0.9rem" }}>{item.name}</div>
                <div style={{ color: C.textBody, fontSize: "0.82rem", lineHeight: 1.5, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  </div>
);

// ─── Section: Scenarios ───────────────────────────────────────────────────────
const ScenariosSection = () => (
  <div>
    <SectionHeader icon="🎯" title="Three Practical Scenarios" subtitle="Real-world applications with problem-solution-risk analysis for each" />
    {[
      {
        n: "01", icon: "🖥️", title: "AI-Generated SOC Incident Scenario",
        color: C.purple, bg: C.purplePale,
        problem: "Students need realistic incident response practice with authentic SIEM alerts, firewall logs, and malware behavior analysis—but real incidents involve sensitive data and legal risk.",
        approach: "Generate synthetic multi-stage attack scenarios with realistic logs, network traffic patterns, and IOCs. AI creates unlimited unique variants so students cannot share answers between cohorts.",
        gain: "Hands-on analysis without production risk; exposure to diverse attack vectors (ransomware, APT, insider threat); repeatable practice scenarios at any difficulty level; MITRE ATT&CK-aligned objectives.",
        risk: "Scenarios may miss real-world complexity; AI-generated IOCs may not match actual attacker behavior; requires faculty validation before classroom use; AI may hallucinate CVE numbers.",
        example: `SAMPLE AI PROMPT RESULT:
Stage 1 (Hour 0): Phishing email to HR (spoofed IT domain)
[SYNTHETIC] SIEM Alert: Failed login × 12 from 192.168.1.47 → LDAP server
Stage 2 (Hour 6): Credential reuse on VPN
[SYNTHETIC] Firewall log: Allow 10.0.2.15:4444 → External IP [SYNTHETIC]
Stage 3 (Hour 24): Lateral movement to finance server
IOC: Unusual NTDS.dit access at 3:17 AM
Student Decision Point: Isolate or monitor? Justify with threat model.`
      },
      {
        n: "02", icon: "🔥", title: "AI Tutor for Firewall Misconfiguration",
        color: C.rose, bg: C.rosePale,
        problem: "Students struggle with complex firewall rule syntax (iptables, pf, Windows Defender), chain order, and troubleshooting network connectivity issues. Office hours cannot serve 80 students simultaneously.",
        approach: "Interactive debugging with step-by-step guidance, rule explanation, and suggestions for common misconfigurations. AI never gives the answer directly—uses Socratic questioning to preserve learning.",
        gain: "Faster skill acquisition; reduced frustration from waiting for office hours; immediate feedback loop with 24/7 availability; personalized pacing for each student regardless of prior experience.",
        risk: "Over-reliance may inhibit independent problem-solving; students may bypass learning by asking AI for direct solutions; requires graduated release design (AI scaffolding decreases over the semester).",
        example: `STUDENT: My iptables rule isn't blocking port 80 traffic.
AI TUTOR: Let's work through this. Can you share your current rules? 
Also: which chain are you adding the rule to—INPUT, OUTPUT, or FORWARD?

STUDENT: INPUT chain. Here's the rule: -A INPUT -p tcp --dport 80 -j REJECT

AI TUTOR: Good start! I see a potential ordering issue. In iptables, rules 
are evaluated top-to-bottom. Is there an ACCEPT rule for port 80 earlier 
in your chain? If so, packets match that rule first and never reach your 
REJECT. Run iptables -L INPUT -n --line-numbers and check the order.`
      },
      {
        n: "03", icon: "🔍", title: "AI-Assisted Secure Code Review",
        color: C.teal, bg: C.tealPale,
        problem: "Large classes (60+ students) limit faculty capacity for detailed code review. Manual review takes 15 minutes per student; with 70 students submitting weekly, this is 17+ hours of grading per assignment.",
        approach: "Automated secure coding analysis detecting common vulnerability classes (SQLi, XSS, buffer overflow, hardcoded credentials) with explanations. Faculty review flagged items and handle complex cases.",
        gain: "Consistent, timely feedback at scale; immediate vulnerability identification with CWE references; frees faculty for higher-value mentoring on architecture and design decisions rather than syntax errors.",
        risk: "False positives/negatives require human verification; AI may miss context-specific vulnerabilities (logic flaws, business rule violations); tool limitations must be explicitly taught to students.",
        example: `STUDENT CODE (Python Flask):
def login(username, password):
    query = "SELECT * FROM users WHERE name='" + username + "'"
    
AI REVIEW RESULT:
⚠️ CWE-89: SQL Injection (HIGH SEVERITY)
Line 2: String concatenation in SQL query allows injection.
Attacker input: admin' OR '1'='1 would bypass authentication.

FIX: Use parameterized queries:
query = "SELECT * FROM users WHERE name = ?"
cursor.execute(query, (username,))

EDUCATIONAL NOTE: This is the #1 web vulnerability in OWASP Top 10.
Faculty follow-up: Why does parameterization work at the DB driver level?`
      },
    ].map(s => (
      <Card key={s.n} style={{ marginBottom: "1.25rem", borderLeft: `5px solid ${s.color}` }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ background: s.bg, borderRadius: 12, padding: "0.75rem 1rem", minWidth: 60, textAlign: "center" }}>
            <div style={{ fontSize: "1.75rem" }}>{s.icon}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, color: s.color }}>SCENARIO {s.n}</div>
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3 style={{ color: C.text, margin: "0 0 1rem", fontSize: "1.15rem", fontWeight: 700 }}>{s.title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
              {[
                { label: "❓ Problem", text: s.problem, color: "#6B7280" },
                { label: "💡 AI Approach", text: s.approach, color: s.color },
                { label: "✅ Educational Gain", text: s.gain, color: C.teal },
                { label: "⚠️ Risk/Caveat", text: s.risk, color: C.rose },
              ].map(item => (
                <div key={item.label} style={{ background: "#F9F9FC", borderRadius: 10, padding: "0.75rem" }}>
                  <div style={{ fontWeight: 700, color: item.color, fontSize: "0.82rem", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: "0.82rem", color: C.textBody, lineHeight: 1.5 }}>{item.text}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0F172A", borderRadius: 12, padding: "1rem", fontFamily: "monospace", fontSize: "0.78rem", color: "#A5F3FC", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {s.example}
            </div>
          </div>
        </div>
      </Card>
    ))}
    <Card style={{ background: C.purpleSoft }}>
      <strong style={{ color: C.purple }}>🔑 Common Pattern Across All Three Scenarios:</strong>
      <p style={{ color: C.textBody, margin: "8px 0 0", lineHeight: 1.6 }}>
        Each scenario demonstrates AI's value as a <strong>force multiplier</strong> while highlighting the critical need for <strong>human oversight, validation, and pedagogical judgment</strong>. The operating model matters more than the tool itself.
      </p>
    </Card>
  </div>
);

// ─── Section: Risks ───────────────────────────────────────────────────────────
const RisksSection = () => (
  <div>
    <SectionHeader icon="⚠️" title="Risks & Ethical Fault Lines" subtitle="Five critical concern categories requiring institutional attention before AI deployment" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
      {[
        {
          label: "A. Academic Integrity", icon: "📜", color: C.purple, bg: C.purplePale,
          risks: [
            { name: "Overreliance on AI", desc: "Students submit AI-generated work as their own without understanding underlying concepts—producing credential inflation where certified practitioners lack real skills." },
            { name: "Reduced Problem-Solving", desc: "When AI handles all debugging, students never develop the independent analytical persistence that makes practitioners effective under pressure." },
            { name: "Competence Verification Gap", desc: "It becomes nearly impossible to distinguish authentic student competence from AI-assisted performance—undermining the value of certification and degrees." },
          ],
          mitigation: "Design assessments AI cannot perform: live oral defense, real-time lab demonstrations, process-based evaluation documenting decision-making, not just output."
        },
        {
          label: "B. Accuracy & Hallucination", icon: "🎭", color: C.rose, bg: C.rosePale,
          risks: [
            { name: "Incorrect Explanations", desc: "AI providing technically inaccurate security concepts or remediation steps—especially dangerous when students have no framework to detect the error." },
            { name: "Fabricated Vulnerabilities", desc: "Hallucinated CVEs, non-existent exploits, or false positive vulnerability identifications that students may cite in professional reports." },
            { name: "Domain Validation Need", desc: "All AI outputs require expert verification before educational use—AI is not a substitute for domain expertise in high-stakes security contexts." },
          ],
          mitigation: "Establish mandatory faculty validation protocols. Teach students to cross-reference AI outputs with NVD, MITRE ATT&CK, and vendor advisories as professional practice."
        },
        {
          label: "C. Security & Misuse", icon: "💀", color: "#7C2D12", bg: "#FFF7ED",
          risks: [
            { name: "Dual-Use Risk", desc: "Educational AI tools can be repurposed for offensive security activities—AI that teaches exploit analysis can teach exploit development." },
            { name: "Unsafe Prompt Outputs", desc: "AI may generate functional attack code, working malware components, or operational offensive techniques when students probe system limits." },
            { name: "Data Exposure", desc: "Risk of sensitive institutional data—student records, unreleased vulnerability research, proprietary incident data—being inadvertently shared with third-party AI systems." },
          ],
          mitigation: "Implement content filtering for dual-use output, use private/enterprise AI deployments for sensitive coursework, and establish clear acceptable use policies with consequences."
        },
        {
          label: "D. Bias & Fairness", icon: "⚖️", color: "#065F46", bg: "#ECFDF5",
          risks: [
            { name: "Training Data Bias", desc: "AI outputs reflect historical inequities in training data—threat models built on English-language sources may perform worse for students from other linguistic backgrounds." },
            { name: "Access Inequality", desc: "Premium AI tools provide significantly better educational experiences than free tiers—creating a two-tier system that correlates with institutional wealth." },
            { name: "Language Barriers", desc: "Cultural and linguistic limitations in AI educational delivery systematically disadvantage non-native English speakers in ways that human instructors can compensate for." },
          ],
          mitigation: "Mandate equitable access through institutional licensing, evaluate AI tools specifically for performance across student demographic groups, and supplement AI with human mentorship."
        },
        {
          label: "E. Privacy & Governance", icon: "🔒", color: C.gold, bg: C.goldPale,
          risks: [
            { name: "Student Data Protection", desc: "FERPA compliance requirements apply to AI-powered systems that collect and process student interaction data—a requirement many institutions have not adequately addressed." },
            { name: "Proprietary Model Use", desc: "Institutional policies for third-party AI service procurement may not exist, creating procurement of AI tools without appropriate legal review or data processing agreements." },
            { name: "Compliance Challenges", desc: "Navigating evolving regulatory requirements (EU AI Act, state AI legislation) for AI in educational settings requires legal expertise most cybersecurity departments lack." },
          ],
          mitigation: "Establish cross-functional AI ethics boards including legal counsel, require data processing agreements for all third-party AI tools, and implement regular compliance audits."
        },
      ].map(cat => (
        <Card key={cat.label} style={{ borderTop: `4px solid ${cat.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.75rem" }}>{cat.icon}</span>
            <Badge color={cat.color} bg={cat.bg}>{cat.label}</Badge>
          </div>
          {cat.risks.map(r => (
            <div key={r.name} style={{ marginBottom: "0.75rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${cat.bg}` }}>
              <div style={{ fontWeight: 700, color: C.text, fontSize: "0.88rem" }}>⚠ {r.name}</div>
              <div style={{ color: C.textBody, fontSize: "0.82rem", lineHeight: 1.5, marginTop: 3 }}>{r.desc}</div>
            </div>
          ))}
          <div style={{ background: cat.bg, borderRadius: 10, padding: "0.75rem" }}>
            <strong style={{ color: cat.color, fontSize: "0.78rem" }}>✅ MITIGATION STRATEGY</strong>
            <p style={{ color: C.textBody, fontSize: "0.82rem", margin: "4px 0 0", lineHeight: 1.5 }}>{cat.mitigation}</p>
          </div>
        </Card>
      ))}
    </div>
    <Card style={{ background: "#FEF3C7", border: "2px solid #F59E0B" }}>
      <strong style={{ color: "#92400E" }}>🔑 Key Message:</strong>
      <p style={{ color: C.textBody, margin: "8px 0 0", lineHeight: 1.6 }}>
        The operating model matters more than the tool. Institutions must establish governance frameworks, validation processes, and ethical guidelines <strong>before</strong> deploying AI in cybersecurity education—not after an incident forces their hand.
      </p>
    </Card>
  </div>
);

// ─── Section: Governance ─────────────────────────────────────────────────────
const GovernanceSection = () => (
  <div>
    <SectionHeader icon="🛡️" title="Responsible Adoption Framework" subtitle="Access + Accountability + Assurance: a three-pillar governance model" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
      {[
        {
          pillar: "ACCESS", icon: "🔓", color: C.purple, bg: C.purplePale,
          def: "Equitable, practical tool availability for all learners",
          elements: [
            "Approved tools list with free-tier options for all students",
            "Device-agnostic deployment (browser-based, mobile-compatible)",
            "Disability accommodations integrated into AI-enhanced workflows",
            "Equitable distribution regardless of institution funding level",
          ],
          example: "UNC System model: Dual responsibility approach where both faculty and students access AI tools under clear institutional agreements. Free-tier tools are standardized so no student is disadvantaged by inability to pay.",
          question: "Ask yourself: If we deploy this AI tool, can every enrolled student use it equally?"
        },
        {
          pillar: "ACCOUNTABILITY", icon: "📋", color: C.rose, bg: C.rosePale,
          def: "Transparent use, authorship, and consequence frameworks",
          elements: [
            "Explicit AI use disclosure requirements in every syllabus",
            "Clear authorship norms: what counts as 'AI-assisted' vs. 'AI-generated'",
            "Consequence framework for misuse violations, consistently applied",
            "Faculty disclosure of their own AI use in content creation",
          ],
          example: "Penn State AI Hub model: Risk assessment and approved tool vetting process before any departmental deployment. AI use policies are reviewed by faculty governance, student representatives, and legal counsel—not unilaterally imposed.",
          question: "Ask yourself: If a student or faculty member violates the AI use policy, what happens—and does everyone know?"
        },
        {
          pillar: "ASSURANCE", icon: "✅", color: C.teal, bg: C.tealPale,
          def: "Validation, quality checks, and continuous auditing",
          elements: [
            "Verification-first practice: all AI outputs validated before student exposure",
            "Human-in-the-loop model for all graded and high-stakes interactions",
            "Assessment redesign toward oral defense, live labs, reflective tasks",
            "Regular auditing of AI system performance and accuracy over time",
          ],
          example: "ETHICAL Framework (7-pillar higher education model): Systematic validation processes ensure AI content meets educational standards. Faculty training includes not just how to use AI tools, but how to evaluate their outputs critically.",
          question: "Ask yourself: When AI makes a mistake in our curriculum, how do we catch it—and how do we fix it?"
        },
      ].map(p => (
        <Card key={p.pillar} style={{ borderTop: `5px solid ${p.color}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "2rem" }}>{p.icon}</span>
            <div>
              <div style={{ fontWeight: 900, color: p.color, fontSize: "1.1rem", letterSpacing: "0.05em" }}>{p.pillar}</div>
              <div style={{ fontSize: "0.82rem", color: C.textMuted }}>{p.def}</div>
            </div>
          </div>
          <ul style={{ margin: "0 0 0.75rem", paddingLeft: "1.25rem" }}>
            {p.elements.map(e => <li key={e} style={{ fontSize: "0.85rem", color: C.textBody, marginBottom: 5, lineHeight: 1.5 }}>{e}</li>)}
          </ul>
          <div style={{ background: p.bg, borderRadius: 10, padding: "0.75rem", marginBottom: "0.75rem" }}>
            <strong style={{ color: p.color, fontSize: "0.78rem" }}>🏫 REAL-WORLD MODEL</strong>
            <p style={{ color: C.textBody, fontSize: "0.82rem", margin: "4px 0 0", lineHeight: 1.5 }}>{p.example}</p>
          </div>
          <div style={{ background: "#F0F9FF", borderRadius: 8, padding: "0.6rem 0.75rem", borderLeft: `3px solid ${p.color}` }}>
            <em style={{ fontSize: "0.82rem", color: C.textBody }}>{p.question}</em>
          </div>
        </Card>
      ))}
    </div>
    <Card>
      <h4 style={{ color: C.text, margin: "0 0 1rem", fontWeight: 700 }}>🏛️ Successful Institutional Models</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {[
          { inst: "UNC System", model: "Dual responsibility model with mandatory syllabus policies across all campuses" },
          { inst: "Penn State AI Hub", model: "Risk assessment and approved tool vetting process; cross-functional governance board" },
          { inst: "ETHICAL Framework", model: "Seven-pillar model for higher education AI governance, openly published and adaptable" },
        ].map(m => (
          <div key={m.inst} style={{ background: C.purpleSoft, borderRadius: 12, padding: "1rem" }}>
            <div style={{ fontWeight: 700, color: C.purple, marginBottom: 4 }}>{m.inst}</div>
            <div style={{ fontSize: "0.82rem", color: C.textBody, lineHeight: 1.5 }}>{m.model}</div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── Section: Future ──────────────────────────────────────────────────────────
const FutureSection = () => (
  <div>
    <SectionHeader icon="🔮" title="The Future of Learning" subtitle="From memorization to judgment, verification, and institutional transformation" />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
      <Card>
        <h4 style={{ color: C.purple, margin: "0 0 1rem", fontWeight: 700 }}>🔄 Competency Evolution</h4>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "stretch" }}>
          <div style={{ flex: 1, background: "#FEF2F2", borderRadius: 10, padding: "0.75rem" }}>
            <div style={{ fontWeight: 700, color: C.rose, fontSize: "0.82rem", marginBottom: "0.5rem" }}>FROM (Traditional)</div>
            {["Knowledge recall", "Tool execution", "Single playbook mastery", "Exam performance", "Static certification"].map(i => (
              <div key={i} style={{ fontSize: "0.82rem", color: C.textBody, padding: "3px 0", borderBottom: "1px solid #FECACA" }}>{i}</div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: "1.5rem" }}>→</div>
          <div style={{ flex: 1, background: C.purplePale, borderRadius: 10, padding: "0.75rem" }}>
            <div style={{ fontWeight: 700, color: C.purple, fontSize: "0.82rem", marginBottom: "0.5rem" }}>TO (AI-Enabled Era)</div>
            {["Critical AI evaluation", "Output validation", "Adaptive judgment", "Demonstrated mastery", "Continuous upskilling"].map(i => (
              <div key={i} style={{ fontSize: "0.82rem", color: C.textBody, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>{i}</div>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <h4 style={{ color: C.rose, margin: "0 0 1rem", fontWeight: 700 }}>👩‍🏫 Faculty Role Evolution</h4>
        <p style={{ color: C.textBody, fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
          Faculty evolve from <strong>content delivery specialists</strong> to <strong>learning orchestrators, AI validators, and high-value mentors</strong>—roles that AI fundamentally cannot replicate.
        </p>
        {[
          { icon: "🎨", role: "Learning Experience Design", desc: "Designing AI-enhanced curricula that develop judgment, not just knowledge" },
          { icon: "🔍", role: "AI Output Validation", desc: "Expert review ensuring AI-generated content is accurate, safe, and pedagogically sound" },
          { icon: "🌟", role: "High-Value Mentorship", desc: "Professional identity, ethics, contextual judgment—irreplaceable human contributions" },
        ].map(r => (
          <div key={r.role} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem" }}>
            <span>{r.icon}</span>
            <div><strong style={{ fontSize: "0.85rem", color: C.text }}>{r.role}:</strong> <span style={{ fontSize: "0.82rem", color: C.textBody }}>{r.desc}</span></div>
          </div>
        ))}
      </Card>
    </div>
    <Card style={{ marginBottom: "1.25rem" }}>
      <h4 style={{ color: C.text, margin: "0 0 1rem", fontWeight: 700 }}>🏛️ Six Institutional Recommendations</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
        {[
          { n: "1", title: "Start with Pilots", icon: "🚀", color: C.purple, desc: "Begin with low-risk, high-impact pilots in specific courses before institution-wide deployment. Test in controlled environments, measure outcomes, refine approaches." },
          { n: "2", title: "Build AI Governance", icon: "🏛️", color: C.rose, desc: "Establish cross-functional AI ethics boards (faculty, IT, legal, students). Align with NIST AI Risk Management Framework and EU AI Act." },
          { n: "3", title: "Align Curriculum", icon: "📚", color: C.teal, desc: "Integrate both cybersecurity skills and AI literacy. Students need to understand AI capabilities, limitations, and ethical implications as professional preparation." },
          { n: "4", title: "Redesign Assessments", icon: "📝", color: C.gold, desc: "Move toward authentic evaluation: oral defense, live labs, reflective tasks, and process-based assessment that AI cannot easily replicate." },
          { n: "5", title: "Invest in Faculty", icon: "👩‍🏫", color: "#7C3AED", desc: "Structured AI literacy training beyond technical skills—ethical reflection, pedagogical integration, critical evaluation capabilities, and peer learning communities." },
          { n: "6", title: "Measure Outcomes", icon: "📊", color: "#065F46", desc: "Track learning quality, integrity metrics, inclusion indicators, and operational efficiency. Establish baseline metrics before AI implementation for meaningful comparison." },
        ].map(r => (
          <div key={r.n} style={{ background: C.purpleSoft, borderRadius: 12, padding: "1rem", borderLeft: `3px solid ${r.color}` }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.25rem" }}>{r.icon}</span>
              <Badge color={r.color} bg="transparent">{r.n}. {r.title}</Badge>
            </div>
            <div style={{ fontSize: "0.82rem", color: C.textBody, lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </Card>
    <Card style={{ background: `linear-gradient(135deg, ${C.purple} 0%, #9333EA 100%)`, color: C.white }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🌟</div>
        <h3 style={{ color: C.white, margin: "0 0 0.75rem", fontSize: "1.25rem" }}>The Competitive Advantage</h3>
        <p style={{ color: "#E9D5FF", fontSize: "1rem", lineHeight: 1.7, margin: 0, maxWidth: 600, marginInline: "auto" }}>
          "The competitive advantage will not be who uses AI, but who learns to use AI responsibly while preserving deep technical competence. The future belongs to institutions that combine <strong style={{ color: C.white }}>technical innovation</strong> with <strong style={{ color: C.white }}>ethical discipline</strong>."
        </p>
      </div>
    </Card>
  </div>
);

// ─── Section: Activities ──────────────────────────────────────────────────────
const ActivitiesSection = () => {
  const [expanded, setExpanded] = useState({});
  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <SectionHeader icon="🧪" title="Tutorial Activities" subtitle="Three hands-on activities designed for WiCyS conference participants" />
      {ACTIVITIES.map((act, idx) => (
        <Card key={idx} style={{ marginBottom: "1.5rem", borderLeft: `5px solid ${act.accent}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <Badge color={act.accent} bg={act.color}>{act.badge}</Badge>
                <Badge color={C.textMuted} bg="#F3F4F6">⏱ {act.duration}</Badge>
              </div>
              <h3 style={{ color: C.text, margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>{act.title}</h3>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ color: act.accent, fontSize: "0.85rem" }}>🎯 OBJECTIVE</strong>
            <p style={{ color: C.textBody, fontSize: "0.9rem", margin: "4px 0 0", lineHeight: 1.6 }}>{act.objective}</p>
          </div>

          <div style={{ background: act.color, borderRadius: 10, padding: "0.75rem", marginBottom: "1rem" }}>
            <strong style={{ color: act.accent, fontSize: "0.85rem" }}>📖 BACKGROUND</strong>
            <p style={{ color: C.textBody, fontSize: "0.88rem", margin: "4px 0 0", lineHeight: 1.6 }}>{act.background}</p>
          </div>

          {act.scenario && (
            <div style={{ background: "#0F172A", borderRadius: 12, padding: "1rem", marginBottom: "1rem", fontFamily: "monospace", fontSize: "0.82rem", color: "#E2E8F0", lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {act.scenario}
            </div>
          )}

          {act.rubricItems && (
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: C.text, fontSize: "0.85rem" }}>📋 READINESS RUBRIC (Score 0–2 each)</strong>
              {Object.entries(act.rubricItems).map(([pillar, items]) => (
                <div key={pillar} style={{ marginTop: "0.75rem" }}>
                  <div style={{ fontWeight: 700, color: act.accent, marginBottom: "0.4rem" }}>{pillar}</div>
                  {items.map(item => (
                    <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
                        {[0, 1, 2].map(v => (
                          <span key={v} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${act.accent}`, background: "white", display: "inline-block" }} />
                        ))}
                      </div>
                      <span style={{ fontSize: "0.82rem", color: C.textBody }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {act.steps && (
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: C.text, fontSize: "0.85rem" }}>📌 STEPS</strong>
              <ol style={{ paddingLeft: "1.5rem", margin: "8px 0 0" }}>
                {act.steps.map((s, i) => (
                  <li key={i} style={{ fontSize: "0.88rem", color: C.textBody, lineHeight: 1.6, marginBottom: 6 }}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          {act.tasks && (
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: C.text, fontSize: "0.85rem" }}>✏️ YOUR TASKS</strong>
              <ol style={{ paddingLeft: "1.5rem", margin: "8px 0 0" }}>
                {act.tasks.map((t, i) => (
                  <li key={i} style={{ fontSize: "0.88rem", color: C.textBody, lineHeight: 1.6, marginBottom: 6 }}>{t}</li>
                ))}
              </ol>
            </div>
          )}

          {act.samplePrompt && (
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: C.text, fontSize: "0.85rem" }}>💬 SAMPLE PROMPT TEMPLATE</strong>
              <div style={{ background: "#0F172A", borderRadius: 12, padding: "1rem", marginTop: 8, fontFamily: "monospace", fontSize: "0.78rem", color: "#A5F3FC", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {act.samplePrompt}
              </div>
            </div>
          )}

          {act.deliverable && (
            <div style={{ background: act.color, borderRadius: 10, padding: "0.75rem", marginBottom: "1rem" }}>
              <strong style={{ color: act.accent, fontSize: "0.85rem" }}>📤 DELIVERABLE</strong>
              <p style={{ color: C.textBody, fontSize: "0.88rem", margin: "4px 0 0" }}>{act.deliverable}</p>
            </div>
          )}

          {act.discussion && (
            <div style={{ marginBottom: "1rem" }}>
              <strong style={{ color: C.text, fontSize: "0.85rem" }}>💬 DISCUSSION QUESTIONS</strong>
              <ul style={{ paddingLeft: "1.25rem", margin: "8px 0 0" }}>
                {act.discussion.map((d, i) => (
                  <li key={i} style={{ fontSize: "0.88rem", color: C.textBody, lineHeight: 1.6, marginBottom: 5 }}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => toggle(`act-${idx}`)}
            style={{ background: act.accent, color: C.white, border: "none", borderRadius: 10, padding: "0.6rem 1.25rem", cursor: "pointer", fontWeight: 700, fontSize: "0.88rem" }}
          >
            {expanded[`act-${idx}`] ? "▲ Hide Solution Guide" : "▼ Show Solution Guide"}
          </button>

          {expanded[`act-${idx}`] && (
            <div style={{ background: "#F0FDF4", border: "2px solid #16A34A", borderRadius: 12, padding: "1rem", marginTop: "1rem" }}>
              <strong style={{ color: "#166534", fontSize: "0.85rem" }}>✅ SOLUTION GUIDE (Facilitator Reference)</strong>
              <p style={{ color: C.textBody, fontSize: "0.88rem", margin: "8px 0 0", lineHeight: 1.7, whiteSpace: "pre-line" }}>{act.solution}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

// ─── Section: Quiz ────────────────────────────────────────────────────────────
const QuizSection = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showExp, setShowExp] = useState({});

  const score = QUIZ.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div>
      <SectionHeader icon="📝" title="Knowledge Check Quiz" subtitle="8 questions covering all modules · Select the best answer for each" />
      {QUIZ.map((q, qi) => {
        const selected = answers[qi];
        const correct = selected === q.ans;
        return (
          <Card key={qi} style={{ marginBottom: "1.25rem", borderLeft: submitted ? `5px solid ${correct ? "#16A34A" : C.rose}` : `5px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div style={{ background: C.purplePale, color: C.purple, borderRadius: 20, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", flexShrink: 0 }}>{qi + 1}</div>
              <p style={{ color: C.text, fontWeight: 600, margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>{q.q}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginLeft: "2.25rem" }}>
              {q.opts.map((opt, oi) => {
                let bg = C.white, border = `1.5px solid ${C.border}`, color = C.textBody;
                if (selected === oi && !submitted) { bg = C.purplePale; border = `1.5px solid ${C.purple}`; color = C.purple; }
                if (submitted) {
                  if (oi === q.ans) { bg = "#F0FDF4"; border = "1.5px solid #16A34A"; color = "#166534"; }
                  else if (selected === oi && oi !== q.ans) { bg = "#FFF1F2"; border = `1.5px solid ${C.rose}`; color = C.rose; }
                }
                return (
                  <button key={oi} onClick={() => !submitted && setAnswers(p => ({ ...p, [qi]: oi }))}
                    style={{ background: bg, border, borderRadius: 10, padding: "0.65rem 1rem", cursor: submitted ? "default" : "pointer", textAlign: "left", color, fontSize: "0.88rem", lineHeight: 1.4, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span> {opt}
                    {submitted && oi === q.ans && <span style={{ marginLeft: "auto", color: "#16A34A" }}>✓</span>}
                    {submitted && selected === oi && oi !== q.ans && <span style={{ marginLeft: "auto", color: C.rose }}>✗</span>}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div>
                <button onClick={() => setShowExp(p => ({ ...p, [qi]: !p[qi] }))}
                  style={{ marginTop: "0.75rem", marginLeft: "2.25rem", background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: "0.8rem", color: C.textMuted }}>
                  {showExp[qi] ? "▲ Hide" : "▼ Show"} Explanation
                </button>
                {showExp[qi] && (
                  <div style={{ background: "#F8F6FF", borderRadius: 10, padding: "0.75rem", marginTop: "0.5rem", marginLeft: "2.25rem" }}>
                    <strong style={{ color: C.purple, fontSize: "0.8rem" }}>💡 EXPLANATION</strong>
                    <p style={{ color: C.textBody, fontSize: "0.85rem", margin: "4px 0 0", lineHeight: 1.6 }}>{q.exp}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}

      {!submitted ? (
        <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < QUIZ.length}
          style={{ background: Object.keys(answers).length < QUIZ.length ? C.textMuted : C.purple, color: C.white, border: "none", borderRadius: 12, padding: "0.85rem 2rem", fontSize: "1rem", fontWeight: 700, cursor: Object.keys(answers).length < QUIZ.length ? "not-allowed" : "pointer", display: "block", marginInline: "auto" }}>
          {Object.keys(answers).length < QUIZ.length ? `Answer all questions (${Object.keys(answers).length}/${QUIZ.length})` : "Submit Quiz"}
        </button>
      ) : (
        <Card style={{ textAlign: "center", background: score >= 6 ? "#F0FDF4" : "#FFF1F2", border: `2px solid ${score >= 6 ? "#16A34A" : C.rose}` }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{score >= 6 ? "🏆" : score >= 4 ? "📚" : "🔄"}</div>
          <h3 style={{ color: score >= 6 ? "#166534" : score >= 4 ? C.gold : C.rose, margin: "0 0 0.5rem", fontSize: "1.5rem" }}>
            {score} / {QUIZ.length} Correct
          </h3>
          <p style={{ color: C.textBody, marginBottom: "1rem" }}>
            {score >= 7 ? "Excellent! You have a strong grasp of AI in cybersecurity education principles." : score >= 5 ? "Good work! Review the explanations above for any missed questions." : "Keep reviewing the modules—the explanations above will help solidify the key concepts."}
          </p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); setShowExp({}); }}
            style={{ background: C.purple, color: C.white, border: "none", borderRadius: 10, padding: "0.65rem 1.5rem", cursor: "pointer", fontWeight: 700 }}>
            Retake Quiz
          </button>
        </Card>
      )}
    </div>
  );
};

// ─── Section: Assessment ──────────────────────────────────────────────────────
const AssessmentSection = () => {
  const [expanded, setExpanded] = useState({});
  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <SectionHeader icon="🎓" title="Assessment Problems" subtitle="Three deeper problems with full rubrics and model answers for self-study or classroom use" />
      {ASSESSMENT.map((a, idx) => (
        <Card key={idx} style={{ marginBottom: "1.5rem", borderTop: `5px solid ${a.accent}` }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ background: a.color, borderRadius: 12, padding: "0.75rem 1rem", textAlign: "center", minWidth: 60 }}>
              <div style={{ fontWeight: 900, color: a.accent, fontSize: "1.5rem" }}>{a.num}</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Badge color={a.accent} bg={a.color}>{a.type}</Badge>
              <h3 style={{ color: C.text, margin: "8px 0 0", fontSize: "1.15rem", fontWeight: 700 }}>{a.title}</h3>
            </div>
          </div>

          <div style={{ background: C.purpleSoft, borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" }}>
            <strong style={{ color: C.purple, fontSize: "0.85rem" }}>📋 PROMPT</strong>
            <p style={{ color: C.textBody, fontSize: "0.92rem", margin: "8px 0 0", lineHeight: 1.75, whiteSpace: "pre-line" }}>{a.prompt}</p>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ color: C.text, fontSize: "0.85rem" }}>📊 GRADING RUBRIC</strong>
            <div style={{ marginTop: 8 }}>
              {a.rubric.map((r, ri) => (
                <div key={ri} style={{ display: "flex", gap: "0.75rem", padding: "0.5rem 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: "0.85rem", color: C.textBody, lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => toggle(`assess-${idx}`)}
            style={{ background: a.accent, color: C.white, border: "none", borderRadius: 10, padding: "0.6rem 1.25rem", cursor: "pointer", fontWeight: 700, fontSize: "0.88rem" }}>
            {expanded[`assess-${idx}`] ? "▲ Hide Model Answer" : "▼ Show Model Answer"}
          </button>

          {expanded[`assess-${idx}`] && (
            <div style={{ background: "#F0FDF4", border: "2px solid #16A34A", borderRadius: 12, padding: "1.25rem", marginTop: "1rem" }}>
              <strong style={{ color: "#166534", fontSize: "0.85rem" }}>✅ MODEL ANSWER</strong>
              <p style={{ color: C.textBody, fontSize: "0.88rem", margin: "12px 0 0", lineHeight: 1.8, whiteSpace: "pre-line" }}>{a.answer}</p>
            </div>
          )}
        </Card>
      ))}

      <Card style={{ background: C.purpleSoft, textAlign: "center" }}>
        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80"
          alt="Women in education" style={{ width: "100%", maxWidth: 500, height: 200, objectFit: "cover", borderRadius: 14, marginBottom: "1.25rem" }}
          onError={e => { e.target.style.display = "none"; }} />
        <h3 style={{ color: C.purple, margin: "0 0 0.75rem" }}>Thank you for attending WiCyS 2026! 🎉</h3>
        <p style={{ color: C.textBody, lineHeight: 1.7, maxWidth: 600, marginInline: "auto" }}>
          The future of cybersecurity education belongs to practitioners who wield AI as a force multiplier while preserving the human judgment, ethical clarity, and professional integrity that define excellent defenders. Connect with fellow WiCyS members to continue building AI-enhanced programs at your institution.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
          <Badge color={C.white} bg={C.purple}>Access + Accountability + Assurance</Badge>
          <Badge color={C.white} bg={C.rose}>AI as Co-Pilot, Not Replacement</Badge>
        </div>
      </Card>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WiCySAITutorial() {
  const [active, setActive] = useState("overview");

  const SECTIONS = {
    overview: <OverviewSection />,
    crisis: <CrisisSection />,
    ai: <AISection />,
    usecases: <UseCasesSection />,
    scenarios: <ScenariosSection />,
    risks: <RisksSection />,
    governance: <GovernanceSection />,
    future: <FutureSection />,
    activities: <ActivitiesSection />,
    quiz: <QuizSection />,
    assessment: <AssessmentSection />,
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      {/* Top Bar */}
      <div style={{ background: `linear-gradient(90deg, ${C.purple} 0%, #9333EA 100%)`, padding: "0.6rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ color: C.white, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.05em" }}>WiCyS 2026</span>
        <span style={{ color: "#D4B8FF", fontSize: "0.82rem" }}>· Women in Cybersecurity · Academic Tutorial</span>
      </div>

      {/* Navigation */}
      <div style={{ background: C.white, borderBottom: `2px solid ${C.border}`, overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0, padding: "0 1rem", minWidth: "max-content" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              style={{
                background: active === tab.id ? C.purplePale : "transparent",
                color: active === tab.id ? C.purple : C.textMuted,
                border: "none", borderBottom: active === tab.id ? `3px solid ${C.purple}` : "3px solid transparent",
                padding: "0.85rem 0.85rem", cursor: "pointer", fontSize: "0.8rem", fontWeight: active === tab.id ? 700 : 500,
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.3rem", transition: "all 0.15s"
              }}>
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.25rem 4rem" }}>
        {SECTIONS[active]}
      </div>

      {/* Footer */}
      <div style={{ background: C.purple, color: "#E9D5FF", padding: "1.25rem", textAlign: "center", fontSize: "0.82rem" }}>
        WiCyS 2026 · AI in Cybersecurity Education: Opportunities, Ethics, and the Future of Learning · 60–90 Minute Academic Tutorial
      </div>
    </div>
  );
}
