import { useState, useEffect, useRef } from 'react'
import { getFeatures, createFeature, updateFeature, deleteFeature } from '../api/featureApi'
import { getFeatureCategories } from '../api/featureCategoryApi'

export default function FeaturePage() {
  const [features, setFeatures] = useState([])
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editFeature, setEditFeature] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState({ feature_category_id: '', title: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchFeatures()
    fetchCategories()
  }, [])

  const fetchFeatures = async () => {
    const res = await getFeatures()
    setFeatures(res.data)
  }

  const fetchCategories = async () => {
    const res = await getFeatureCategories()
    setCategories(res.data)
  }

  const openAdd = () => {
    setEditFeature(null)
    setForm({ feature_category_id: '', title: '', description: '' })
    setImageFile(null)
    setImagePreview(null)
    setShowForm(true)
  }

  const openEdit = (feature) => {
    setEditFeature(feature)
    setForm({
      feature_category_id: feature.feature_category_id,
      title: feature.title,
      description: feature.description || '',
    })
    setImageFile(null)
    setImagePreview(feature.image_url || null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (!form.title || !form.feature_category_id) return alert('Please fill in all required fields!')
    setLoading(true)

    const formData = new FormData()
    formData.append('feature_category_id', form.feature_category_id)
    formData.append('title', form.title)
    formData.append('description', form.description)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    if (editFeature) {
      await updateFeature(editFeature.id, formData)
    } else {
      await createFeature(formData)
    }
    setLoading(false)
    setShowForm(false)
    fetchFeatures()
  }

  const confirmDelete = async () => {
    await deleteFeature(deleteId)
    setDeleteId(null)
    fetchFeatures()
  }

  return (
    <div style={{ backgroundColor: '#f5f0eb', minHeight: '100vh', padding: '40px 0' }}>
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '42px', fontWeight: '700', color: '#1a1a2e' }}>Features</h1>
          <button onClick={openAdd}
            style={{ backgroundColor: '#0d1b2a', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', border: 'none', cursor: 'pointer' }}>
            + Add Feature
          </button>
        </div>

        {/* Inline Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <div style={{ backgroundColor: '#0d1b2a', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ backgroundColor: 'rgba(240,160,68,0.2)', color: '#f0a044', border: '1px solid rgba(240,160,68,0.5)', padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em' }}>
                {editFeature ? 'EDIT' : 'NEW'}
              </span>
              <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '600', margin: 0 }}>
                {editFeature ? 'Edit Feature' : 'Add a Feature'}
              </h2>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px' }}>
              {/* Title */}
              <div className="mb-5">
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>TITLE</label>
                <input type="text" placeholder="Feature title..." value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e5e0db', backgroundColor: '#f5f0eb', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>DESCRIPTION</label>
                <textarea placeholder="Describe this feature..." value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })} rows={5}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e5e0db', backgroundColor: '#f5f0eb', fontSize: '15px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>

              {/* Category + Image */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>CATEGORY</label>
                  <select value={form.feature_category_id}
                    onChange={e => setForm({ ...form, feature_category_id: e.target.value })}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e5e0db', backgroundColor: 'white', fontSize: '15px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">Choose category...</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>FEATURED IMAGE</label>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px dashed #c5bfba', backgroundColor: 'white', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#888', boxSizing: 'border-box', minHeight: '52px' }}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" style={{ height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    ) : (
                      <span>⬆️ CHOOSE IMAGE</span>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleSave} disabled={loading}
                  style={{ backgroundColor: '#0d1b2a', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', border: 'none', cursor: 'pointer' }}>
                  {loading ? 'Saving...' : editFeature ? 'Update Feature' : 'Add Feature'}
                </button>
                <button onClick={() => setShowForm(false)}
                  style={{ backgroundColor: 'transparent', color: '#555', padding: '12px 28px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', border: '1px solid #ddd', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subheader */}
        <div className="flex justify-between items-center mb-4">
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>All Features</h2>
          <span style={{ fontSize: '13px', color: '#888', backgroundColor: '#ede8e3', padding: '4px 12px', borderRadius: '20px' }}>{features.length} total</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.length === 0 ? (
            <p style={{ color: '#aaa', gridColumn: 'span 3', textAlign: 'center', padding: '48px 0' }}>No features yet.</p>
          ) : features.map((feature) => (
            <div key={feature.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'transform 0.2s' }}
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
                <p style={{ fontSize: '14px', color: '#777', marginBottom: '16px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {feature.description || ''}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openEdit(feature)}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e0dbd5', backgroundColor: 'white', color: '#444', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => setDeleteId(feature.id)}
                    style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', width: '380px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🚨</div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#dc2626', marginBottom: '8px' }}>Delete Feature?</h2>
            <p style={{ fontSize: '13px', color: '#f87171', marginBottom: '24px' }}>⚡ This action is permanent and cannot be undone!</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={confirmDelete}
                style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 24px', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
                🗑️ Yes, Delete!
              </button>
              <button onClick={() => setDeleteId(null)}
                style={{ backgroundColor: '#f3f4f6', color: '#444', padding: '10px 24px', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}