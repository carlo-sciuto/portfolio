/**
 * Application configuration and feature flags
 */

export const config = {
  // Feature flags
  features: {
    projects: import.meta.env.VITE_FEATURE_PROJECTS === "true",
    blog: import.meta.env.VITE_FEATURE_BLOG === "true",
    testimonials: import.meta.env.VITE_FEATURE_TESTIMONIALS === "true",
    certifications: import.meta.env.VITE_FEATURE_CERTIFICATIONS === "true",
  },

  // Site metadata
  site: {
    url: import.meta.env.VITE_SITE_URL || "https://carlo-sciuto.github.io/portfolio",
    name: import.meta.env.VITE_SITE_NAME || "Carlo Sciuto - Portfolio",
    description: import.meta.env.VITE_SITE_DESCRIPTION || "Senior Full Stack Developer",
    author: "Carlo Sciuto",
    email: "carlo.sciuto95@gmail.com",
    github: "https://github.com/carlo-sciuto",
    linkedin: "https://www.linkedin.com/in/carlo-sciuto/",
  },

  // Analytics
  analytics: {
    id: import.meta.env.VITE_ANALYTICS_ID,
  },

  // Contact form
  contact: {
    formspreeId: import.meta.env.VITE_FORMSPREE_ID,
  },
} as const;

// Type helper
export type Config = typeof config;
