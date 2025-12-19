import Link from "next/link";
import { getAllComponents, getStats } from "@/lib/components";

export default function AtomsPage() {
  const stats = getStats();
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="py-16 px-4"
        style={{ background: 'var(--bg-inset)' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 
            className="text-4xl font-semibold tracking-tight mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Component Library
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Browse {stats.totalComponents} UI components extracted from your references.
            Each component includes complete HTML and CSS ready to copy.
          </p>
          
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            Browse Components →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 
          className="text-2xl font-semibold mb-8 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          Your Collection
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard 
            value={stats.totalComponents} 
            label="Components" 
            href="/components"
          />
          <StatCard 
            value={stats.aesthetics.length} 
            label="Aesthetics" 
            href="/aesthetics"
          />
          <StatCard 
            value={stats.types.length} 
            label="Types" 
            href="/components"
          />
          <StatCard 
            value="v2.0" 
            label="Schema Version" 
          />
        </div>
      </section>

      {/* By Aesthetic */}
      {stats.aesthetics.length > 0 && (
        <section 
          className="py-16 px-4"
          style={{ background: 'var(--bg-inset)' }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-2xl font-semibold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              By Aesthetic
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.aesthetics.map(({ name, count }) => (
                <Link 
                  key={name} 
                  href={`/aesthetics/${name}`}
                  className="card p-4 hover:border-[var(--border-strong)] transition-colors"
                >
                  <div 
                    className="font-medium mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {formatName(name)}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {count} component{count !== 1 ? 's' : ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* By Type */}
      {stats.types.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-2xl font-semibold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              By Component Type
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {stats.types.map(({ name, count }) => (
                <Link 
                  key={name} 
                  href={`/components?type=${name}`}
                  className="pill hover:border-[var(--border-strong)] transition-colors"
                >
                  {name} ({count})
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ 
  value, 
  label, 
  href 
}: { 
  value: number | string; 
  label: string; 
  href?: string;
}) {
  const content = (
    <div className="card p-6 text-center">
      <div 
        className="text-3xl font-semibold tabular-nums mb-1"
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
  
  if (href) {
    return (
      <Link href={href} className="hover:scale-105 transition-transform">
        {content}
      </Link>
    );
  }
  
  return content;
}

function formatName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
