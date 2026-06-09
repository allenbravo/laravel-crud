export default function FeatureDetailPage({ feature, onBack, onEdit }) {
  return (
    <div style={{ backgroundColor: '#f5f0eb', minHeight: '100vh' }}>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={onBack} className="hover:text-blue-600">Home</button>
          <span className="text-gray-300">›</span>
          <button onClick={onBack} className="hover:text-blue-600">Features</button>
          <span className="text-gray-300">›</span>
          <span className="text-gray-700">{feature.title}</span>
        </nav>
      </div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <section className="relative rounded-2xl overflow-hidden"
          style={{ minHeight: '440px', backgroundColor: '#0d1b2a', backgroundImage: feature.image_url ? `url(${feature.image_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,16,28,.92) 0%, rgba(8,16,28,.45) 45%, rgba(8,16,28,.08) 100%)' }}></div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '440px', padding: '44px 48px', gap: '16px', maxWidth: '700px' }}>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '700', color: '#fff', lineHeight: '1.1', margin: 0 }}>
              {feature.title}
            </h1>
            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f5c06a', backgroundColor: 'rgba(240,160,68,0.2)', border: '1px solid rgba(240,160,68,0.35)', padding: '4px 12px', borderRadius: '20px', width: 'fit-content' }}>
              {feature.category?.name}
            </span>
            <div>
              <button onClick={() => onEdit(feature)}
                style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 24px', borderRadius: '8px', backgroundColor: '#f0a044', color: '#0d1b2a', fontWeight: '600', fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                Edit Feature
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div style={{ maxWidth: '720px', fontSize: '17px', lineHeight: '1.82', color: '#4b4540' }}>
          {feature.description || 'No description available.'}
        </div>
      </div>

    </div>
  )
}