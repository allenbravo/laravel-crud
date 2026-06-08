import api from './axios'

export const getFeatureCategories = () => api.get('/feature-categories')
export const getFeatureCategory = (id) => api.get(`/feature-categories/${id}`)
export const createFeatureCategory = (data) => api.post('/feature-categories', data)
export const updateFeatureCategory = (id, data) => api.put(`/feature-categories/${id}`, data)
export const deleteFeatureCategory = (id) => api.delete(`/feature-categories/${id}`)