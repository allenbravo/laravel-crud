import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import FeatureCategoryPage from './pages/FeatureCategoryPage'
import FeaturePage from './pages/FeaturePage'
import FeatureDetailPage from './pages/FeatureDetailPage'
import '../css/app.css'

function App() {
  const [page, setPage] = useState('home')
  const [selectedFeature, setSelectedFeature] = useState(null)

  const handleViewFeature = (feature) => {
    setSelectedFeature(feature)
    setPage('feature-detail')
  }

  const handleEditFeature = (feature) => {
    setSelectedFeature(feature)
    setPage('features')
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      {page !== 'feature-detail' && (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50 px-8 py-4 flex items-center justify-between">
          <img src="/assets/logo.png" className="h-10" />
          <div className="flex gap-6">
            <button onClick={() => setPage('home')}
              className={`font-semibold transition-all ${page === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Home
            </button>
            <button onClick={() => setPage('feature-categories')}
              className={`font-semibold transition-all ${page === 'feature-categories' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Feature Categories
            </button>
            <button onClick={() => setPage('features')}
              className={`font-semibold transition-all ${page === 'features' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Features
            </button>
          </div>
        </nav>
      )}

      {/* Content */}
      <div className={page !== 'home' && page !== 'feature-detail' ? 'pt-20 max-w-6xl mx-auto p-8' : ''}>
        {page === 'home' && <Home onViewFeature={handleViewFeature} />}
        {page === 'feature-categories' && <FeatureCategoryPage />}
        {page === 'features' && <FeaturePage editFeatureData={selectedFeature} onClear={() => setSelectedFeature(null)} />}
        {page === 'feature-detail' && selectedFeature && (
          <FeatureDetailPage
            feature={selectedFeature}
            onBack={() => setPage('home')}
            onEdit={handleEditFeature}
          />
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)