import api from './axios'

export const getFeatures = () => api.get('/features')
export const getFeature = (id) => api.get(`/features/${id}`)
export const createFeature = (data) => api.post('/features', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
export const updateFeature = (id, data) => api.post(`/features/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
export const deleteFeature = (id) => api.delete(`/features/${id}`)