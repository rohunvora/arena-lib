/**
 * Schema for extracted component data (v2)
 * 
 * This schema is focused on storing renderable HTML/CSS directly,
 * rather than design tokens that need to be interpreted.
 */

import type { ScreenType, ComponentType, AestheticFamily } from './taxonomy';

// Renderable code - the core of v2
export interface RenderableCode {
  html: string;              // Complete HTML that recreates the component
  css: string;               // Complete CSS to style the HTML
  notes?: string;            // Rendering notes (e.g., "uses custom illustrations")
}

// Source information from Are.na
export interface SourceInfo {
  arena_id: number;
  arena_url: string;
  image_url: string;
  title: string | null;
}

// The main component schema (v2)
export interface ExtractedComponent {
  // Identity
  id: string;                // Are.na block ID as string
  name: string;              // AI-generated memorable name
  description: string;       // One-line description

  // Classification (light metadata for filtering/browsing)
  screen_type: ScreenType;
  component_types: ComponentType[];
  aesthetic_family: AestheticFamily;
  tags: string[];            // Additional searchable tags

  // THE KEY: Actual renderable code
  render: RenderableCode;

  // Source
  source: SourceInfo;

  // Metadata
  extracted_at: string;      // ISO timestamp
  extraction_version: string; // "2.0.0"
}

// Index file structure for all components
export interface ComponentIndex {
  version: string;
  generated_at: string;
  total_components: number;
  
  // Pre-computed aggregations for the website
  by_aesthetic: Record<string, string[]>;  // aesthetic -> component ids
  by_type: Record<string, string[]>;       // type -> component ids
  by_screen: Record<string, string[]>;     // screen -> component ids
  
  // All component IDs
  components: string[];
}

// Schema version
export const SCHEMA_VERSION = '2.0.0';

// Type guard to validate extracted component
export function isValidComponent(obj: unknown): obj is ExtractedComponent {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const c = obj as Record<string, unknown>;
  
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.description === 'string' &&
    typeof c.screen_type === 'string' &&
    Array.isArray(c.component_types) &&
    typeof c.aesthetic_family === 'string' &&
    Array.isArray(c.tags) &&
    typeof c.render === 'object' &&
    c.render !== null &&
    typeof (c.render as Record<string, unknown>).html === 'string' &&
    typeof (c.render as Record<string, unknown>).css === 'string' &&
    typeof c.source === 'object'
  );
}
