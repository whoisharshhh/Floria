/**
 * Central site configuration.
 * Single source of truth for metadata, links, and brand constants.
 * Import from `@/config/site` — never hardcode these values in components.
 */
export const siteConfig = {
  name: "FLORIA",
  tagline: "An Immersive World of Curious Creatures",
  description:
    "An immersive world of curious creatures, magical places, and stories waiting to be discovered.",
  creator: "Harsh Patel",
  links: {
    linkedin: "https://www.linkedin.com/in/harsh-patel-mca",
  },
  metadata: {
    title: "FLORIA — An Immersive World of Curious Creatures",
    description:
      "An immersive world of curious creatures, magical places, and stories waiting to be discovered.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
