export const SITE = {
  name: "Vishvrajsinh Solanki",
  shortName: "VS",
  title: "Vishvrajsinh Solanki | ML & AI Engineering Intern · Fintech Systems",
  description:
    "Second-year AI & Data Science student shipping ML systems, RAG products, and autonomous hardware. Fintech focus via ARC. Based in Gujarat. Open to internships.",
  email: "vishvrajsolanki0207@gmail.com",
  location: "Based in Gujarat, India — Available globally",
  resumeUrl:
    "https://drive.google.com/file/d/1vH0gETTidsGGQk5npUYWETKgLSawnOBz/view?usp=sharing",
  lorUrl: "[LOR_LINK_PLACEHOLDER]",
  linkedin: "https://www.linkedin.com/in/vishvrajsinh-solanki-1396ab37a/",
  github: "https://github.com/vishvrajsolanki-dev",
  instagram: "https://instagram.com/vishvrajsinh_solanki",
  eyebrow: "ML / AI Engineering Intern · Fintech Systems",
  tagline: "Building intelligent systems, from ML pipelines to autonomous hardware.",
  support:
    "Evaluation-aware ML, shipped apps, and systems that hold up outside the notebook.",
  metrics: [
    { value: "2+1", label: "2 ML · 1 AI Internships" },
    { value: "99.52%", label: "MNIST · LetterLens" },
    { value: "SSIP", label: "Uni round in progress" },
  ],
} as const;

export const ABOUT_COPY = [
  "I build systems that turn uncertainty into something you can actually act on. That started with AI and data science, but it never stayed in notebooks. I care about the full path from data in to behavior out, whether that's a model in production or a robot that has to navigate the real world.",
  "On one side, I'm deep in ML engineering: pipelines, evaluation, explainability, and shipping apps people can use. On the other, I lead Artificial Alliance on TrackBot, an autonomous system we've taken through hackathons and toward institutional funding, because I want intelligence that lives in hardware, not only on a screen.",
  "Fintech is where those instincts converge. Markets and money decisions are full of false certainty. That's why I'm building ARC, Adaptive Risk and Clarity Engine: probability-first foresight for Indian retail investors, grounded in simulation, ML, and regulated knowledge. Clarity without pretending to be advice.",
  "I'm a second-year B.Tech AI & Data Science student at ADIT, aiming for IIT MTech via GATE DA and a long-term path in senior ML / fintech. If you're here looking for someone who ships, debugs hard problems, and thinks in systems, you're in the right place.",
] as const;

export type ProjectStatus =
  | "Live"
  | "Local"
  | "Build underway"
  | "In design"
  | "Under approval"
  | "Paper in progress";

