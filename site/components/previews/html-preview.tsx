'use client';

import React, { useId, useMemo } from 'react';

interface HTMLPreviewProps {
  html: string;
  css: string;
  className?: string;
}

/**
 * Scopes CSS selectors to a specific container ID to prevent style conflicts.
 * Transforms selectors like `.card` to `#scope-123 .card`
 */
function scopeCSS(css: string, scopeId: string): string {
  // Split CSS into rules
  const rules = css.split('}');
  
  return rules.map(rule => {
    const trimmed = rule.trim();
    if (!trimmed) return '';
    
    // Find the selector part (before the {)
    const braceIndex = trimmed.indexOf('{');
    if (braceIndex === -1) return trimmed;
    
    const selector = trimmed.slice(0, braceIndex).trim();
    const body = trimmed.slice(braceIndex);
    
    // Handle multiple selectors (comma-separated)
    const scopedSelectors = selector.split(',').map(sel => {
      const s = sel.trim();
      
      // Skip @rules like @keyframes, @media, @font-face
      if (s.startsWith('@')) return s;
      
      // Skip if already scoped or is a root selector
      if (s.startsWith(`#${scopeId}`)) return s;
      
      // Handle :root and html/body selectors
      if (s === ':root' || s === 'html' || s === 'body') {
        return `#${scopeId}`;
      }
      
      // Scope the selector
      return `#${scopeId} ${s}`;
    }).join(', ');
    
    return `${scopedSelectors} ${body}`;
  }).join('}\n');
}

/**
 * Renders HTML/CSS in an isolated container with scoped styles.
 * Used to display extracted component code without affecting the rest of the page.
 */
export function HTMLPreview({ html, css, className = '' }: HTMLPreviewProps) {
  const reactId = useId();
  // Create a stable scope ID from the React ID
  const scopeId = `preview-${reactId.replace(/:/g, '')}`;
  
  const scopedCSS = useMemo(() => {
    // Add a CSS reset for the preview container
    const reset = `
      #${scopeId} {
        all: initial;
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #1a1a1a;
        box-sizing: border-box;
      }
      #${scopeId} *, #${scopeId} *::before, #${scopeId} *::after {
        box-sizing: border-box;
      }
    `;
    
    return reset + '\n' + scopeCSS(css, scopeId);
  }, [css, scopeId]);
  
  // Process HTML to handle escaped newlines
  const processedHTML = useMemo(() => {
    return html.replace(/\\n/g, '\n');
  }, [html]);
  
  return (
    <div className={`html-preview-wrapper ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: scopedCSS }} />
      <div 
        id={scopeId}
        className="html-preview-content"
        dangerouslySetInnerHTML={{ __html: processedHTML }} 
      />
    </div>
  );
}

/**
 * A variant that shows the preview in a contained "device frame" style
 */
export function HTMLPreviewFrame({ html, css, title }: HTMLPreviewProps & { title?: string }) {
  return (
    <div className="preview-frame">
      {title && (
        <div className="preview-frame-header">
          <span className="preview-frame-title">{title}</span>
        </div>
      )}
      <div className="preview-frame-body">
        <HTMLPreview html={html} css={css} />
      </div>
    </div>
  );
}

