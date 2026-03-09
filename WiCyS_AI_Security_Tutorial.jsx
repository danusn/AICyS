import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   WiCyS AI SECURITY ACCELERATOR PROGRAM
   Interactive Tutorial: AI in Cybersecurity Education
   ═══════════════════════════════════════════════════════════════ */

const C = {
  bg: "#03071A",
  surface: "#080F24",
  card: "#0C1530",
  cardHover: "#111D3C",
  border: "#1A2D52",
  borderBright: "#243D6A",
  teal: "#00E5CC",
  tealDim: "#00B4A0",
  pink: "#FF2D6B",
  pinkDim: "#CC2256",
  gold: "#FFD166",
  purple: "#9D6FFF",
  cyan: "#38BDF8",
  green: "#22C55E",
  red: "#F43F5E",
  text: "#E2E8F0",
  sub: "#94A3B8",
  dim: "#475569",
  wicys1: "#5B3FA6",
  wicys2: "#7C5AC2",
};

const MODULES = [
  { id: 0, icon: "⚠️", title: "Crisis Landscape", subtitle: "Three Converging Pressures", color: C.pink },
  { id: 1, icon: "🤖", title: "AI Inflection Point", subtitle: "Four Strategic Pillars", color: C.teal },
  { id: 2, icon: "🎯", title: "High-Value Use Cases", subtitle: "Classroom to Cyber Range", color: C.gold },
  { id: 3, icon: "🔬", title: "Practical Scenarios", subtitle: "Three Real-World Cases", color: C.cyan },
  { id: 4, icon: "⚖️", title: "Risks & Ethics", subtitle: "Five Ethical Fault Lines", color: C.pink },
  { id: 5, icon: "🛡️", title: "Governance Framework", subtitle: "Access · Accountability · Assurance", color: C.purple },
  { id: 6, icon: "🚀", title: "Future of Learning", subtitle: "From Memorization to Judgment", color: C.teal },
  { id: 7, icon: "📋", title: "Recommendations", subtitle: "Six Institutional Strategies", color: C.gold },
];

const QUIZZES = {
  0: [
    {
      q: "How many cybersecurity roles remain unfilled globally as of 2025?",
      options: ["1.2 million", "2.4 million", "4.8 million", "6.5 million"],
      answer: 2,
      exp: "4.8 million unfilled roles globally (2025). This workforce gap cannot be closed by traditional education models alone—it's the core driver for exploring AI-augmented training at scale.",
    },
    {
      q: "Organizations with cybersecurity skills gaps face breach costs averaging how much MORE per incident?",
      options: ["$450,000", "$890,000", "$1.2 million", "$1.76 million"],
      answer: 3,
      exp: "$1.76 million more per breach is the documented premium. This economic reality transforms AI-enhanced training from a pedagogical experiment into a strategic organizational imperative.",
    },
    {
      q: "What percentage of cybersecurity professionals say the current threat landscape is the most challenging in five years?",
      options: ["51%", "62%", "74%", "89%"],
      answer: 2,
      exp: "74% report this—driven by AI-assisted polymorphic malware, deepfake phishing, and automated lateral movement that evolve faster than curriculum can possibly adapt through traditional means.",
    },
  ],
  1: [
    {
      q: "Which AI pillar specifically involves cyber ranges generating polymorphic malware scenarios in safe environments?",
      options: ["Content Generation", "Adaptive Tutoring", "Simulation & Labs", "Assessment Automation"],
      answer: 2,
      exp: "Simulation & Labs creates realistic threat environments without real-world risk. AI-powered ranges generate dynamic scenarios including polymorphic malware, deepfake phishing campaigns, and AI-assisted lateral movement.",
    },
    {
      q: "What percentage of cybersecurity professionals cite AI as the most pressing skills need?",
      options: ["22%", "31%", "41%", "58%"],
      answer: 2,
      exp: "41% of professionals identify AI as the #1 skills need—making AI literacy not just a curriculum enhancement but a core professional competency requirement for the field.",
    },
    {
      q: "The framing question asks: Can AI improve education without weakening which three things?",
      options: [
        "Speed, accuracy, and cost-efficiency",
        "Critical thinking, ethics, and trust",
        "Content coverage, rigor, and student satisfaction",
        "Faculty autonomy, standards, and accreditation",
      ],
      answer: 1,
      exp: "Critical thinking, ethics, and trust are the three pillars that define quality cybersecurity education beyond skills training. AI must augment—not erode—these qualities to be genuinely beneficial.",
    },
  ],
  2: [
    {
      q: "Which real-world system exemplifies AI-powered tutoring in ABET-accredited cybersecurity courses?",
      options: ["CyberBot Pro", "SENSAI Tutoring System", "Guardian AI Tutor", "SecureLearn Platform"],
      answer: 1,
      exp: "SENSAI is cited as a real example of AI tutoring deployed at scale in ABET-accredited programs—demonstrating that AI tutoring can meet rigorous academic accreditation standards.",
    },
    {
      q: "Why might synthetic datasets be preferred over real datasets in cybersecurity training?",
      options: [
        "They are more statistically accurate",
        "They are less expensive to produce",
        "Real data may contain sensitive, classified, or personal information",
        "Synthetic data is required by FERPA",
      ],
      answer: 2,
      exp: "Real incident data often contains PII, classified threat intelligence, or proprietary organizational details that cannot be shared educationally. Synthetic datasets provide realistic training without legal or privacy risk.",
    },
    {
      q: "Under 'Student Learning Support,' which category involves CTF-style tasks with step-by-step AI guidance?",
      options: ["AI Tutors", "Debugging Support", "Lab Walkthroughs", "Concept Simplification"],
      answer: 2,
      exp: "Lab Walkthroughs specifically addresses CTF-style challenges with guided step-by-step assistance—scaffolding complex practical tasks while allowing students to develop genuine problem-solving skills.",
    },
  ],
  3: [
    {
      q: "In the SOC Incident Scenario, what is the primary educational gain of AI-generated scenarios?",
      options: [
        "Lower cost per training session",
        "Hands-on analysis without production risk; repeatable diverse attack vectors",
        "Faster automated grading",
        "Elimination of faculty oversight",
      ],
      answer: 1,
      exp: "Safe, repeatable, hands-on practice with diverse attack vectors is the core gain. Students experience realistic multi-stage incidents without any risk to real systems or organizations.",
    },
    {
      q: "What risk is identified for the AI Tutor for Firewall Misconfiguration scenario?",
      options: [
        "AI cannot understand firewall syntax",
        "The cost exceeds traditional instruction",
        "Over-reliance may inhibit independent problem-solving; need for graduated release",
        "Students may publicly share AI solutions",
      ],
      answer: 2,
      exp: "'Graduated release' is the pedagogical principle at stake: if AI always provides guidance, students may never develop the independent debugging skills essential for professional practice.",
    },
    {
      q: "What 'Common Pattern' connects all three practical scenarios?",
      options: [
        "AI is best for beginner courses only",
        "AI demonstrates value as a force multiplier while requiring human oversight and validation",
        "All scenarios require commercial AI platforms",
        "Faculty workload always increases with AI integration",
      ],
      answer: 1,
      exp: "The force multiplier pattern—AI amplifying human capability, not replacing human judgment—threads through every scenario. Each also requires faculty validation, oversight, and deliberate pedagogical design.",
    },
  ],
  4: [
    {
      q: "In cybersecurity education, 'hallucination' refers to which specific AI risk?",
      options: [
        "Students becoming confused by AI explanations",
        "AI generating technically inaccurate content, fabricated CVEs, or non-existent exploits",
        "Visual distortions in AI-generated diagrams",
        "AI system crashes during demonstrations",
      ],
      answer: 1,
      exp: "Hallucination means AI confidently generating false technical information—fabricated CVE IDs, non-existent exploits, or incorrect remediation steps. In cybersecurity, acting on hallucinated guidance can have serious real-world security consequences.",
    },
    {
      q: "Which ethical concern involves AI educational tools being repurposed for offensive security activities?",
      options: ["Academic Integrity", "Bias & Fairness", "Dual-Use Risk", "Privacy & Governance"],
      answer: 2,
      exp: "Dual-Use Risk acknowledges that tools teaching attack/defense techniques or generating vulnerability examples for analysis could be repurposed for unauthorized offensive activities—a unique challenge in cybersecurity vs. other education domains.",
    },
    {
      q: "FERPA compliance requires what in the context of AI-powered educational systems?",
      options: [
        "All AI must be open-source",
        "AI must grade all assignments equally",
        "Student educational records must be protected; data cannot be freely shared with third-party AI vendors",
        "Faculty must review every AI interaction",
      ],
      answer: 2,
      exp: "FERPA (Family Educational Rights and Privacy Act) protects student records. When AI systems process student data, institutions need appropriate data processing agreements with AI vendors to ensure compliance.",
    },
  ],
  5: [
    {
      q: "What are the three pillars of the Responsible AI Adoption Framework?",
      options: [
        "Analyze, Implement, Evaluate",
        "Access, Accountability, Assurance",
        "Adopt, Adapt, Assess",
        "Audit, Approve, Apply",
      ],
      answer: 1,
      exp: "Access (equitable tool availability) + Accountability (transparent use and authorship) + Assurance (validation and quality checks) form the triple-A governance model for responsible AI integration.",
    },
    {
      q: "What does 'Human-in-the-Loop' mean in the governance context?",
      options: [
        "Students must manually enter all data",
        "Faculty remain central; all AI outputs require expert validation before student exposure",
        "A human approves each AI query in real-time",
        "AI is only used when no faculty is available",
      ],
      answer: 1,
      exp: "Human-in-the-loop positions faculty as the authoritative pedagogical actor. AI assists but does not replace human judgment—all generated content, assessments, and explanations require expert validation.",
    },
    {
      q: "The ETHICAL Framework is described as how many pillars for higher education AI governance?",
      options: ["Three-pillar", "Five-pillar", "Seven-pillar", "Ten-pillar"],
      answer: 2,
      exp: "The ETHICAL Framework is a seven-pillar model for higher education AI governance—representing a comprehensive institutional approach that goes well beyond simple acceptable-use policy statements.",
    },
  ],
  6: [
    {
      q: "The future of cybersecurity learning shifts FROM knowledge recall TO what?",
      options: [
        "Faster memorization techniques",
        "Critical evaluation and verification of AI-generated information",
        "More standardized testing",
        "Increased AI tool dependency",
      ],
      answer: 1,
      exp: "The paradigm shift is from content memorization to critical evaluation—assessing AI-generated output, validating technical claims, and exercising judgment in novel threat scenarios that no prior template covers.",
    },
    {
      q: "What percentage of cybersecurity leaders say they are willing to fund AI/ML certifications?",
      options: ["67%", "80%", "87%", "94%"],
      answer: 3,
      exp: "94% of cybersecurity leaders are willing to fund AI/ML certifications—an extraordinary level of employer investment readiness that institutions can leverage to align curriculum with validated industry needs.",
    },
    {
      q: "Competency-based education replaces which traditional progress metric?",
      options: [
        "Grade point averages",
        "Traditional seat-time metrics (credit hours, time-in-class)",
        "Faculty evaluations",
        "Industry certification counts",
      ],
      answer: 1,
      exp: "Seat-time is replaced by demonstrated mastery—learners progress when they can prove competence, not just that they attended. This model aligns far better with professional skills validation in cybersecurity.",
    },
  ],
  7: [
    {
      q: "Which institution is cited for 'Elements of AI' reaching 500K+ learners worldwide?",
      options: ["MIT", "Carnegie Mellon", "University of Helsinki", "Stanford University"],
      answer: 2,
      exp: "The University of Helsinki's 'Elements of AI' exemplifies scalable AI literacy—500K+ learners globally, demonstrating how open, accessible AI education can address skills gaps at population scale.",
    },
    {
      q: "What type of assessment does Recommendation #4 specifically advocate?",
      options: [
        "More frequent multiple-choice testing",
        "AI-graded assignments exclusively",
        "Oral defense, live labs, reflective tasks, and process-based evaluation",
        "Peer-graded portfolio submissions",
      ],
      answer: 2,
      exp: "Authentic evaluation methods require genuine human demonstration of competence that AI cannot easily replicate. Oral defense and live labs preserve assessment integrity in an AI-assisted learning environment.",
    },
    {
      q: "Which frameworks are specifically cited for institutional AI governance alignment?",
      options: [
        "ISO 27001 and SOC 2",
        "NIST AI Risk Management Framework and EU AI Act",
        "GDPR and HIPAA",
        "MITRE ATT&CK and CVE",
      ],
      answer: 1,
      exp: "NIST AI RMF and the EU AI Act connect educational AI governance to authoritative national and international standards—giving institutions a structured, recognized basis for their governance frameworks.",
    },
  ],
};