export type Project = {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  oneLiner: string;
  accentVar: string;
  stack: string[];
  problem: string;
  approach: string;
  metrics: string[];
  cover: string;
  gallery?: string[];
  github?: string;
  live?: string;
  caseStudy: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "arc",
    slug: "arc",
    index: "01",
    title: "ARC",
    subtitle: "Adaptive Risk and Clarity Engine",
    status: "Build underway",
    oneLiner:
      "Probability distributions for financial decisions. Simulation intelligence reports, not advice.",
    accentVar: "var(--project-arc)",
    stack: ["Monte Carlo", "RAG", "FastAPI", "React", "PostgreSQL"],
    problem:
      "Indian retail investors get point estimates and advice-shaped certainty. Real decisions need calibrated probability foresight.",
    approach:
      "Architecture v4 STABLE: vectorized Monte Carlo, five ML models, multi-agent RAG over RBI/SEBI/AMFI corpus. Design complete. Implementation under way.",
    metrics: ["10,000 scenarios", "Architecture complete", "D01–D26 blueprint"],
    cover: "/assets/projects/arc/cover.png",
    gallery: ["/assets/projects/arc/architecture.png"],
    caseStudy: true,
  },
  {
    id: "trackbot",
    slug: "trackbot",
    index: "02",
    title: "TrackBot AGV",
    subtitle: "ESP32 autonomous guided vehicle",
    status: "Under approval",
    oneLiner:
      "RFID-guided AGV with pathfinding, telemetry ML, and Artificial Alliance leadership.",
    accentVar: "var(--project-trackbot)",
    stack: ["ESP32-S3", "C++", "A*", "RFID", "Python", "KNN"],
    problem:
      "Warehouse navigation needs reliable autonomy with measurable deviation handling, not demo-only line following.",
    approach:
      "RFID + IMU + encoder fusion path, WebSocket dashboard, KNN surface classifier, SSIP funding path through institutional rounds.",
    metrics: ["SSIP first + dept cleared", "₹35K path", "IEEE paper in progress"],
    cover: "/assets/projects/trackbot/cover.png",
    github: "https://github.com/vishvrajsolanki-dev/trackbot",
    caseStudy: true,
  },
  {
    id: "lexis",
    slug: "lexis",
    index: "03",
    title: "Lexis",
    subtitle: "Multimodal exam intelligence",
    status: "Live",
    oneLiner:
      "PDF, handwritten notes, or text in. RAG-grounded flashcards, MCQs, and long answers out.",
    accentVar: "var(--project-lexis)",
    stack: ["RAG", "ChromaDB", "Groq", "spaCy", "Streamlit", "Docker"],
    problem: "Study tools invent content. Learners need questions grounded in their own materials.",
    approach:
      "Multimodal ingest → chunking → retrieval → generation with QA harness discipline (78/82 tests).",
    metrics: ["78/82 QA tests", "Deployed on Render"],
    cover: "/assets/projects/lexis/cover.png",
    github: "https://github.com/vishvrajsolanki-dev/lexis",
    live: "https://lexis-evx3.onrender.com",
    caseStudy: true,
  },
  {
    id: "rupeeiq",
    slug: "rupeeiq",
    index: "04",
    title: "RupeeIQ",
    subtitle: "Personal finance intelligence",
    status: "Local",
    oneLiner:
      "Finance personality profiling and crisis prediction for Indian students. Bloomberg-inspired UI.",
    accentVar: "var(--project-rupeeiq)",
    stack: ["Python", "scikit-learn", "spaCy", "Streamlit", "Plotly"],
    problem: "Student money tools rarely model personality or impending cash crises early enough.",
    approach:
      "Archetype profiling, forecasting, narrative money story, zero external AI APIs dependency for core path.",
    metrics: ["Crisis predictor", "Student-focused"],
    cover: "/assets/projects/rupeeiq/cover.png",
    github: "https://github.com/vishvrajsolanki-dev/rupeeiq",
    caseStudy: true,
  },
  {
    id: "fore",
    slug: "fore",
    index: "05",
    title: "FORE",
    subtitle: "Financial foresight engine",
    status: "Build underway",
    oneLiner: "Foresight tooling on the path toward ARC-grade decision intelligence.",
    accentVar: "var(--project-fore)",
    stack: ["TypeScript", "React", "ML"],
    problem: "Need a tangible foresight surface while ARC production systems come online.",
    approach: "Iterative foresight engine prototype under Artificial Alliance builds.",
    metrics: ["Preview in progress"],
    cover: "/assets/projects/fore/cover.png",
    github: "https://github.com/vishvrajsolanki-dev/fore-financial-foresight-engine",
    caseStudy: true,
  },
];

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  period: string;
  location?: string;
  badge?: string;
  bullets: string[];
  nested?: { title: string; detail: string; links?: { label: string; href: string }[] }[];
  lor?: boolean;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "alliance",
    role: "Team Lead",
    org: "Artificial Alliance",
    period: "~1 year · Core team of 4–5",
    badge: "Leadership",
    bullets: [
      "Lead the core team building TrackBot since day one.",
      "Multiple hackathons including CVMU and Cursor Hackathon.",
      "Selected for HackVSIT (New Delhi) and HBTM IIIT Pune (team activity).",
    ],
  },
  {
    id: "ssip",
    role: "SSIP Funded Path — TrackBot AGV",
    org: "SSIP Cell · Gujarat Government",
    period: "2024 — Present",
    badge: "Under approval",
    bullets: [
      "Cleared first round and department round on a ₹35,000 path.",
      "University round in progress.",
      "RFID-guided AGV with telemetry ML and institutional recognition trajectory.",
    ],
  },
  {
    id: "iith",
    role: "AI & Data Science Intern",
    org: "IIT Hyderabad via My Job Grow",
    period: "Feb 2026 — Apr 2026",
    location: "India (Remote)",
    badge: "LoR awarded",
    lor: true,
    bullets: [
      "End-to-end AI pipelines across supervised learning, clustering, and cloud model development.",
      "Deployed ML, deep learning, and RL workflows spanning ingestion to evaluation.",
      "Recognized with Letter of Recommendation for AI competence.",
    ],
  },
  {
    id: "codsoft",
    role: "Machine Learning Intern",
    org: "CodSoft",
    period: "May 2026",
    location: "Remote",
    badge: "ML Internship",
    bullets: [
      "Shipped three modular ML apps with preprocess → train → evaluate → serve architecture.",
    ],
    nested: [
      {
        title: "PlotSense",
        detail: "TF-IDF + Logistic Regression on 54,214 IMDB plots · 27 genres · 60.25% accuracy.",
        links: [
          { label: "Live", href: "https://codsoft-hgjtjwr3a4okoiqyowd8ut.streamlit.app/" },
          {
            label: "GitHub",
            href: "https://github.com/vishvrajsolanki-dev/CODSOFT/tree/main/Task_1_Movie_Genre_Classification",
          },
        ],
      },
      {
        title: "Credit Card Fraud Detection",
        detail: "1.29M transactions · SMOTE · XGBoost ROC-AUC 0.9771 · 88% fraud recall.",
      },
      {
        title: "Bank Customer Churn",
        detail: "GradientBoosting · ROC-AUC 0.87 · Accuracy 86.45%.",
      },
    ],
  },
  {
    id: "codealpha",
    role: "Machine Learning Intern",
    org: "CodeAlpha",
    period: "Jun 2026",
    location: "Remote",
    badge: "ML Internship",
    bullets: [
      "Shipped explainable ML apps with SHAP and cold-start Streamlit pipelines.",
    ],
    nested: [
      {
        title: "LetterLens",
        detail:
          "MNIST digit CNN 99.52% after EMNIST pivot (cursive vs print mismatch). Not deployed yet. Diagnostic story over commodity accuracy.",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/vishvrajsolanki-dev/CodeAlpha_HandwrittenCharacterRecognition",
          },
        ],
      },
      {
        title: "Heart Disease Predictor",
        detail: "4-model comparative pipeline · best RF ROC-AUC 0.9637.",
        links: [
          {
            label: "Live",
            href: "https://codealphaheartdiseaseprediction-ypddp926uffnkst6sagsnr.streamlit.app/",
          },
        ],
      },
      {
        title: "Credit Scoring + SHAP",
        detail: "German Credit · Random Forest AUC 0.758 · human-readable SHAP labels.",
        links: [
          {
            label: "Live",
            href: "https://codealphacreditscoringmodel-vbbirvx3mupqfimvpsnk4x.streamlit.app/",
          },
        ],
      },
    ],
  },
];

