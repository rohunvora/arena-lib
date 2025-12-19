/**
 * Data loading utilities for component library (v2)
 * 
 * This version uses the simplified schema with direct HTML/CSS rendering.
 */

import fs from 'fs';
import path from 'path';

// V2 Types - simplified schema with render field
export interface RenderableCode {
  html: string;
  css: string;
  notes?: string;
}

export interface SourceInfo {
  arena_id: number;
  arena_url: string;
  image_url: string;
  title: string | null;
}

export interface ExtractedComponent {
  id: string;
  name: string;
  description: string;
  screen_type: string;
  component_types: string[];
  aesthetic_family: string;
  tags: string[];
  render: RenderableCode;
  source: SourceInfo;
  extracted_at: string;
  extraction_version: string;
}

export interface ComponentIndex {
  version: string;
  generated_at: string;
  total_components: number;
  by_aesthetic: Record<string, string[]>;
  by_type: Record<string, string[]>;
  by_screen: Record<string, string[]>;
  components: string[];
}

// Path to components directory (inside site)
const COMPONENTS_DIR = path.join(process.cwd(), 'data');

/**
 * Load the component index
 */
export function getComponentIndex(): ComponentIndex {
  const indexPath = path.join(COMPONENTS_DIR, 'index.json');
  const data = fs.readFileSync(indexPath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Load a single component by ID
 */
export function getComponent(id: string): ExtractedComponent | null {
  try {
    const filePath = path.join(COMPONENTS_DIR, `${id}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Load all components
 */
export function getAllComponents(): ExtractedComponent[] {
  const index = getComponentIndex();
  const components: ExtractedComponent[] = [];
  
  for (const id of index.components) {
    const component = getComponent(id);
    if (component) {
      components.push(component);
    }
  }
  
  // Sort by extracted_at (most recent first)
  return components.sort((a, b) => 
    new Date(b.extracted_at).getTime() - new Date(a.extracted_at).getTime()
  );
}

/**
 * Get components by aesthetic family
 */
export function getComponentsByAesthetic(aesthetic: string): ExtractedComponent[] {
  const index = getComponentIndex();
  const ids = index.by_aesthetic[aesthetic] || [];
  
  return ids
    .map(id => getComponent(id))
    .filter((c): c is ExtractedComponent => c !== null);
}

/**
 * Get components by component type
 */
export function getComponentsByType(type: string): ExtractedComponent[] {
  const index = getComponentIndex();
  const ids = index.by_type[type] || [];
  
  return ids
    .map(id => getComponent(id))
    .filter((c): c is ExtractedComponent => c !== null);
}

/**
 * Get components by screen type
 */
export function getComponentsByScreen(screen: string): ExtractedComponent[] {
  const index = getComponentIndex();
  const ids = index.by_screen[screen] || [];
  
  return ids
    .map(id => getComponent(id))
    .filter((c): c is ExtractedComponent => c !== null);
}

/**
 * Get statistics for the library
 */
export function getStats() {
  const index = getComponentIndex();
  
  // Count aesthetics
  const aestheticCounts = Object.entries(index.by_aesthetic)
    .map(([name, ids]) => ({ name, count: ids.length }))
    .sort((a, b) => b.count - a.count);
  
  // Count component types
  const typeCounts = Object.entries(index.by_type)
    .map(([name, ids]) => ({ name, count: ids.length }))
    .sort((a, b) => b.count - a.count);
  
  return {
    totalComponents: index.total_components,
    aesthetics: aestheticCounts,
    types: typeCounts,
    generatedAt: index.generated_at,
  };
}

/**
 * Get unique aesthetic families
 */
export function getAestheticFamilies(): string[] {
  const index = getComponentIndex();
  return Object.keys(index.by_aesthetic).sort();
}

/**
 * Get unique component types
 */
export function getComponentTypes(): string[] {
  const index = getComponentIndex();
  return Object.keys(index.by_type).sort();
}
