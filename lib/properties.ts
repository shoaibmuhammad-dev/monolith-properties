import { agents } from "@/data/agents";
import { properties } from "@/data/properties";
import type { Agent, Property } from "@/types";

/**
 * Data access layer. Components import from here, never from data/ directly,
 * so you can replace these functions with CMS or database calls later.
 */
export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit = 5): Property[] {
  return properties.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter((p) => p.id !== property.id)
    .map((p) => ({
      p,
      score:
        (p.location.area === property.location.area ? 3 : 0) +
        (p.type === property.type ? 2 : 0) +
        (p.purpose === property.purpose ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function getLocations(): string[] {
  return Array.from(new Set(properties.map((p) => p.location.area))).sort();
}

export function countByArea(area: string): number {
  return properties.filter((p) => p.location.area === area).length;
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