export const SKILL_DOMAINS = [
  {
    id: "ml",
    label: "ML Engineering",
    tools: ["PyTorch", "XGBoost", "scikit-learn", "SHAP", "SMOTE", "TensorFlow", "Keras", "joblib"],
  },
  {
    id: "fintech",
    label: "Fintech / Decision Intel",
    tools: ["Monte Carlo", "Fraud ML", "Risk metrics", "Explainability", "ARC", "RupeeIQ", "FORE"],
  },
  {
    id: "rag",
    label: "NLP & RAG",
    tools: ["RAG", "ChromaDB", "LangChain", "Groq", "spaCy", "TF-IDF", "NLTK", "Prompting"],
  },
  {
    id: "embedded",
    label: "Embedded & Systems",
    tools: ["ESP32", "C++", "FreeRTOS", "RFID", "IMU", "A*", "WebSocket", "Docker"],
  },
] as const;

export const EDUCATION = {
  degree: "B.Tech — AI & Data Science",
  school: "A D Patel Institute of Technology",
  university: "CVM University · Anand, Gujarat",
  years: "2025 — 2029",
  gpa: "GPA 7.2 (first year)",
  aim: "Targeting IIT MTech via GATE DA",
} as const;

export const ASSETS = {
  headshot: "/assets/about/headshot.jpg",
} as const;