/* ─── REUSABLE UI COMPONENTS ─────────────────────────────────── */

function Tag({ children, color = C.teal }) {
  return (
    <span
      style={{
        background: color + "20",
        color,
        border: `1px solid ${color}40`,
        borderRadius: 4,
        padding: "2px 8px",
        fontSize: 11,
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function StatPill({ value, label, color = C.teal }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${color}30`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div style={{ color, fontSize: 28, fontWeight: 800, fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: C.sub, fontSize: 12 }}>{label}</div>
    </div>
  );
}

function InfoBox({ icon, title, children, color = C.teal }) {
  return (
    <div
      style={{
        background: color + "08",
        border: `1px solid ${color}25`,
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <strong style={{ color, fontSize: 13, fontFamily: "'Space Mono', monospace" }}>{title}</strong>
      </div>
      <div style={{ color: C.sub, fontSize: 13, lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        marginTop: 22,
      }}
    >
      <div style={{ height: 1, flex: 1, background: C.border }} />
      <span
        style={{
          color: C.dim,
          fontSize: 10,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        {children}
      </span>
      <div style={{ height: 1, flex: 1, background: C.border }} />
    </div>
  );
}

/* ─── QUIZ COMPONENT ─────────────────────────────────────────── */

function Quiz({ questions }) {
  const [selected, setSelected] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (qi, oi) => {
    if (revealed[qi]) return;
    const next = { ...selected, [qi]: oi };
    setSelected(next);
    setRevealed((r) => ({ ...r, [qi]: true }));
    if (Object.keys(next).length === questions.length) {
      const s = questions.filter((q, i) => next[i] === q.answer).length;
      setScore(s);
    }
  };

  const reset = () => { setSelected({}); setRevealed({}); setScore(null); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {questions.map((q, qi) => {
        const isRevealed = revealed[qi];
        const userAns = selected[qi];
        return (
          <div
            key={qi}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  minWidth: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: C.purple + "30",
                  border: `1px solid ${C.purple}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.purple,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Q{qi + 1}
              </div>
              <div style={{ color: C.text, fontSize: 14, lineHeight: 1.6, fontWeight: 500 }}>{q.q}</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt, oi) => {
                let bg = C.surface;
                let border = C.border;
                let textCol = C.sub;
                if (isRevealed) {
                  if (oi === q.answer) { bg = C.green + "15"; border = C.green + "60"; textCol = C.green; }
                  else if (oi === userAns && oi !== q.answer) { bg = C.red + "15"; border = C.red + "60"; textCol = C.red; }
                }
                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 8,
                      padding: "10px 14px",
                      textAlign: "left",
                      cursor: isRevealed ? "default" : "pointer",
                      color: textCol,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      transition: "all 0.2s",
                    }}
                  >
                    <span
                      style={{
                        minWidth: 22,
                        height: 22,
                        borderRadius: "50%",
                        border: `1px solid ${border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontFamily: "'Space Mono', monospace",
                        color: textCol,
                      }}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                    {isRevealed && oi === q.answer && <span style={{ marginLeft: "auto" }}>✓</span>}
                    {isRevealed && oi === userAns && oi !== q.answer && <span style={{ marginLeft: "auto" }}>✗</span>}
                  </button>
                );
              })}
            </div>

            {isRevealed && (
              <div
                style={{
                  marginTop: 12,
                  background: C.teal + "08",
                  border: `1px solid ${C.teal}25`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: C.sub,
                  fontSize: 12.5,
                  lineHeight: 1.65,
                }}
              >
                <span style={{ color: C.teal, fontWeight: 700, fontFamily: "'Space Mono', monospace", fontSize: 11 }}>
                  EXPLANATION ›{" "}
                </span>
                {q.exp}
              </div>
            )}
          </div>
        );
      })}

      {score !== null && (
        <div
          style={{
            background: (score === questions.length ? C.green : score >= questions.length / 2 ? C.gold : C.red) + "15",
            border: `1px solid ${score === questions.length ? C.green : score >= questions.length / 2 ? C.gold : C.red}40`,
            borderRadius: 12,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>
              Score: {score}/{questions.length}
              {score === questions.length ? " — Perfect! 🎉" : score >= questions.length / 2 ? " — Good work!" : " — Review the explanations above"}
            </div>
          </div>
          <button
            onClick={reset}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: "6px 14px",
              color: C.sub,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            RETRY
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── MODULE CONTENT ─────────────────────────────────────────── */

function Module0Activity() {
  const [orgSize, setOrgSize] = useState(500);
  const [gapPct, setGapPct] = useState(20);
  const cost = Math.round((orgSize * (gapPct / 100)) * 1760000 / 100) / 10000;

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.pink, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        ⚡ ACTIVITY: SKILLS GAP COST ESTIMATOR
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        Use this model to estimate the financial impact of cybersecurity skills gaps in your organization. 
        Adjust the sliders and observe how the gap translates to breach cost exposure.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: C.text, fontSize: 13 }}>Organization size (security staff)</span>
            <span style={{ color: C.gold, fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{orgSize} people</span>
          </div>
          <input type="range" min={10} max={2000} value={orgSize}
            onChange={e => setOrgSize(+e.target.value)}
            style={{ width: "100%", accentColor: C.gold }} />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: C.text, fontSize: 13 }}>Estimated skills gap (%)</span>
            <span style={{ color: C.pink, fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{gapPct}%</span>
          </div>
          <input type="range" min={5} max={80} value={gapPct}
            onChange={e => setGapPct(+e.target.value)}
            style={{ width: "100%", accentColor: C.pink }} />
        </div>
      </div>

      <div style={{ background: C.pink + "12", border: `1px solid ${C.pink}30`, borderRadius: 10, padding: 16 }}>
        <div style={{ color: C.sub, fontSize: 12, marginBottom: 4 }}>Estimated additional breach cost exposure (annual)</div>
        <div style={{ color: C.pink, fontSize: 36, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
          ${cost.toLocaleString()}M
        </div>
        <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>
          Formula: (staff × gap%) × $1.76M premium per skills-gap breach
        </div>
      </div>

      <div style={{ marginTop: 14, color: C.sub, fontSize: 12, lineHeight: 1.7 }}>
        <strong style={{ color: C.text }}>Discussion prompt:</strong> Present this model to your department head. 
        What investment in AI-enhanced training would be justified to reduce this exposure by 50%? 
        How does this reframe AI education tools as risk management, not just pedagogy?
      </div>
    </div>
  );
}

function Module1Activity() {
  const pillars = [
    { id: 0, name: "Content Generation", desc: "Faculty time reduction", color: C.teal },
    { id: 1, name: "Adaptive Tutoring", desc: "Personalized mastery", color: C.purple },
    { id: 2, name: "Simulation & Labs", desc: "Safe practice environments", color: C.pink },
    { id: 3, name: "Assessment Automation", desc: "Real-time feedback loops", color: C.gold },
  ];
  const tools = [
    { id: "a", text: "AI generates five quiz variants from one topic to prevent answer-sharing", correct: 0 },
    { id: "b", text: "Intelligent tutor explains hash collision vulnerabilities three different ways until the student grasps it", correct: 1 },
    { id: "c", text: "Cyber range spawns a polymorphic ransomware campaign for IR practice", correct: 2 },
    { id: "d", text: "System maps a student's progression through network defense competencies in real time", correct: 3 },
  ];
  const [matches, setMatches] = useState({});
  const [checking, setChecking] = useState(false);

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.teal, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        🎯 ACTIVITY: MATCH THE AI TOOL TO ITS PILLAR
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        For each use case below, click the pillar it belongs to. Then check your answers.
      </div>

      {tools.map(tool => (
        <div key={tool.id} style={{ marginBottom: 14 }}>
          <div style={{ color: C.text, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
            <span style={{ color: C.cyan, fontFamily: "'Space Mono', monospace" }}>[{tool.id.toUpperCase()}]</span>{" "}
            {tool.text}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pillars.map(p => {
              const chosen = matches[tool.id] === p.id;
              const isCorrect = checking && tool.correct === p.id;
              const isWrong = checking && chosen && !isCorrect;
              return (
                <button
                  key={p.id}
                  onClick={() => !checking && setMatches(m => ({ ...m, [tool.id]: p.id }))}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: `1px solid ${isCorrect ? C.green : isWrong ? C.red : chosen ? p.color : C.border}`,
                    background: isCorrect ? C.green + "20" : isWrong ? C.red + "20" : chosen ? p.color + "20" : C.surface,
                    color: isCorrect ? C.green : isWrong ? C.red : chosen ? p.color : C.dim,
                    fontSize: 12,
                    cursor: checking ? "default" : "pointer",
                    fontFamily: chosen || isCorrect ? "'Space Mono', monospace" : "inherit",
                    fontWeight: chosen ? 700 : 400,
                  }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={() => setChecking(true)}
          style={{
            background: C.teal + "20", border: `1px solid ${C.teal}50`, borderRadius: 8,
            padding: "8px 18px", color: C.teal, fontSize: 12, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          CHECK ANSWERS
        </button>
        <button
          onClick={() => { setMatches({}); setChecking(false); }}
          style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "8px 18px", color: C.dim, fontSize: 12, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          RESET
        </button>
      </div>
      {checking && (
        <div style={{ marginTop: 12, color: C.teal, fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
          ✓ A→Content Gen | B→Adaptive Tutoring | C→Simulation & Labs | D→Assessment Auto
        </div>
      )}
    </div>
  );
}

function Module2Activity() {
  const [selected, setSelected] = useState({ step1: "", step2: "", step3: "" });
  const options = {
    step1: ["AI generates lecture slides and a reading quiz", "Faculty writes all materials from scratch", "Students research the topic independently"],
    step2: ["AI tutor available 24/7 for concept explanation", "Office hours only during business hours", "A single TA handles all student questions"],
    step3: ["AI provides instant formative feedback on lab submissions", "Grades returned within 2 weeks by manual review", "Peer review only"],
  };
  const best = { step1: 0, step2: 0, step3: 0 };

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.gold, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        📐 ACTIVITY: AI-ENHANCED LESSON DESIGN
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        You are designing a new unit on <strong style={{ color: C.text }}>Incident Response Fundamentals</strong> for 
        a cohort of 80 students with one faculty member. Choose the AI-augmented approach at each stage.
      </div>

      {[
        { key: "step1", label: "STEP 1: Pre-class content delivery" },
        { key: "step2", label: "STEP 2: In-class & asynchronous support" },
        { key: "step3", label: "STEP 3: Lab assessment & feedback" },
      ].map(({ key, label }) => (
        <div key={key} style={{ marginBottom: 16 }}>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>
            {label}
          </div>
          {options[key].map((opt, i) => {
            const chosen = selected[key] === String(i);
            const isBest = chosen && i === best[key];
            const isWeak = chosen && i !== best[key];
            return (
              <button
                key={i}
                onClick={() => setSelected(s => ({ ...s, [key]: String(i) }))}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: isBest ? C.teal + "15" : isWeak ? C.pink + "10" : C.surface,
                  border: `1px solid ${isBest ? C.teal + "50" : isWeak ? C.pink + "40" : C.border}`,
                  borderRadius: 8, padding: "9px 14px", color: isBest ? C.teal : isWeak ? C.pink : C.sub,
                  fontSize: 13, cursor: "pointer", marginBottom: 6, lineHeight: 1.5,
                }}
              >
                {isBest && "✓ "}{isWeak && "△ "}{opt}
                {isBest && <span style={{ float: "right", fontSize: 11 }}>OPTIMAL CHOICE</span>}
                {isWeak && <span style={{ float: "right", fontSize: 11 }}>CONSIDER AI AUGMENTATION</span>}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Module3Activity() {
  const scenarios = [
    {
      id: 0, icon: "🖥️",
      title: "Scenario A: SOC Incident Response",
      problem: "Students need realistic multi-stage attack practice with SIEM alerts, firewall logs, and IOC analysis—but you can't use real production data.",
      solution: "Generate synthetic multi-stage attack scenarios with realistic log patterns, network traffic, and IOCs using AI. Deploy in isolated cyber range. Validate scenarios with faculty SME before student exposure.",
      gain: "Hands-on analysis without production risk; repeatable diverse attack vectors; immediate instructor insight into student decision-making patterns.",
      caveat: "AI-generated IOCs may not perfectly mirror real attacker behavior. Always have a domain expert validate before deployment.",
    },
    {
      id: 1, icon: "🔥",
      title: "Scenario B: Firewall Rule Debugging",
      problem: "Students struggle with iptables chain order, rule conflicts, and connectivity troubleshooting. Faculty can't provide 1-on-1 help to 80 students simultaneously.",
      solution: "Deploy an AI tutor configured with firewall knowledge. Tutor provides step-by-step debugging guidance, explains rule evaluation order, and suggests fixes—but uses Socratic questioning rather than just giving answers.",
      gain: "Faster skill acquisition; reduced frustration; immediate feedback; personalized pacing. Faculty freed for conceptual mentorship.",
      caveat: "Configure graduated release: AI provides more scaffolding for beginners, less for advanced students. Track when students bypass AI to solve independently.",
    },
    {
      id: 2, icon: "💻",
      title: "Scenario C: Secure Code Review",
      problem: "A class of 60 students each submits 200 lines of Python for security review. Manual review would take faculty 3+ weeks per cycle—eliminating the rapid feedback loop that builds skills.",
      solution: "AI automated scanner identifies vulnerabilities (injection, hardcoded creds, insecure deserialization) with line-level explanations. Faculty reviews flagged high-severity items and edge cases. Final grades require human sign-off.",
      gain: "Consistent, rapid feedback at scale; immediate vulnerability identification; faculty time freed for high-complexity review and mentorship.",
      caveat: "Mandatory human verification for false positives/negatives. Students must understand tool limitations—this is itself a learning objective.",
    },
  ];
  const [open, setOpen] = useState(null);

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.cyan, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        🔬 ACTIVITY: SCENARIO DEEP DIVE
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        Click each scenario to expand the full Problem → AI Approach → Educational Gain → Caveat analysis. 
        Then identify which scenario is most applicable to your current teaching context.
      </div>
      {scenarios.map(sc => (
        <div
          key={sc.id}
          style={{
            marginBottom: 12,
            background: open === sc.id ? C.cardHover : C.surface,
            border: `1px solid ${open === sc.id ? C.cyan + "40" : C.border}`,
            borderRadius: 10,
            overflow: "hidden",
            transition: "all 0.2s",
          }}
        >
          <button
            onClick={() => setOpen(open === sc.id ? null : sc.id)}
            style={{
              width: "100%", textAlign: "left", background: "none", border: "none",
              padding: "13px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}
          >
            <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{sc.icon} {sc.title}</span>
            <span style={{ color: C.dim, fontSize: 16 }}>{open === sc.id ? "▲" : "▼"}</span>
          </button>
          {open === sc.id && (
            <div style={{ padding: "0 16px 16px" }}>
              {[
                { label: "PROBLEM", content: sc.problem, color: C.pink },
                { label: "AI APPROACH", content: sc.solution, color: C.teal },
                { label: "EDUCATIONAL GAIN", content: sc.gain, color: C.green },
                { label: "RISK / CAVEAT", content: sc.caveat, color: C.gold },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 10 }}>
                  <div style={{ color: item.color, fontSize: 11, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ color: C.sub, fontSize: 13, lineHeight: 1.65 }}>{item.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Module4Activity() {
  const risks = [
    { id: 0, name: "Academic Integrity (AI Ghostwriting)", desc: "Students submitting fully AI-generated work as original", severity: "HIGH" },
    { id: 1, name: "Hallucination in Technical Guidance", desc: "AI providing incorrect CVEs, exploits, or remediation steps", severity: "HIGH" },
    { id: 2, name: "Dual-Use Misuse", desc: "Educational tools repurposed for unauthorized offensive activity", severity: "HIGH" },
    { id: 3, name: "Training Data Bias", desc: "Outputs reflecting historical inequities in security datasets", severity: "MEDIUM" },
    { id: 4, name: "Unequal Tool Access", desc: "Premium AI tools available only to well-funded institutions", severity: "MEDIUM" },
    { id: 5, name: "Student Data Privacy (FERPA)", desc: "Student records exposed to third-party AI vendors", severity: "HIGH" },
  ];
  const [ratings, setRatings] = useState({});
  const levels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const levelColors = { LOW: C.green, MEDIUM: C.gold, HIGH: C.pink, CRITICAL: "#FF0000" };

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.pink, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        ⚖️ ACTIVITY: ETHICAL RISK ASSESSMENT EXERCISE
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        For each risk below, rate the severity for YOUR institution's specific context. 
        After rating, compare your assessment with the experts' baseline rating (shown on hover/click).
      </div>
      {risks.map(risk => (
        <div key={risk.id} style={{ marginBottom: 14 }}>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{risk.name}</div>
          <div style={{ color: C.dim, fontSize: 12, marginBottom: 8 }}>{risk.desc}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {levels.map(lv => (
              <button
                key={lv}
                onClick={() => setRatings(r => ({ ...r, [risk.id]: lv }))}
                style={{
                  padding: "4px 12px",
                  borderRadius: 4,
                  border: `1px solid ${ratings[risk.id] === lv ? levelColors[lv] : C.border}`,
                  background: ratings[risk.id] === lv ? levelColors[lv] + "25" : C.surface,
                  color: ratings[risk.id] === lv ? levelColors[lv] : C.dim,
                  fontSize: 11,
                  cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {lv}
              </button>
            ))}
            {ratings[risk.id] && (
              <span style={{ fontSize: 11, color: C.sub, marginLeft: 6 }}>
                Expert baseline: <span style={{ color: levelColors[risk.severity], fontFamily: "'Space Mono', monospace" }}>{risk.severity}</span>
                {ratings[risk.id] === risk.severity ? " ✓ Aligned" : " — Discuss the difference in your team"}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Module5Activity() {
  const items = [
    { id: 0, cat: "ACCESS", text: "Approved tools list published and updated quarterly", required: true },
    { id: 1, cat: "ACCESS", text: "Equitable access plan for students without personal devices/accounts", required: true },
    { id: 2, cat: "ACCOUNTABILITY", text: "Syllabus AI use policy with explicit disclosure requirements", required: true },
    { id: 3, cat: "ACCOUNTABILITY", text: "Student consent process for AI-assisted assessment", required: true },
    { id: 4, cat: "ACCOUNTABILITY", text: "Faculty training on identifying AI-generated submissions", required: false },
    { id: 5, cat: "ASSURANCE", text: "Domain expert review process for all AI-generated content before student exposure", required: true },
    { id: 6, cat: "ASSURANCE", text: "Audit log for AI tool usage in graded assessments", required: false },
    { id: 7, cat: "ASSURANCE", text: "FERPA data processing agreement with all AI vendors", required: true },
    { id: 8, cat: "ASSURANCE", text: "Incident response plan for AI-related academic integrity violations", required: false },
  ];
  const [checked, setChecked] = useState(new Set());
  const catColors = { ACCESS: C.teal, ACCOUNTABILITY: C.purple, ASSURANCE: C.gold };
  const score = [...checked].length;
  const required = items.filter(i => i.required && checked.has(i.id)).length;
  const totalRequired = items.filter(i => i.required).length;

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.purple, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        🛡️ ACTIVITY: GOVERNANCE READINESS CHECKLIST
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
        Check each governance element your institution currently has in place. 
        Items marked <span style={{ color: C.pink }}>required</span> are considered baseline minimum by the ETHICAL Framework.
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
          <div style={{ color: C.text, fontSize: 22, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>
            {score}<span style={{ fontSize: 14, color: C.dim }}>/{items.length}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 6, background: C.surface, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(score / items.length) * 100}%`, background: C.purple, borderRadius: 3, transition: "width 0.3s" }} />
            </div>
            <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>
              Required items: {required}/{totalRequired} {required < totalRequired ? "⚠️ Address gaps before deployment" : "✓"}
            </div>
          </div>
        </div>
      </div>
      {["ACCESS", "ACCOUNTABILITY", "ASSURANCE"].map(cat => (
        <div key={cat} style={{ marginBottom: 14 }}>
          <div style={{ color: catColors[cat], fontSize: 11, fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 8 }}>
            ── {cat}
          </div>
          {items.filter(i => i.cat === cat).map(item => (
            <div
              key={item.id}
              onClick={() => setChecked(s => { const n = new Set(s); n.has(item.id) ? n.delete(item.id) : n.add(item.id); return n; })}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px",
                background: checked.has(item.id) ? catColors[cat] + "10" : "transparent",
                borderRadius: 6, cursor: "pointer", marginBottom: 4,
              }}
            >
              <div style={{
                minWidth: 18, height: 18, borderRadius: 3,
                border: `1.5px solid ${checked.has(item.id) ? catColors[cat] : C.border}`,
                background: checked.has(item.id) ? catColors[cat] : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 1,
              }}>
                {checked.has(item.id) && <span style={{ color: C.bg, fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
              <div>
                <span style={{ color: checked.has(item.id) ? C.text : C.sub, fontSize: 13 }}>{item.text}</span>
                {item.required && (
                  <span style={{ color: C.pink, fontSize: 10, marginLeft: 8, fontFamily: "'Space Mono', monospace" }}>REQUIRED</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Module6Activity() {
  const transitions = [
    { from: "Memorizing CVE databases", to: "Evaluating AI-generated vulnerability reports for accuracy", icon: "📋" },
    { from: "Executing scripted penetration tests", to: "Designing novel attack scenarios AI hasn't encountered", icon: "⚔️" },
    { from: "Recalling firewall syntax", to: "Verifying AI-generated rule sets for logical errors", icon: "🔥" },
    { from: "Reading static threat reports", to: "Interrogating AI threat intelligence for bias and gaps", icon: "🔍" },
    { from: "Delivering pre-written lectures", to: "Orchestrating AI-augmented learning experiences", icon: "🎓" },
  ];
  const [revealed, setRevealed] = useState(new Set());

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.teal, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        🚀 ACTIVITY: COMPETENCY EVOLUTION MAPPER
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        Click each skill to reveal the AI-era evolution. Discuss with your table: 
        which transition requires the most significant curriculum redesign at your institution?
      </div>
      {transitions.map((t, i) => {
        const isOpen = revealed.has(i);
        return (
          <div
            key={i}
            onClick={() => setRevealed(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
            style={{
              marginBottom: 10,
              background: isOpen ? C.teal + "08" : C.surface,
              border: `1px solid ${isOpen ? C.teal + "40" : C.border}`,
              borderRadius: 10, padding: "12px 16px", cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <span style={{ color: isOpen ? C.dim : C.sub, fontSize: 13, textDecoration: isOpen ? "line-through" : "none" }}>
                  {t.from}
                </span>
              </div>
              <span style={{ color: C.dim }}>{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.teal}20` }}>
                <span style={{ color: C.teal, fontSize: 18 }}>→</span>
                <span style={{ color: C.teal, fontSize: 13, fontWeight: 500 }}>{t.to}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Module7Activity() {
  const recs = [
    { id: 0, n: "01", title: "Start with Pilots", desc: "Low-risk, high-impact pilots in specific courses before institution-wide deployment.", color: C.teal },
    { id: 1, n: "02", title: "Build AI Governance", desc: "Cross-functional AI ethics board with faculty, IT, legal, and student representation.", color: C.purple },
    { id: 2, n: "03", title: "Align Curriculum", desc: "Integrate cybersecurity skills AND AI literacy. Students need both halves.", color: C.gold },
    { id: 3, n: "04", title: "Redesign Assessments", desc: "Oral defense, live labs, reflective tasks—authentic evaluation AI can't replicate.", color: C.pink },
    { id: 4, n: "05", title: "Invest in Faculty", desc: "Structured AI literacy training including ethical reflection and pedagogical integration.", color: C.cyan },
    { id: 5, n: "06", title: "Measure Outcomes", desc: "Track learning quality, integrity metrics, inclusion indicators, operational efficiency.", color: C.green },
  ];
  const [priorities, setPriorities] = useState(new Set());

  const toggle = (id) => {
    setPriorities(p => {
      const n = new Set(p);
      if (n.has(id)) { n.delete(id); return n; }
      if (n.size < 3) { n.add(id); return n; }
      return p;
    });
  };

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      <div style={{ color: C.gold, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 12 }}>
        📋 ACTIVITY: INSTITUTION PRIORITY SELECTION
      </div>
      <div style={{ color: C.sub, fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        Select your institution's <strong style={{ color: C.text }}>top 3 priority recommendations</strong> for the next academic year. 
        Be prepared to defend your choices to the group—what constraints drive your priorities?
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {recs.map(r => {
          const chosen = priorities.has(r.id);
          const rank = chosen ? [...priorities].indexOf(r.id) + 1 : null;
          return (
            <div
              key={r.id}
              onClick={() => toggle(r.id)}
              style={{
                background: chosen ? r.color + "15" : C.surface,
                border: `1.5px solid ${chosen ? r.color + "60" : C.border}`,
                borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                position: "relative", transition: "all 0.2s",
              }}
            >
              {chosen && (
                <div style={{
                  position: "absolute", top: -8, right: -8,
                  width: 22, height: 22, borderRadius: "50%",
                  background: r.color, color: C.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                }}>
                  {rank}
                </div>
              )}
              <div style={{ color: r.color, fontSize: 20, fontFamily: "'Space Mono', monospace", fontWeight: 800, marginBottom: 4 }}>{r.n}</div>
              <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
              <div style={{ color: C.dim, fontSize: 12, lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          );
        })}
      </div>
      {priorities.size === 3 && (
        <div style={{ background: C.gold + "10", border: `1px solid ${C.gold}30`, borderRadius: 8, padding: 12, color: C.sub, fontSize: 12, lineHeight: 1.7 }}>
          <strong style={{ color: C.gold }}>Discussion prompt:</strong>{" "}
          You selected {[...priorities].map(i => recs[i].title).join(", ")}. 
          What institutional barriers might prevent implementation? 
          What would need to be true—in terms of budget, culture, or policy—for these to succeed?
        </div>
      )}
    </div>
  );
}

/* ─── MODULE FULL CONTENT DEFINITIONS ───────────────────────── */

const MODULE_CONTENT = [
  // MODULE 0
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          The cybersecurity education system is under simultaneous pressure from three structural forces that compound each other.
          Understanding this crisis is essential context for evaluating AI's role—not as a trend, but as a strategic necessity.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          <StatPill value="4.8M" label="Unfilled cyber roles globally (2025)" color={C.pink} />
          <StatPill value="87%" label="Organizations breached in 2024" color={C.gold} />
          <StatPill value="$1.76M" label="Extra breach cost per skills-gap org" color={C.pink} />
        </div>
        <InfoBox icon="⚠️" title="Pressure 1: Evolving Threat Landscape" color={C.pink}>
          74% of security professionals call the current threat landscape the most challenging in five years. 
          Attackers now use AI to generate polymorphic malware that rewrites its own signature, deepfake audio/video 
          for executive impersonation, and automated lateral movement tools. Traditional curriculum review cycles 
          (typically 18–24 months) cannot keep pace with threat evolution measured in weeks.
        </InfoBox>
        <InfoBox icon="🔓" title="Pressure 2: The Critical Skills Gap" color={C.gold}>
          4.8 million unfilled cybersecurity roles globally with 59% of security teams reporting critical or 
          significant skills needs. Alarmingly, 31% of security teams have <em>zero</em> entry-level professionals—
          meaning the pipeline itself is broken, not just individual organizations. This isn't a hiring problem; 
          it's a training throughput problem.
        </InfoBox>
        <InfoBox icon="📈" title="Pressure 3: Scalable Training Imperative" color={C.teal}>
          25% of organizations lack time or resources to train staff even when they recognize the need. 
          The traditional model—expert instructor, small cohort, intensive lab time—is economically and 
          physically impossible to scale to 4.8 million positions. A fundamentally different training 
          architecture is required.
        </InfoBox>
        <SectionLabel>EXAMPLE: THE COMPOUNDING EFFECT</SectionLabel>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, color: C.sub, fontSize: 13, lineHeight: 1.8 }}>
          <strong style={{ color: C.text }}>Case study illustration:</strong> A mid-size financial institution (500-person IT team) 
          has a 20% cybersecurity skills gap (100 positions understaffed or undertrained). According to the $1.76M premium, 
          they carry approximately $176M in additional breach cost exposure. A state university cybersecurity program produces 
          40 graduates per year. At that throughput, closing the industry's gap would take 120 years using current training models. 
          This is the mathematical case for AI-augmented education.
        </div>
      </div>
    ),
    activity: () => <Module0Activity />,
  },
  // MODULE 1
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          AI represents more than an incremental improvement to cybersecurity education—it's a structural shift in what's 
          possible. Four distinct pillars each address a different dimension of the training challenge.
        </div>
        <InfoBox icon="📝" title="Pillar 1: Content Generation" color={C.teal}>
          AI can produce lecture materials, case studies, quizzes, and assessments at unprecedented scale. 
          A faculty member can generate five differentiated versions of a network defense assignment—calibrated 
          to different skill levels—in the time it previously took to write one. 
          <br /><br />
          <strong style={{ color: C.text }}>Example:</strong> Prompt: "Generate a scenario-based case study on SQL injection 
          for students who understand basic web architecture but have no prior security exposure. Include realistic 
          log snippets, three discussion questions, and a remediation task." GPT-class models can produce this in seconds; 
          faculty validation takes minutes, not hours.
        </InfoBox>
        <InfoBox icon="🧠" title="Pillar 2: Adaptive Tutoring" color={C.purple}>
          Personalized learning paths that adjust to individual knowledge gaps and learning styles. Unlike static 
          course materials, AI tutors can explain concepts in multiple ways—analogical, technical, procedural—until 
          the student achieves genuine mastery.
          <br /><br />
          <strong style={{ color: C.text }}>Example:</strong> A student struggles with public key cryptography. 
          The AI tutor first tries a mathematical explanation (RSA key generation). Student still confused. 
          The tutor pivots to a safe-deposit box analogy. Still unclear. It tries a color-mixing analogy (Diffie-Hellman). 
          Student has a breakthrough. This multi-modal explanation would require an expert tutor; AI makes it available 24/7 to every student.
        </InfoBox>
        <InfoBox icon="🎮" title="Pillar 3: Simulation & Labs" color={C.pink}>
          AI-powered cyber ranges generate realistic threat scenarios—polymorphic malware, deepfake phishing campaigns, 
          AI-assisted lateral movement—all in safe, isolated environments. Students can fail, learn, and retry without real consequences.
          <br /><br />
          <strong style={{ color: C.text }}>Example:</strong> Cloud Range's AI-aware cyber range trains SOC teams against 
          polymorphic threats that change their behavior based on defender responses—mirroring how sophisticated real-world 
          adversaries adapt. Traditional static scenarios can't prepare defenders for this dynamic reality.
        </InfoBox>
        <InfoBox icon="📊" title="Pillar 4: Assessment Automation" color={C.gold}>
          Real-time formative feedback, skills diagnostics, and progression mapping enable continuous competency tracking 
          that was previously impossible at scale. Automated grading with rubric-assist frees faculty for high-value mentorship.
          <br /><br />
          <strong style={{ color: C.text }}>Example:</strong> After each lab module, the system automatically identifies 
          which NICE Framework competency categories each student has demonstrated, which are still developing, and recommends 
          the next activity. Faculty see a dashboard view of 80 students' progression in real time—impossible without automation.
        </InfoBox>
        <div style={{ background: C.teal + "10", border: `1px solid ${C.teal}30`, borderRadius: 10, padding: 14, color: C.sub, fontSize: 13, lineHeight: 1.7, marginTop: 16 }}>
          <strong style={{ color: C.teal }}>The Framing Question:</strong> "Can AI improve cybersecurity education without 
          weakening critical thinking, ethics, and trust?" The answer depends not on the technology itself, 
          but on the operating model—how deliberately institutions design the human-AI collaboration.
        </div>
      </div>
    ),
    activity: () => <Module1Activity />,
  },
  // MODULE 2
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          Moving from strategic pillars to operational implementation, high-value use cases fall into four domains 
          that span the full educational workflow from faculty preparation to student assessment.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          {[
            { letter: "A", title: "Teaching Support", items: ["Lecture materials, quizzes, case studies at scale", "Cryptography and secure coding concept simplification", "Multiple assignment versions for differentiated instruction"], color: C.teal },
            { letter: "B", title: "Student Learning Support", items: ["AI tutors for foundational topics (24/7 availability)", "Debugging support for secure programming exercises", "CTF-style lab walkthroughs with guided hints"], color: C.purple },
            { letter: "C", title: "Practical Training", items: ["SOC workflow simulations with phishing/IR scenarios", "Synthetic datasets where real data is too sensitive", "Red/Blue team AI-assisted attack and defense exercises"], color: C.pink },
            { letter: "D", title: "Assessment & Feedback", items: ["Real-time formative assessment and lab guidance", "Skills diagnostics and competency progression mapping", "Rubric-assisted grading of lab reports and reflections"], color: C.gold },
          ].map(domain => (
            <div key={domain.letter} style={{ background: C.card, border: `1px solid ${domain.color}25`, borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: domain.color + "20",
                  border: `1px solid ${domain.color}40`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: domain.color, fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
                }}>
                  {domain.letter}
                </div>
                <strong style={{ color: domain.color, fontSize: 13 }}>{domain.title}</strong>
              </div>
              {domain.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: domain.color, fontSize: 10, marginTop: 4 }}>▸</span>
                  <span style={{ color: C.sub, fontSize: 12.5, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <SectionLabel>REAL-WORLD IMPLEMENTATIONS</SectionLabel>
        <InfoBox icon="🏫" title="SENSAI Tutoring System" color={C.cyan}>
          SENSAI demonstrates AI-powered tutoring deployed in ABET-accredited cybersecurity programs at scale. 
          ABET accreditation requires demonstrating that students achieve specific learning outcomes—SENSAI shows 
          that AI tutoring can support, not undermine, this rigorous standard. Key insight: ABET compliance 
          requires outcomes measurement, and AI systems that track competency progression can actually strengthen the evidence base.
        </InfoBox>
        <InfoBox icon="☁️" title="Cloud Range AI-Aware Simulations" color={C.purple}>
          Cloud Range's cyber range trains SOC teams against AI-generated threats that adapt in real time. 
          The system generates scenarios that evolve based on defender actions—if a student isolates an 
          infected host, the simulated attacker pivots to a different vector. This dynamic response 
          mirrors real adversarial behavior far better than scripted scenarios.
        </InfoBox>
      </div>
    ),
    activity: () => <Module2Activity />,
  },
  // MODULE 3
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          Three concrete scenarios ground the abstract concepts in real educational challenges. 
          Each follows the same analytical structure: Problem → AI Approach → Educational Gain → Risk/Caveat.
        </div>
        {[
          {
            n: "01", title: "AI-Generated SOC Incident Scenario", color: C.cyan,
            problem: "Students need realistic IR practice with authentic SIEM alerts, firewall logs, and malware analysis—but real production incident data cannot be shared.",
            approach: "Generate synthetic multi-stage attack scenarios with realistic IOCs, log patterns, and network traffic using generative AI. Deploy in isolated lab. Scenarios include a spear-phishing initial access → lateral movement → data exfiltration chain.",
            gain: "Hands-on analysis without production risk; exposure to diverse attack vectors; repeatable practice cycles; instructor visibility into student decision trees.",
            caveat: "AI-generated IOCs may not perfectly match real attacker TTPs. Scenarios require faculty SME validation before student exposure. Teach students to recognize this limitation.",
          },
          {
            n: "02", title: "AI Tutor for Firewall Misconfiguration", color: C.gold,
            problem: "Students struggle with iptables syntax, chain evaluation order, and connectivity debugging. One faculty member cannot provide meaningful 1-on-1 guidance to 80 students simultaneously.",
            approach: "AI tutor with firewall knowledge provides interactive debugging via Socratic questioning—nudging students toward the correct diagnosis rather than stating it. Tutor tracks whether students found the answer independently or required multiple hints.",
            gain: "Faster skill acquisition; 24/7 immediate feedback; personalized pacing; reduced frustration barrier for beginners. Faculty freed for conceptual mentorship.",
            caveat: "Graduated release principle required: more scaffolding for novices, deliberately less for advanced students. Dependency tracking essential—measure independent solve rate.",
          },
          {
            n: "03", title: "AI-Assisted Secure Code Review", color: C.pink,
            problem: "60-student class each submits 200 lines of Python. Manual faculty review of 12,000 lines per cycle takes 3+ weeks—eliminating the rapid feedback loop that actually builds secure coding skills.",
            approach: "Automated scanner identifies vulnerability classes (injection, hardcoded credentials, insecure deserialization, missing input validation) with line-level explanations. Faculty reviews high-severity flags and edge cases. All final grades require human sign-off.",
            gain: "Consistent, sub-24-hour feedback; immediate vulnerability identification; frees faculty for high-complexity cases and mentoring advanced students.",
            caveat: "Mandatory human verification for false positives/negatives. Understanding AI tool limitations is itself a learning objective—prepare students to critically evaluate automated security tools.",
          },
        ].map(sc => (
          <div key={sc.n} style={{ background: C.card, border: `1px solid ${sc.color}20`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ color: sc.color, fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{sc.n}</div>
              <div style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>{sc.title}</div>
            </div>
            {[
              { label: "PROBLEM", content: sc.problem, color: C.pink },
              { label: "AI APPROACH", content: sc.approach, color: C.teal },
              { label: "GAIN", content: sc.gain, color: C.green },
              { label: "CAVEAT", content: sc.caveat, color: C.gold },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                <div style={{ minWidth: 80, color: row.color, fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 1, paddingTop: 2 }}>{row.label}</div>
                <div style={{ color: C.sub, fontSize: 13, lineHeight: 1.65 }}>{row.content}</div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.sub, fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: C.text }}>Common Pattern:</strong> Each scenario demonstrates AI as a force multiplier—
          amplifying human capability rather than replacing human judgment. The operating model (how you design the human-AI 
          collaboration) matters more than the AI tool itself.
        </div>
      </div>
    ),
    activity: () => <Module3Activity />,
  },
  // MODULE 4
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          AI's benefits in cybersecurity education come with serious ethical risks that require institutional attention 
          before deployment. Ignoring these risks doesn't eliminate them—it shifts liability onto institutions and harms students.
        </div>
        {[
          { icon: "📝", title: "A. Academic Integrity", color: C.pink,
            content: "Students submitting AI-generated work as their own is the most immediately visible risk—but the deeper problem is competence verification. Even if we detect AI-generated submissions, the question becomes: does the student actually understand the material? In cybersecurity, a practitioner who can't perform skills without AI assistance is a liability. Institutional response: redesign assessments toward oral defense, live labs, and observed performance." },
          { icon: "🌀", title: "B. Accuracy & Hallucination", color: C.gold,
            content: "AI systems confidently generate incorrect technical information—fabricated CVE identifiers, non-existent exploit PoCs, incorrect remediation procedures. In most fields this is embarrassing; in cybersecurity it's dangerous. A student who acts on hallucinated guidance during an actual incident has been actively harmed by AI. All AI outputs require domain expert validation before educational deployment—no exceptions." },
          { icon: "⚔️", title: "C. Security & Dual-Use Risk", color: C.red,
            content: "Educational cybersecurity tools inherently involve attack techniques, vulnerability analysis, and exploit discussion. These same tools can generate harmful code, explain attack methodologies in operational detail, or be repurposed for unauthorized offensive activity. Institutions need technical controls (sandboxing, usage monitoring) and policy controls (acceptable use, consequence frameworks) before deployment." },
          { icon: "⚖️", title: "D. Bias & Fairness", color: C.purple,
            content: "AI systems trained on historical cybersecurity data may reflect inequities in who was historically represented in the field. This affects who the AI 'relates to,' which examples it surfaces, which learning styles it accommodates, and which institutions can afford quality tools. Unequal access to high-quality AI tools across institutions risks widening the gap between well-resourced and under-resourced cybersecurity programs." },
          { icon: "🔒", title: "E. Privacy & Governance", color: C.cyan,
            content: "FERPA compliance requires that student educational records be protected—student interaction logs, performance data, and learning analytics cannot be freely shared with third-party AI vendors. Institutions need data processing agreements, privacy impact assessments, and clear policies on what student data AI systems can access and retain." },
        ].map(risk => (
          <InfoBox key={risk.title} icon={risk.icon} title={risk.title} color={risk.color}>{risk.content}</InfoBox>
        ))}
        <div style={{ background: C.pink + "10", border: `1px solid ${C.pink}30`, borderRadius: 10, padding: 14, marginTop: 8 }}>
          <strong style={{ color: C.pink }}>Key Message:</strong>
          <span style={{ color: C.sub, fontSize: 13, lineHeight: 1.7 }}>
            {" "}The operating model matters more than the tool. Institutions must establish governance frameworks, 
            validation processes, and ethical guidelines <em>before</em> deploying AI in cybersecurity education—not after 
            the first incident forces reactive policy.
          </span>
        </div>
      </div>
    ),
    activity: () => <Module4Activity />,
  },
  // MODULE 5
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          The Responsible Adoption Framework structures governance around three pillars—Access, Accountability, and Assurance—
          supported by specific institutional mechanisms and drawing from models deployed at leading institutions.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { pillar: "ACCESS", desc: "Equitable, practical tool availability", items: ["Approved tools list", "Equitable distribution across student demographics", "Data handling standards"], color: C.teal },
            { pillar: "ACCOUNTABILITY", desc: "Transparent use and authorship", items: ["Clear AI use policies for students AND faculty", "Disclosure requirements", "Consequence frameworks for violations"], color: C.purple },
            { pillar: "ASSURANCE", desc: "Validation and quality checks", items: ["Verification-first practice", "Human-in-the-loop model", "Assessment redesign for AI-era integrity"], color: C.gold },
          ].map(p => (
            <div key={p.pillar} style={{ background: p.color + "10", border: `1px solid ${p.color}25`, borderRadius: 10, padding: 14 }}>
              <div style={{ color: p.color, fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{p.pillar}</div>
              <div style={{ color: C.sub, fontSize: 12, marginBottom: 10 }}>{p.desc}</div>
              {p.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                  <span style={{ color: p.color, fontSize: 10, marginTop: 3 }}>▸</span>
                  <span style={{ color: C.sub, fontSize: 12 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <InfoBox icon="👥" title="Human-in-the-Loop Model" color={C.teal}>
          Faculty remain central to instruction, using AI as a tool rather than replacement. All AI outputs require 
          expert validation before student exposure. This isn't distrust of AI—it's recognition that AI operates 
          as a domain tool, and the educator provides the pedagogical context that makes that tool safe and effective.
          <br /><br />
          <strong style={{ color: C.text }}>Implementation:</strong> Create a validation protocol—before any AI-generated 
          content is used with students, it goes through a structured review: factual accuracy check, pedagogical 
          appropriateness check, bias/equity check. Document this review for accreditation purposes.
        </InfoBox>
        <SectionLabel>LEADING MODELS</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { inst: "UNC System", model: "Dual responsibility model with mandatory syllabus policies", color: C.teal },
            { inst: "Penn State AI Hub", model: "Risk assessment and approved tool vetting process", color: C.purple },
            { inst: "ETHICAL Framework", model: "Seven-pillar model for higher education AI governance", color: C.gold },
          ].map(m => (
            <div key={m.inst} style={{ background: C.card, border: `1px solid ${m.color}20`, borderRadius: 8, padding: 12 }}>
              <div style={{ color: m.color, fontSize: 12, fontWeight: 700, marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>{m.inst}</div>
              <div style={{ color: C.sub, fontSize: 12, lineHeight: 1.6 }}>{m.model}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    activity: () => <Module5Activity />,
  },
  // MODULE 6
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          AI doesn't just change how cybersecurity is taught—it changes what needs to be taught, 
          what faculty do, and how learning progress is measured. Understanding this transformation 
          helps institutions make decisions that build lasting competitive advantage.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
            <Tag color={C.pink}>FROM</Tag>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Knowledge recall and memorization", "Executing scripted procedures", "Static threat report reading", "Seat-time as progress metric"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, color: C.dim, fontSize: 13 }}>
                  <span>×</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.teal}20`, borderRadius: 10, padding: 14 }}>
            <Tag color={C.teal}>TO</Tag>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Critical evaluation of AI-generated information", "Designing novel scenarios AI hasn't encountered", "Interrogating AI threat intel for bias/gaps", "Demonstrated mastery-based progression"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, color: C.teal, fontSize: 13 }}>
                  <span>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <InfoBox icon="🎓" title="Faculty Role Evolution" color={C.teal}>
          Faculty shift from content delivery to three higher-value functions:
          (1) <strong style={{ color: C.text }}>Learning Experience Design</strong>—architecting the conditions under which students develop judgment, not just knowledge.
          (2) <strong style={{ color: C.text }}>AI Output Validation</strong>—serving as the domain expert who catches hallucinations and bias before students are exposed.
          (3) <strong style={{ color: C.text }}>High-Value Mentorship</strong>—the human relationship, career guidance, and professional socialization that AI cannot replicate.
        </InfoBox>
        <InfoBox icon="🌐" title="Adaptive Learning Environments" color={C.purple}>
          Next-generation cyber ranges adapt in real time to learner performance—increasing scenario complexity 
          when students demonstrate mastery, introducing edge cases when foundational competencies are confirmed. 
          This mirrors how expert practitioners develop: through progressively challenging, personalized experiences, 
          not uniform curricula.
        </InfoBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
          <StatPill value="80%" label="Professionals say AI makes teams more effective" color={C.teal} />
          <StatPill value="94%" label="Leaders willing to fund AI/ML certifications" color={C.gold} />
          <StatPill value="43%" label="Rate AI/ML skills as currently low in their teams" color={C.pink} />
        </div>
      </div>
    ),
    activity: () => <Module6Activity />,
  },
  // MODULE 7
  {
    overview: () => (
      <div>
        <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
          Six actionable strategies provide a roadmap for institutions ready to move from principles to implementation. 
          These are sequenced deliberately—each creates the foundation for the next.
        </div>
        {[
          { n: "01", title: "Start with Pilots", color: C.teal,
            content: "Begin with low-risk, high-impact pilots in specific courses before institution-wide deployment. Test AI tools in controlled environments to understand limitations and refine approaches.",
            example: "Deploy AI tutoring in one foundational course (e.g., Intro to Network Security) with robust assessment instrumentation. Measure impact on learning outcomes, academic integrity incidents, and faculty workload before expanding." },
          { n: "02", title: "Build AI Governance", color: C.purple,
            content: "Establish cross-functional AI ethics boards with faculty, IT, legal, and student representation. Include risk assessment processes and approved tool vetting procedures.",
            example: "Align governance with NIST AI Risk Management Framework and EU AI Act. Create a tiered approval process: low-risk tools (tutoring, content generation) vs. high-risk tools (assessment automation, student data processing)." },
          { n: "03", title: "Align Curriculum", color: C.gold,
            content: "Integrate both cybersecurity skills and AI literacy into curriculum. Students need to understand AI capabilities, limitations, and ethical implications as professional competencies.",
            example: "Consider dedicated AI ethics modules within cybersecurity programs. Students should graduate able to: critically evaluate AI security tools, identify hallucination risks, understand dual-use implications." },
          { n: "04", title: "Redesign Assessments", color: C.pink,
            content: "Move toward authentic evaluation: oral defense, live labs, reflective tasks, and process-based assessment that AI cannot easily replicate.",
            example: "Replace written lab reports with 10-minute oral debriefs where students explain their incident response decisions. Live, observed performance on novel scenarios becomes the gold standard." },
          { n: "05", title: "Invest in Faculty", color: C.cyan,
            content: "Provide structured AI literacy training beyond technical skills to include ethical reflection, pedagogical integration, and critical evaluation capabilities.",
            example: "Create faculty learning communities for ongoing peer support. Pair technically strong faculty with pedagogically experienced colleagues for AI integration design sprints." },
          { n: "06", title: "Measure Outcomes", color: C.green,
            content: "Track learning quality, integrity metrics, inclusion indicators, and operational efficiency. Use data to continuously refine AI integration strategies.",
            example: "Establish baseline metrics BEFORE AI implementation for meaningful comparison. Track: competency attainment rates, time-to-proficiency, AI policy violation rates, faculty satisfaction, and equity metrics across student demographics." },
        ].map(rec => (
          <div key={rec.n} style={{ display: "flex", gap: 14, background: C.card, border: `1px solid ${rec.color}15`, borderRadius: 12, padding: 14, marginBottom: 10 }}>
            <div style={{ color: rec.color, fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 800, lineHeight: 1, minWidth: 40 }}>{rec.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: rec.color, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{rec.title}</div>
              <div style={{ color: C.sub, fontSize: 13, lineHeight: 1.65, marginBottom: 8 }}>{rec.content}</div>
              <div style={{ color: C.dim, fontSize: 12, lineHeight: 1.6, borderLeft: `2px solid ${rec.color}30`, paddingLeft: 10 }}>
                <span style={{ color: rec.color, fontFamily: "'Space Mono', monospace", fontSize: 10 }}>EXAMPLE › </span>
                {rec.example}
              </div>
            </div>
          </div>
        ))}
        <SectionLabel>LEADING EXAMPLES</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { inst: "Univ. of Helsinki", detail: "Elements of AI: 500K+ learners worldwide—the benchmark for scalable AI literacy education", color: C.teal },
            { inst: "Carnegie Mellon", detail: "AI Maker Spaces for co-designing AI ethics policies with students as partners", color: C.purple },
            { inst: "Stanford University", detail: "AI Playground for safe experimentation with emerging models before curricular deployment", color: C.gold },
          ].map(m => (
            <div key={m.inst} style={{ background: C.card, border: `1px solid ${m.color}20`, borderRadius: 8, padding: 12 }}>
              <div style={{ color: m.color, fontSize: 12, fontWeight: 700, marginBottom: 6, fontFamily: "'Space Mono', monospace" }}>{m.inst}</div>
              <div style={{ color: C.sub, fontSize: 12, lineHeight: 1.6 }}>{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    activity: () => <Module7Activity />,
  },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */

export default function WiCySTutorial() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState("learn");
  const [completed, setCompleted] = useState(new Set());

  const mod = MODULES[activeModule];
  const content = MODULE_CONTENT[activeModule];

  const handleModuleChange = (id) => {
    setCompleted(c => new Set([...c, activeModule]));
    setActiveModule(id);
    setActiveTab("learn");
  };

  const progress = (completed.size / MODULES.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.surface}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        button { transition: all 0.15s; }
        button:hover { opacity: 0.85; }
      `}</style>

      {/* HEADER */}
      <div style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: "0 24px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* WiCyS Logo */}
            <div style={{
              background: `linear-gradient(135deg, ${C.wicys1}, ${C.wicys2})`,
              borderRadius: 8, padding: "6px 12px",
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14,
              letterSpacing: 1, color: "#fff",
            }}>
              WiCyS
            </div>
            <div style={{ width: 1, height: 28, background: C.border }} />
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1.2 }}>
                AI Security Accelerator Program
              </div>
              <div style={{ color: C.dim, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
                AI in Cybersecurity Education · Tutorial Track
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ color: C.dim, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
              PROGRESS
            </div>
            <div style={{ width: 120, height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.purple})`, borderRadius: 2, transition: "width 0.4s" }} />
            </div>
            <div style={{ color: C.teal, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
              {completed.size}/{MODULES.length}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0, minHeight: "calc(100vh - 60px)" }}>

        {/* SIDEBAR */}
        <div style={{
          width: 240, minWidth: 240,
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          padding: "20px 0",
          position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto",
        }}>
          <div style={{ padding: "0 16px 12px", color: C.dim, fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>
            MODULES
          </div>
          {MODULES.map((m) => {
            const isActive = m.id === activeModule;
            const isDone = completed.has(m.id) && !isActive;
            return (
              <button
                key={m.id}
                onClick={() => handleModuleChange(m.id)}
                style={{
                  width: "100%", textAlign: "left",
                  background: isActive ? m.color + "12" : "transparent",
                  borderLeft: `3px solid ${isActive ? m.color : "transparent"}`,
                  border: "none",
                  padding: "10px 16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ fontSize: 16, opacity: isActive ? 1 : 0.7 }}>{m.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12.5, fontWeight: isActive ? 600 : 400,
                    color: isActive ? m.color : isDone ? C.sub : C.dim,
                    lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {m.title}
                  </div>
                  <div style={{ fontSize: 10, color: C.dim, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {m.subtitle}
                  </div>
                </div>
                {isDone && <span style={{ color: C.green, fontSize: 12 }}>✓</span>}
              </button>
            );
          })}
          <div style={{ padding: "20px 16px 0", borderTop: `1px solid ${C.border}`, marginTop: 12 }}>
            <div style={{ color: C.dim, fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 8 }}>ABOUT</div>
            <div style={{ color: C.dim, fontSize: 11, lineHeight: 1.7 }}>
              WiCyS AI Security Accelerator Program<br />
              <span style={{ color: C.teal }}>Women in Cybersecurity</span><br /><br />
              60–90 min tutorial<br />
              Faculty, Trainers & Academic Leaders
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", maxHeight: "calc(100vh - 60px)" }}>

          {/* Module Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 32 }}>{mod.icon}</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Tag color={mod.color}>{`MODULE ${String(mod.id + 1).padStart(2, "0")}`}</Tag>
                  <Tag color={C.wicys2}>WiCyS AI ACCELERATOR</Tag>
                </div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: C.text, margin: 0, lineHeight: 1.2 }}>
                  {mod.title}
                </h1>
                <div style={{ color: C.dim, fontSize: 13, marginTop: 4 }}>{mod.subtitle}</div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 4, width: "fit-content" }}>
              {[
                { id: "learn", label: "📖 Lecture & Examples" },
                { id: "activity", label: "⚡ Tutorial Activity" },
                { id: "quiz", label: "🎯 Knowledge Check" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? mod.color + "20" : "transparent",
                    border: `1px solid ${activeTab === tab.id ? mod.color + "50" : "transparent"}`,
                    borderRadius: 7, padding: "7px 16px",
                    color: activeTab === tab.id ? mod.color : C.dim,
                    fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "learn" && content.overview()}
            {activeTab === "activity" && content.activity()}
            {activeTab === "quiz" && (
              <div>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
                  <div style={{ color: mod.color, fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 6 }}>
                    🎯 KNOWLEDGE CHECK — {mod.title.toUpperCase()}
                  </div>
                  <div style={{ color: C.sub, fontSize: 13, lineHeight: 1.6 }}>
                    Three questions to test your understanding of this module. Click an option to submit; 
                    the correct answer and explanation will reveal immediately. Aim for 3/3 before moving on.
                  </div>
                </div>
                <Quiz questions={QUIZZES[activeModule]} />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
            <button
              onClick={() => activeModule > 0 && handleModuleChange(activeModule - 1)}
              style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
                padding: "10px 20px", color: activeModule > 0 ? C.sub : C.dim,
                fontSize: 13, cursor: activeModule > 0 ? "pointer" : "default",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              ← {activeModule > 0 ? MODULES[activeModule - 1].title : "Start"}
            </button>
            <button
              onClick={() => activeModule < MODULES.length - 1 && handleModuleChange(activeModule + 1)}
              style={{
                background: activeModule < MODULES.length - 1 ? mod.color + "20" : C.surface,
                border: `1px solid ${activeModule < MODULES.length - 1 ? mod.color + "50" : C.border}`,
                borderRadius: 8, padding: "10px 20px",
                color: activeModule < MODULES.length - 1 ? mod.color : C.dim,
                fontSize: 13, cursor: activeModule < MODULES.length - 1 ? "pointer" : "default",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              {activeModule < MODULES.length - 1 ? MODULES[activeModule + 1].title : "Complete"} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
