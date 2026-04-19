import axios from 'axios'

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://shopcrmsystem-production.up.railway.app/api/v1"

// In-memory token store for consistency with main project system
let _memToken = null

export const setApiToken = (token) => { _memToken = token }
export const clearApiToken = () => { _memToken = null }

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = _memToken || localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor for professional logging and error handling
api.interceptors.response.use(
    (response) => {
        // Log all incoming API data for monitoring (Main Project Pattern)
        console.log(`🌐 API RESPONSE [${response.config.method.toUpperCase()}] ${response.config.url}:`, response.data)
        return response
    },
    (error) => {
        console.error(`❌ API ERROR [${error.config?.method?.toUpperCase()}] ${error.config?.url}:`, error.response?.data || error.message)
        
        const status = error.response?.status
        if (status === 401) {
            clearApiToken()
            localStorage.removeItem('token')
        }
        
        return Promise.reject(error)
    }
)

// Subscription API
export const subscriptionAPI = {
    getPlans: () => api.get('/subscription/plans/'),
}

export default api

