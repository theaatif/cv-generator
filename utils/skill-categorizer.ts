import type { SkillCategory } from "@/types/resume"

// Common skills by category for auto-categorization
const skillsByCategory: Record<SkillCategory, string[]> = {
  language: [
    "javascript",
    "typescript",
    "python",
    "java",
    "c#",
    "c++",
    "go",
    "rust",
    "swift",
    "kotlin",
    "php",
    "ruby",
    "scala",
    "perl",
    "html",
    "css",
    "sql",
    "r",
    "matlab",
  ],
  framework: [
    "react",
    "angular",
    "vue",
    "svelte",
    "next.js",
    "node.js",
    "express",
    "django",
    "flask",
    "spring",
    "asp.net",
    "laravel",
    "rails",
    "jquery",
    "bootstrap",
    "tailwind",
    "redux",
    "graphql",
    "apollo",
    "ember",
    "backbone",
    "meteor",
    "nuxt",
    "gatsby",
  ],
  database: [
    "mysql",
    "postgresql",
    "mongodb",
    "sqlite",
    "oracle",
    "sql server",
    "dynamodb",
    "cassandra",
    "redis",
    "elasticsearch",
    "firebase",
    "supabase",
    "neo4j",
    "couchdb",
  ],
  tool: [
    "git",
    "docker",
    "kubernetes",
    "jenkins",
    "travis",
    "circleci",
    "webpack",
    "babel",
    "vite",
    "npm",
    "yarn",
    "jira",
    "confluence",
    "postman",
    "swagger",
    "figma",
    "sketch",
    "photoshop",
    "illustrator",
    "xd",
    "zeplin",
    "invision",
    "jest",
    "mocha",
    "cypress",
  ],
  cloud: [
    "aws",
    "azure",
    "gcp",
    "google cloud",
    "heroku",
    "netlify",
    "vercel",
    "digitalocean",
    "lambda",
    "ec2",
    "s3",
    "cloudfront",
    "route53",
    "cloudflare",
    "firebase",
  ],
  soft: [
    "leadership",
    "communication",
    "teamwork",
    "problem solving",
    "critical thinking",
    "time management",
    "adaptability",
    "creativity",
    "project management",
    "agile",
    "scrum",
    "kanban",
    "presentation",
    "negotiation",
    "mentoring",
    "coaching",
  ],
  other: [],
}

/**
 * Attempts to categorize a skill based on common patterns
 */
export function categorizeSkill(skillName: string): SkillCategory {
  const lowerSkill = skillName.toLowerCase()

  // Check each category for a match
  for (const [category, skills] of Object.entries(skillsByCategory)) {
    if (skills.some((skill) => lowerSkill.includes(skill))) {
      return category as SkillCategory
    }
  }

  // Default to "other" if no match found
  return "other"
}

