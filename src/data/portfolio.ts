export const interests = [
  { id: "web", title: "Web Development", icon: "Globe", desc: "Building scalable, responsive, and performance-focused applications.", color: "cyan" },
  { id: "dsa", title: "Data Structures & Algorithms", icon: "Binary", desc: "Solving algorithmic problems using optimized logic and efficient thinking.", color: "purple" },
  { id: "problem", title: "Problem Solving", icon: "Puzzle", desc: "Breaking down complex problems into composable engineering solutions.", color: "magenta" },
  { id: "net", title: "Computer Networks", icon: "Network", desc: "Understanding protocols, packet flow, communication systems, and network architecture.", color: "green" },
  { id: "linux", title: "Linux Systems", icon: "Terminal", desc: "Comfortable with Arch Linux, Ubuntu, terminal workflows, and system tooling.", color: "amber" },
  { id: "sec", title: "Ethical Hacking", icon: "ShieldAlert", desc: "Exploring security concepts, attack surfaces, and defensive engineering.", color: "magenta" },
  { id: "cloud", title: "Cloud Computing", icon: "Cloud", desc: "Learning scalable infrastructure and distributed systems.", color: "cyan" },
] as const;

export const skillCategories = [
  { name: "Frontend", items: [["HTML", 92], ["CSS", 88], ["JavaScript", 86], ["React", 88]] },
  { name: "Backend", items: [["Spring Boot", 82], ["Spring Security", 76], ["REST APIs", 88]] },
  { name: "Programming", items: [["Java", 90], ["C++", 85], ["C", 80], ["Python", 78]] },
  { name: "Database", items: [["MySQL", 84], ["MongoDB", 76], ["MariaDB", 72]] },
  { name: "Systems & Tools", items: [["Linux CLI", 88], ["Git", 88], ["GitHub", 88], ["Postman", 82], ["Maven", 78], ["IntelliJ IDEA", 84], ["VS Code", 90]] },
] as const;

export const coreConcepts = [
  { subject: "DSA", value: 92 },
  { subject: "OOP", value: 90 },
  { subject: "DBMS", value: 85 },
  { subject: "JWT Auth", value: 82 },
  { subject: "OS", value: 84 },
  { subject: "Networks", value: 86 },
  { subject: "Cloud", value: 78 },
];

export const experience = [
  {
    company: "Iproat Solutions",
    role: "Frontend Developer Intern",
    project: "Pro-Media",
    period: "Internship",
    bullets: [
      "Built reusable React.js components powering core dashboards.",
      "Improved scalability across the component layer.",
      "Implemented secure authentication flows.",
      "Integrated analytics APIs into the dashboard.",
      "Optimized dashboard responsiveness across devices.",
      "Improved UI consistency across the product surface.",
    ],
  },
];

export const projects = [
  {
    name: "VantageHub",
    tagline: "Real-time social analytics OS",
    desc: "A real-time social media analytics dashboard integrating multiple platforms using React and Spring Boot.",
    arch: "React • Spring Boot • REST • WebSockets • MySQL",
    stack: ["React", "Spring Boot", "MySQL", "WebSockets"],
    github: "https://github.com/kishoore-29",
    demo: "#",
    accent: "cyan",
  },
  {
    name: "FlashWork",
    tagline: "Short-term work marketplace",
    desc: "A scalable short-term work marketplace using JWT authentication and role-based access control.",
    arch: "Spring Boot • JWT • RBAC • React • MongoDB",
    stack: ["Spring Boot", "JWT", "RBAC", "React", "MongoDB"],
    github: "https://github.com/kishoore-29",
    demo: "#",
    accent: "purple",
  },
  {
    name: "EV Charging Slot Booking",
    tagline: "Smart EV infrastructure",
    desc: "Smart infrastructure for EV charging slot management with real-time availability and bookings.",
    arch: "Java • Spring Boot • MySQL • REST",
    stack: ["Java", "Spring Boot", "MySQL", "REST"],
    github: "https://github.com/kishoore-29",
    demo: "#",
    accent: "magenta",
  },
];

export const achievements = [
  { label: "Skillrack problems solved", value: 2500, suffix: "+", color: "cyan" },
  { label: "LeetCode problems solved", value: 250, suffix: "+", color: "purple" },
  { label: "1st Place — Code Swap Showdown", value: 1, suffix: "st", color: "magenta", note: "Cybertrix '24" },
  { label: "Recognized High Performer in Coding", value: 1, suffix: "", color: "green", note: "Department recognition" },
  { label: "ServiceNow CSA Certified", value: 1, suffix: "", color: "amber", note: "System Administrator" },
];

export type CertCategory = "Cloud" | "Security" | "Programming" | "Internship" | "Competitions" | "IoT" | "Platform";

export const certifications: {
  id: string;
  name: string;
  issuer: string;
  category: CertCategory;
  file: string;
  verifyUrl?: string;
}[] = [
  { id: "csa", name: "ServiceNow Certified System Administrator (CSA)", issuer: "ServiceNow", category: "Platform", file: "/assets/certifications/ServiceNow_CSA.pdf" },
  { id: "aws", name: "AWS Academy Graduate — Cloud Architecting", issuer: "AWS Academy", category: "Cloud", file: "/assets/certifications/AWS_Cloud_Architecting.pdf" },
  { id: "iot", name: "Introduction to Internet of Things", issuer: "NPTEL", category: "IoT", file: "/assets/certifications/Introduction_to_IoT.pdf" },
  { id: "eh", name: "Ethical Hacking", issuer: "NPTEL", category: "Security", file: "/assets/certifications/Ethical_Hacking.pdf" },
  { id: "java", name: "Java Programming", issuer: "Infosys Springboard", category: "Programming", file: "/assets/certifications/Java_Infosys.pdf" },
  { id: "intern", name: "Iproat Solutions — Internship Certificate", issuer: "Iproat Solutions", category: "Internship", file: "/assets/certifications/IproAtSolutions_internship.pdf" },
  { id: "cybertrix", name: "Code Swap Showdown — 1st Place", issuer: "Cybertrix '24", category: "Competitions", file: "/assets/certifications/cybertrix2024.pdf" },
];
