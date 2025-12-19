import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getComponent, getAllComponents } from "@/lib/components";
import { CopyButton } from "@/components/copy-button";
import { HTMLPreview } from "@/components/previews";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const component = getComponent(id);
  
  if (!component) {
    notFound();
  }
  
  // Format the code for display
  const formattedHTML = component.render.html.replace(/\\n/g, '\n');
  const formattedCSS = component.render.css.replace(/\\n/g, '\n');
  
  return (
    <div className="min-h-screen">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link 
          href="/components"
          className="text-sm mb-6 inline-block hover:underline"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Back to components
        </Link>
      </div>

      {/* Live Preview Hero */}
      <section 
        className="py-12 px-4"
        style={{ background: 'var(--bg-inset)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            style={{ minHeight: '300px' }}
          >
            <div className="p-8 flex items-center justify-center">
              <HTMLPreview 
                html={component.render.html} 
                css={component.render.css} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-3">
          <Link 
            href={`/aesthetics/${component.aesthetic_family}`}
            className="text-sm px-2 py-0.5 rounded hover:underline"
            style={{ 
              background: 'var(--bg-inset)', 
              color: 'var(--text-muted)' 
            }}
          >
            {formatName(component.aesthetic_family)}
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {formatName(component.screen_type)}
          </span>
        </div>
        
        <h1 
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {component.name}
        </h1>
        
        <p 
          className="text-lg max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {component.description}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content - Code */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* HTML Code */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  HTML
                </h2>
                <CopyButton text={formattedHTML} label="Copy HTML" />
              </div>
              <div className="code-block max-h-[400px] overflow-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap">
                  {formattedHTML}
                </pre>
              </div>
            </section>

            {/* CSS Code */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 
                  className="text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  CSS
                </h2>
                <CopyButton text={formattedCSS} label="Copy CSS" />
              </div>
              <div className="code-block max-h-[400px] overflow-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap">
                  {formattedCSS}
                </pre>
              </div>
            </section>

            {/* Original Reference (collapsed by default) */}
            <section>
              <details className="group">
                <summary 
                  className="flex items-center justify-between cursor-pointer py-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span className="text-sm font-medium">Original Screenshot Reference</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-open:rotate-180" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pt-4">
                  <div className="card overflow-hidden">
                    <div className="aspect-video relative" style={{ background: 'var(--bg-inset)' }}>
                      <Image
                        src={component.source.image_url}
                        alt={component.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div 
                      className="p-3 flex items-center justify-between text-sm border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <span style={{ color: 'var(--text-muted)' }}>
                        {component.source.title || 'Untitled'}
                      </span>
                      <a 
                        href={component.source.arena_url}
                        target="_blank"
                        rel="noopener"
                        className="hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        View on Are.na →
                      </a>
                    </div>
                  </div>
                </div>
              </details>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Component Types */}
            <div className="card p-5">
              <h3 
                className="font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Component Types
              </h3>
              <div className="flex flex-wrap gap-2">
                {component.component_types.map(type => (
                  <Link
                    key={type}
                    href={`/components?type=${type}`}
                    className="pill hover:border-[var(--border-strong)]"
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            {component.tags.length > 0 && (
              <div className="card p-5">
                <h3 
                  className="font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {component.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: 'var(--bg-inset)', color: 'var(--text-muted)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Render Notes */}
            {component.render.notes && (
              <div className="card p-5">
                <h3 
                  className="font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Notes
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {component.render.notes}
                </p>
              </div>
            )}

            {/* Metadata */}
            <div className="card p-5">
              <h3 
                className="font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Metadata
              </h3>
              <div className="space-y-2 text-sm">
                <MetaRow 
                  label="Extracted" 
                  value={new Date(component.extracted_at).toLocaleDateString()} 
                />
                <MetaRow 
                  label="Version" 
                  value={component.extraction_version} 
                />
                <MetaRow 
                  label="ID" 
                  value={component.id} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <code 
        className="font-mono text-xs"
        style={{ color: 'var(--text-secondary)' }}
      >
        {value}
      </code>
    </div>
  );
}

// Generate static params
export async function generateStaticParams() {
  const components = getAllComponents();
  return components.map(c => ({ id: c.id }));
}

function formatName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
