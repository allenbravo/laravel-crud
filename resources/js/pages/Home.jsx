import { useState, useEffect } from 'react'
import { getFeatures } from '../api/featureApi'

export default function Home() {
  const [features, setFeatures] = useState([])

  useEffect(() => {
    getFeatures().then(res => setFeatures(res.data))
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-screen flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-1.jpg')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="hidden md:block absolute left-20 top-1/4 -translate-y-1/2 w-[340px] h-[340px] bg-gradient-to-br from-blue-600 to-blue-400 rounded-full opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl text-white">
            <h3 className="text-sm tracking-widest mb-4">TECHNOLOGY RELATED CONSULTANCY</h3>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">We bring great <br /> Ideas to life</h1>
            <p className="text-lg mb-8 text-gray-200">We provide the most responsive and functional IT design for companies and businesses worldwide.</p>
            <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-md font-semibold">Read More</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative -mt-56 z-10 py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: 'service-1.png', title: 'Strategy & Discovery' },
              { img: 'service-2.png', title: 'Custom Software Solution' },
              { img: 'service-3.png', title: 'Technology Consulting' },
              { img: 'service-4.png', title: 'Business Analytics' },
            ].map((s, i) => (
              <div key={i} className="group w-full text-center px-10 py-7 bg-white rounded-xl shadow-md border border-gray-100 hover:bg-blue-500 hover:shadow-xl hover:-translate-y-2 transition duration-300">
                <div className="mb-5 flex justify-center">
                  <img src={`/assets/${s.img}`} className="h-24" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-white transition">{s.title}</h3>
                <p className="text-gray-600 text-sm group-hover:text-white transition">We provide the most responsive and functional IT design for companies and businesses worldwide.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-14 w-[60%] z-0">
                <img src="/assets/about-1.jpg" className="rounded-xl shadow-md w-full" />
              </div>
              <div className="relative z-10 ml-32">
                <img src="/assets/about-2.jpg" className="rounded-xl shadow-xl" />
              </div>
              <div className="absolute left-10 top-[60%] grid grid-cols-6 gap-3 opacity-50 z-0">
                {[...Array(24)].map((_, i) => <div key={i} className="w-3 h-3 bg-gray-400 rounded-full"></div>)}
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                <a href="#" className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-wider">WHO WE ARE</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-4 leading-tight">We specialise in helping our customers digitise their business</h2>
              <p className="text-gray-600 mt-6 leading-relaxed">Accelerate innovation with world-class tech teams. We'll match you to an entire remote team of incredible freelance talent for all your software development needs.</p>
              <a href="#" className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-semibold">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTER */}
      <section className="py-24 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/counter-bg.jpg')" }}>
        <div className="absolute inset-0 bg-blue-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {[
              { img: 'counter-1.png', count: '1963', label: 'Happy Clients' },
              { img: 'counter-2.png', count: '2847', label: 'Projects Done' },
              { img: 'counter-3.png', count: '748', label: 'Win Awards' },
              { img: 'counter-4.png', count: '1,500', label: 'Team Members' },
            ].map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <img src={`/assets/${c.img}`} className="h-16" />
                <h2 className="text-5xl font-bold">{c.count}</h2>
                <p className="text-lg text-blue-200">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-wider">WHY CHOOSE US</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-4 leading-tight">We provide the best IT solutions for your business</h2>
              <p className="text-gray-600 mt-6 leading-relaxed">Accelerate innovation with world-class tech teams. We'll match you to an entire remote team of incredible freelance talent.</p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { img: 'features-1.png', title: 'Award Winning' },
                  { img: 'features-2.png', title: 'Professional Staff' },
                  { img: 'features-3.png', title: '24/7 Support' },
                  { img: 'features-4.png', title: 'Fair Prices' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img src={`/assets/${f.img}`} className="h-12" />
                    <span className="font-semibold text-gray-800">{f.title}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-semibold">Read More</a>
            </div>
            <div>
              <img src="/assets/features-img.png" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES FROM DATABASE */}
      {features.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-blue-600 font-semibold uppercase text-sm tracking-wider">WHAT WE OFFER</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-12">Our Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.id}
                  style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: '200px', backgroundColor: '#f0ebe5', overflow: 'hidden' }}>
                    {feature.image_url ? (
                      <img src={feature.image_url} alt={feature.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#ccc' }}>🖼️</div>
                    )}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' }}>{feature.title}</h3>
                    <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c47d0e', backgroundColor: 'rgba(240,160,68,0.15)', border: '1px solid rgba(240,160,68,0.35)', padding: '3px 12px', borderRadius: '20px', marginBottom: '10px' }}>
                      {feature.category?.name}
                    </span>
                    <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {feature.description || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TEAM */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-blue-600 font-semibold uppercase text-sm tracking-wider">OUR TEAM</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-12">Meet Our Expert Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: 'team-1.jpg', name: 'John Doe', role: 'CEO & Founder' },
              { img: 'team-2.jpg', name: 'Jane Smith', role: 'Lead Developer' },
              { img: 'team-1.jpg', name: 'Mike Johnson', role: 'UI/UX Designer' },
              { img: 'team-2.jpg', name: 'Sarah Lee', role: 'Project Manager' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition duration-300">
                <img src={`/assets/${t.img}`} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-lg">{t.name}</h3>
                  <p className="text-blue-600 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-blue-600 font-semibold uppercase text-sm tracking-wider">LATEST NEWS</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-12">Our Latest Blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: 'blog-1.jpg', title: 'How Technology is Changing Business', date: 'April 21, 2026' },
              { img: 'blog-2.jpg', title: 'Top 10 IT Solutions for Small Business', date: 'April 22, 2026' },
              { img: 'blog-3.jpg', title: 'The Future of Digital Transformation', date: 'April 23, 2026' },
            ].map((b, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition duration-300 text-left">
                <img src={`/assets/${b.img}`} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <p className="text-blue-600 text-sm mb-2">{b.date}</p>
                  <h3 className="font-bold text-gray-800 text-lg mb-3">{b.title}</h3>
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cover bg-center relative py-16"
        style={{ backgroundImage: "url('/assets/footer-bg.jpg')" }}>
        <div className="absolute inset-0 bg-gray-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-400">
            <div>
              <img src="/assets/logo-white.png" className="h-10 mb-4" />
              <p className="text-sm leading-relaxed">We provide the most responsive and functional IT design for companies worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Strategy & Discovery</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Custom Software</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Technology Consulting</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Business Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>📍 123 Street, City, Country</li>
                <li>📞 +1 234 567 890</li>
                <li>✉️ info@techmax.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
            © 2026 Techmax. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  )
}