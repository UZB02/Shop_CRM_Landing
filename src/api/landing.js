const BASE = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/landing` 
  : 'https://shopcrmsystem-production.up.railway.app/api/v1/landing'

export const landingApi = {
  getStats: () => fetch(`${BASE}/stats/`).then(r => r.json()),
  getPlans: () => fetch(`${BASE}/plans/`).then(r => r.json()),
  getTestimonials: (limit = 10) => fetch(`${BASE}/testimonials/?limit=${limit}`).then(r => r.json()),
  getFaq: (category = '') => fetch(`${BASE}/faq/${category ? `?category=${category}` : ''}`).then(r => r.json()),
  sendContact: async (data) => {
    const res = await fetch(`${BASE}/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw { status: res.status, data: json }
    return json
  },
}
