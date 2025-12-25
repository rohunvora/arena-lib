// Broken spacing example - cards feel like floating islands

export function FeatureCards() {
  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-8">Features</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4" />
          <h3 className="font-semibold mb-2">Fast Performance</h3>
          <p className="text-gray-600 text-sm">
            Lightning quick response times for all your needs.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg mb-4" />
          <h3 className="font-semibold mb-2">Secure</h3>
          <p className="text-gray-600 text-sm">
            Enterprise-grade security built in from day one.
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4" />
          <h3 className="font-semibold mb-2">Scalable</h3>
          <p className="text-gray-600 text-sm">
            Grows with your business without breaking a sweat.
          </p>
        </div>
      </div>
    </section>
  )
}

// Issues present:
// 1. Card padding (p-6 = 24px) equals gap (gap-6 = 24px) - Law of Proximity violation
// 2. Section padding (py-12 = 48px) is same as could be other sections - monotonous
// 3. Cards feel like isolated islands, not a cohesive group
