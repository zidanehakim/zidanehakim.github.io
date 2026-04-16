// Typewriter strings for hero
export const displayTexts = ["Software Engineer", "College Student"];

// Timeline entries
export const timeline = [
  {
    type: "Job",
    time: "2024-Present",
    title: "Software Engineer Internship",
    sub: "IsCoolLab",
    description:
      "Automated testing pipelines with CI/CD, Playwright E2E, and pytest. Built Trackaholic (Next.js/Node.js) for license management. Integrated test observability with MinIO, InfluxDB, and Grafana. Automated daily HR reporting via Slack.",
  },
  {
    type: "Job",
    time: "2024",
    title: "Software Engineer Internship",
    sub: "Instill AI",
    description:
      "Integrated Vector Database nodes (Weaviate, Qdrant, Milvus, Pinecone, Zilliz) into low-code AI pipeline builder for semantic search capabilities.",
  },
  {
    type: "Education",
    time: "2022-Present",
    title: "National Taiwan University",
    sub: "Civil Engineering",
    description:
      "Studying civil engineering and structural analysis with focus on building durability and mechanical theory. Also self-studying software engineering and computer science topics while also taking some CS courses in university.",
  },
  {
    type: "Award",
    time: "2022-Present",
    title: "Beasiswa Indonesia Maju (BIM) Awardee",
    sub: "Ministry of Education, Culture, Research, and Technology",
    description:
      "Awarded scholarship after placing as finalist in National Indonesian Informatics Olympiad 2021.",
  },
  {
    type: "Award",
    time: "2021",
    title: "National Informatics Olympiad Finalist",
    sub: "Gold Medal in Provincial Round",
    description:
      "Represented Bengkulu province after winning gold at provincial level.",
  },
  {
    type: "Education",
    time: "2019-2022",
    title: "SMA Negeri 4 Rejang Lebong",
    sub: "Senior High School",
    description: "Self-taught programming during high school.",
  },
];

// Tech skill slugs (match filenames in /public/*.svg)
export const languages = [
  "go",
  "typescript",
  "javascript",
  "python",
  "c++",
  "csharp",
];

export const frontEnd = ["react", "nextjs", "tailwind", "shadcn", "tanstack"];

export const backEnd = ["nodejs", "restapi", "webrtc"];

export const cloudDevops = ["docker", "aws", "gcp", "cicd", "minio", "git"];

export const databases = [
  "postgresql",
  "mongodb",
  "influxdb",
  "redis",
  "vectordb",
];

export const observability = ["prometheus", "grafana", "loki"];

export const testing = ["playwright", "pytest", "k6", "vitest"];

export const ai = ["langchain", "crewai"];

// Projects
export const projects = [
  {
    name: "talksphere",
    desc: "A real-time voice chat application with a sleek, modern design. Built with React, Node.js, and WebSocket for seamless communication. Features include user authentication, multiple chat rooms, and responsive design for both desktop and mobile.",
    url: "https://talksphere-2a8smnur2-zidanehakims-projects.vercel.app/",
    image: "/projects/web_talksphere.png",
  },
  {
    name: "chitchat",
    desc: "A real-time chat application with a sleek, modern design. Built with React, Node.js, and WebSocket for seamless communication. Features include user authentication, multiple chat rooms, and responsive design for both desktop and mobile.",
    url: "https://chitchat-three-rho.vercel.app/",
    image: "/projects/web_chitchat.png",
  },
  {
    name: "noteify",
    desc: "Design your planner with drag-and-drop sticky notes, featuring weather forecasts, real-time clocks, and location tracking. Easily create, stick, and track tasks.",
    url: "https://noteify-io.netlify.app/",
    image: "/projects/web_noteify.png",
  },
  {
    name: "trashtalker",
    desc: "An AI-powered waste sorting assistant that helps users identify and sort their trash correctly. Simply take a photo of your waste, and Trashtalker will analyze it using computer vision and provide instant feedback on the appropriate disposal method.",
    url: "https://trashtalker.com/",
    image: "/projects/web_trashtalker.png",
  },
  {
    name: "instrument store",
    desc: "Welcome to our online instrument store, where cozy ambiance meets jazzy design. Search for your desired instruments now and begin your musical journey!",
    url: "https://zidanehakim.github.io/react-instrument-store",
    image: "/projects/web_instrument_store.png",
  },
  {
    name: "animalist",
    desc: "Anime related stuffs search engine (characters, animes, movies) with cool parallax landing page, fetch data from Jikan API",
    url: "https://zidanehakim.github.io/animalist",
    image: "/projects/web_animalist.png",
  },
];

// Social links
export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yazidane-hakim-25754128a/",
  },
  { label: "GitHub", href: "https://github.com/zidanehakim" },
  { label: "Instagram", href: "https://www.instagram.com/yazidanehakim/" },
  { label: "Facebook", href: "https://www.facebook.com/ZidanyuChan/" },
];

// Contact info
export const contactInfo = {
  name: "Yazidane Hakim",
  address: "50 Changxing St, Daan Dist, Taipei City, Taiwan",
  phone: "+886 908735498",
  email: "zidanehakimgt@gmail.com",
  linkedin: "Yazidane Hakim",
  whatsapp: "0908735498",
  line: "yazidanehakim",
};

// Identity showcase nodes (used in IdentityShowcase section)
export const identityNodes = [
  { label: "Gamer", angle: -105, radiusFactor: 0.31 },
  { label: "Software Engineer", angle: 28, radiusFactor: 0.36 },
  { label: "College Student", angle: 145, radiusFactor: 0.25 },
];
