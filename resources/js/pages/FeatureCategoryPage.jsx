import { useState, useEffect } from 'react'
import { getFeatureCategories, createFeatureCategory, updateFeatureCategory, deleteFeatureCategory } from '../api/featureCategoryApi'

export default function FeatureCategoryPage() {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    const res = await getFeatureCategories()
    setCategories(res.data)
  }

  const openAdd = () => {
    setEditCategory(null)
    setForm({ name: '', description: '' })
    setShowModal(true)
  }

  const openEdit = (cat) => {
    setEditCategory(cat)
    setForm({ name: cat.name, description: cat.description || '' })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name) return alert('Name is required!')
    setLoading(true)
    if (editCategory) {
      await updateFeatureCategory(editCategory.id, form)
    } else {
      await createFeatureCategory(form)
    }
    setLoading(false)
    setShowModal(false)
    fetchCategories()
  }

  const confirmDelete = async () => {
    await deleteFeatureCategory(deleteId)
    setDeleteId(null)
    fetchCategories()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Feature Categories</h2>
        <button onClick={openAdd} className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all">
          + Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Features</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-400">No categories yet.</td></tr>
            ) : categories.map((cat, i) => (
              <tr key={cat.id} className={`border-t hover:bg-indigo-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="p-4 text-gray-500">{i + 1}</td>
                <td className="p-4 font-semibold text-gray-800">{cat.name}</td>
                <td className="p-4 text-gray-600">{cat.description || '—'}</td>
                <td className="p-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{cat.features_count}</span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openEdit(cat)} className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition-all">✏️ Edit</button>
                  <button onClick={() => setDeleteId(cat.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-indigo-700">{editCategory ? '✏️ Edit Category' : '➕ Add Category'}</h2>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1 font-medium">Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 mb-1 font-medium">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" rows={3} />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex-1">
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-300 transition-all flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl text-center">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-2xl font-extrabold text-red-600 mb-2">Delete Category?</h2>
            <p className="text-sm text-red-400 mb-6">⚡ All features under this category will also be deleted!</p>
            <div className="flex gap-3 justify-center">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-all">🗑️ Yes, Delete!</button>
              <button onClick={() => setDeleteId(null)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-300 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}