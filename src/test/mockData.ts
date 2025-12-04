// Mock data for consistent testing

export const mockSkillsData = [
  {
    name: "Frontend",
    items: [
      { name: "React", rating: 95, experience: "5+ years", icon: "React" },
      { name: "TypeScript", rating: 90, experience: "4+ years", icon: "TypeScript" },
      { name: "Vue.js", rating: 85, experience: "3+ years", icon: "Vue.js" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", rating: 90, experience: "5+ years", icon: "Node.js" },
      { name: "Python", rating: 85, experience: "4+ years", icon: "Python" },
      { name: "Kotlin", rating: 80, experience: "3+ years", icon: "Kotlin" },
    ],
  },
];

export const mockProjectsData = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/ecommerce",
    featured: true,
  },
  {
    title: "Task Management App",
    description: "Real-time collaborative task manager",
    technologies: ["React", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/example/taskmanager",
    featured: false,
  },
  {
    title: "Blog Platform",
    description: "Content management system with markdown support",
    technologies: ["Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/example/blog",
    featured: false,
  },
];

export const mockExperienceData = [
  {
    role: "Senior Software Engineer",
    company: "Tech Company Inc",
    period: "2020 - Present",
    description: "Leading development of microservices architecture and web applications",
  },
  {
    role: "Full Stack Developer",
    company: "Startup Solutions",
    period: "2018 - 2020",
    description: "Built scalable web applications using modern technologies",
  },
];

export const mockCertificationsData = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credlyUrl: "https://credly.com/badge1",
    credlyBadgeId: "badge123",
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google",
    date: "2022",
    verificationUrl: "https://google.com/verify",
  },
];

export const mockAboutData = [
  {
    title: "Background",
    content: "Experienced full-stack developer with a passion for creating efficient solutions",
  },
  {
    title: "Approach",
    content: "Focus on clean code, best practices, and continuous learning",
  },
];
