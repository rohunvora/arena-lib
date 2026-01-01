import Link from "next/link";
import { getAllComponents, getStats } from "@/lib/components";
import { HTMLPreview } from "@/components/previews";

export default function HomePage() {
  const components = getAllComponents();
  const stats = getStats();
  
  // Get recent components with valid render data
  const recentComponents = components
    .filter(c => c.render?.html && c.render?.css)
    .slice(0, 9);
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="py-20 px-4"
        style={{ background: 'var(--bg-inset)' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 
            className="text-5xl font-semibold tracking-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Your Design System
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            {stats.totalComponents} UI patterns extracted from your taste.
            Live HTML/CSS, not screenshots.
          </p>
          
          {/* Quick stats */}
          <div className="flex justify-center gap-12 mb-12">
            <Stat value={stats.totalComponents} label="Components" />
            <Stat value={stats.aesthetics.length} label="Aesthetics" />
            <Stat value={stats.types.length} label="Types" />
          </div>
          
          {/* CTA */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/components"
              className="px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              Browse Components
            </Link>
            <Link
              href="/export"
              className="px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ 
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
              }}
            >
              Export System
            </Link>
          </div>
        </div>
      </section>

      {/* Component Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionHeader 
          title="Live Components" 
          subtitle="Hover to see component name. Click for details + code."
          href="/components"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentComponents.map(component => (
            <Link 
              key={component.id} 
              href={`/components/${component.id}`}
              className="group"
            >
              <div className="card overflow-hidden transition-shadow hover:shadow-lg">
                {/* Live Preview */}
                <div 
                  className="aspect-[4/3] overflow-hidden"
                  style={{ background: 'var(--bg-inset)' }}
                >
                  <div className="p-4 h-full flex items-center justify-center">
                    <div className="transform scale-75 origin-center w-full">
                      <HTMLPreview 
                        html={component.render.html} 
                        css={component.render.css} 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="text-xs px-2 py-0.5 rounded capitalize"
                      style={{ background: 'var(--bg-inset)', color: 'var(--text-muted)' }}
                    >
                      {formatAesthetic(component.aesthetic_family)}
                    </span>
                  </div>
                  <h3 
                    className="font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {component.name}
                  </h3>
                  <p 
                    className="text-sm line-clamp-2 mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {component.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {recentComponents.length === 0 && (
          <div 
            className="text-center py-16"
            style={{ color: 'var(--text-muted)' }}
          >
            <p className="text-lg mb-4">No components extracted yet.</p>
            <p className="text-sm">
              Run the extraction CLI to populate your component library.
            </p>
          </div>
        )}
      </section>

      {/* Aesthetics overview */}
      {stats.aesthetics.length > 0 && (
        <section 
          className="py-16 px-4"
          style={{ background: 'var(--bg-inset)' }}
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="By Aesthetic" 
              subtitle="Browse by visual style"
              href="/aesthetics"
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.aesthetics.slice(0, 8).map(({ name, count }) => {
                // Get a sample component for this aesthetic
                const sampleComponent = components.find(
                  c => c.aesthetic_family === name && c.render?.html
                );
                
                return (
                  <Link 
                    key={name} 
                    href={`/aesthetics/${name}`}
                    className="group"
          >
                    <div className="card overflow-hidden">
                      {sampleComponent?.render ? (
                        <div 
                          className="aspect-[3/2] overflow-hidden"
                          style={{ background: 'var(--bg-inset)' }}
                        >
                          <div className="p-2 h-full flex items-center justify-center">
                            <div className="transform scale-50 origin-center">
                              <HTMLPreview 
                                html={sampleComponent.render.html} 
                                css={sampleComponent.render.css} 
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="aspect-[3/2]"
                          style={{ background: 'var(--bg-inset)' }}
                        />
                      )}
                      <div className="p-3">
                        <div 
                          className="font-medium text-sm"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {formatAesthetic(name)}
                        </div>
                        <div 
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {count} pattern{count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Export CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 
            className="text-2xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Export Your Design System
          </h2>
          <p 
            className="mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            Generate .cursorrules, CSS variables, or a Tailwind config 
            from your extracted patterns.
          </p>
          <Link
            href="/export"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Export Options →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div 
        className="text-4xl font-semibold tabular-nums"
        style={{ color: 'var(--text-primary)' }}
      >
        {value}
      </div>
      <div 
        className="text-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </div>
    </div>
  );
}

function SectionHeader({ 
  title, 
  subtitle, 
  href 
}: { 
  title: string; 
  subtitle: string; 
  href: string;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 
          className="text-2xl font-semibold mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <p 
          className="text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </p>
      </div>
      <Link 
        href={href}
        className="text-sm font-medium hover:underline"
        style={{ color: 'var(--accent)' }}
      >
        View all →
      </Link>
    </div>
  );
}

function formatAesthetic(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
