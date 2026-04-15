// Typewriter strings for hero
export const displayTexts = ["Full-stack Dev", "Engineer", "College Student"]

// Timeline entries
export const timeline = [
  {
    type: "Education",
    time: "2022-Present",
    title: "National Taiwan University, Civil Engineering Department",
    sub: "2nd year",
    description: "As I'm into engineering and would like to try something new, Civil Engineering does attract my interest a lot. Being able to analyze structures and make durable buildings, combined with mechanical theory and all of its complexity, makes the learning process more fun.",
  },
  {
    type: "Award",
    time: "2022-Present",
    title: "Beasiswa Indonesia Maju (BIM) Awardee",
    sub: "Ministry of Education, Culture, Research, and Technology",
    description: "Participating in the National Indonesian Informatics Olympiad 2021 brought me the opportunity to become an awardee of the Maju Scholarship and to choose National Taiwan University for my further studies.",
  },
  {
    type: "Award",
    time: "2023",
    title: "Best Automation Award, Best Automation Group",
    sub: "Physical Model Design Laboratory, NTU Civil Engineering Course",
    description: "Rail track projects, I've always strived to create the best and most creative projects combines with programming. In this case, the Raspberry Pi sends an HTML file to localhost:5000 when certain conditions of the rail are met.",
  },
  {
    type: "Award",
    time: "2021",
    title: "National Informatics Olympiad",
    sub: "Finalist",
    description: "Having obtained a gold medal in the Bengkulu Informatics Olympiad 2021, I was chosen to represent the Bengkulu province in the National Informatics field. Consequently, I had the opportunity to participate as a finalist in the competition",
  },
  {
    type: "Award",
    time: "2021",
    title: "Bengkulu Informatics Olympiad",
    sub: "Gold Medal",
    description: "I've always been passionate about programming, starting from school-level qualifications, advancing to district competitions, and eventually participating at the provincial level. Hard work paid off when I was awarded a Gold Medal in the competition.",
  },
  {
    type: "Education",
    time: "2019-2022",
    title: "SMA Negeri 4 Rejang Lebong",
    sub: "Senior High School",
    description: "Three years of senior high school, I was just a normal student, self-studying programming on my own.",
  },
]

// Tech skill slugs (match filenames in /public/*.svg)
export const frontEnd = ["html5", "css", "javascript", "react", "tailwind", "bootstrap", "framer", "typescript", "unity"]
export const backEnd = ["nodejs", "expressjs", "mongodb", "supabase", "git", "github", "json"]

// Projects
export const projects = [
  {
    name: "noteify",
    desc: "Design your planner with drag-and-drop sticky notes, featuring weather forecasts, real-time clocks, and location tracking. Easily create, stick, and track tasks.",
    url: "https://noteify-io.netlify.app/",
    image: "/web_noteify.png",
  },
  {
    name: "instrument store",
    desc: "Welcome to our online instrument store, where cozy ambiance meets jazzy design. Search for your desired instruments now and begin your musical journey!",
    url: "https://zidanehakim.github.io/react-instrument-store",
    image: "/web_instrument-store.png",
  },
  {
    name: "animalist",
    desc: "Anime related stuffs search engine (characters, animes, movies) with cool parallax landing page, fetch data from Jikan API",
    url: "https://zidanehakim.github.io/animalist",
    image: "/web_animalist.png",
  },
]

// Social links
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yazidane-hakim-25754128a/" },
  { label: "GitHub", href: "https://github.com/zidanehakim" },
  { label: "Instagram", href: "https://www.instagram.com/yazidanehakim/" },
  { label: "Facebook", href: "https://www.facebook.com/ZidanyuChan/" },
]

// Contact info
export const contactInfo = {
  name: "Yazidane Hakim",
  address: "50 Changxing St, Daan Dist, Taipei City, Taiwan",
  phone: "+886 908735498",
  email: "zidanehakimgt@gmail.com",
  linkedin: "Yazidane Hakim",
  whatsapp: "0908735498",
  line: "yazidanehakim",
}

// Identity showcase nodes (used in IdentityShowcase section)
export const identityNodes = [
  { label: "Full-stack Dev",    angle: -105, radiusFactor: 0.31 },
  { label: "Software Engineer", angle:   28, radiusFactor: 0.36 },
  { label: "Student",           angle:  145, radiusFactor: 0.25 },
]