export const TIMELINE = [
  { year: "2024", title: "SPEC Innovation Award", caption: "AIKYAM 1.0 national techfest recognition.", image: "/assets/timeline/01.svg" },
  { year: "2024", title: "Chatkaro 2nd Place", caption: "Model presentation, Charotar Education Society.", image: "/assets/timeline/02.svg" },
  { year: "2025", title: "B.Tech begins", caption: "AI & Data Science at ADIT, CVM University.", image: "/assets/timeline/03.svg" },
  { year: "2025", title: "Artificial Alliance", caption: "Core team forms around TrackBot. Team Lead path begins.", image: "/assets/timeline/04.svg" },
  { year: "2026", title: "CVM Hackathon Finalist", caption: "TrackBot AGV reaches finals.", image: "/assets/timeline/05.svg" },
  { year: "2026", title: "AI Intern · IIT-H path", caption: "My Job Grow × IIT Hyderabad. LoR awarded.", image: "/assets/timeline/06.svg" },
  { year: "2026", title: "ML Internships", caption: "CodSoft and CodeAlpha systems shipped.", image: "/assets/timeline/07.svg" },
  { year: "2026", title: "SSIP rounds", caption: "First and department rounds cleared. University round underway.", image: "/assets/timeline/08.svg" },
  { year: "2026", title: "ARC blueprint", caption: "D26 architecture complete. Build phase begins.", image: "/assets/timeline/09.svg" },
  { year: "2026", title: "IEEE in progress", caption: "TrackBot paper ready on author side. Process ongoing.", image: "/assets/timeline/10.svg" },
] as const;

export const CERTIFICATIONS = [
  {
    issuer: "Anthropic Academy",
    count: 4,
    items: [
      { title: "Claude 101", date: "Jun 2026", href: "https://verify.skilljar.com/c/6szg665kh7a6" },
      { title: "Claude Code 101", date: "Jun 2026", href: "https://verify.skilljar.com/c/vpp4pc9vvj8x" },
      {
        title: "Introduction to Model Context Protocol",
        date: "Jun 2026",
        href: "https://verify.skilljar.com/c/5khygb3xbu3j",
      },
      {
        title: "Model Context Protocol: Advanced Topics",
        date: "Jun 2026",
        href: "https://verify.skilljar.com/c/q99jeipycn3f",
      },
    ],
  },
  {
    issuer: "Google Cloud",
    count: 1,
    items: [
      {
        title: "Introduction to Large Language Models",
        date: "Jun 2026",
        href: "https://simpli-web.app.link/e/fyTnSuhRV3b",
      },
    ],
  },
  {
    issuer: "Microsoft",
    count: 1,
    items: [
      { title: "Data Analyst 101", date: "Jun 2026", href: "https://simpli-web.app.link/e/05ryeInRV3b" },
    ],
  },
  {
    issuer: "IIT Hyderabad × My Job Grow",
    count: 1,
    items: [
      {
        title: "AI Upskilling & Internship Completion",
        date: "Apr 2026",
        href: "https://drive.google.com/file/d/1TOmQwsgZIQgY43x3p8x_hA3RaTk6fgdr/view?usp=sharing",
      },
    ],
  },
] as const;
