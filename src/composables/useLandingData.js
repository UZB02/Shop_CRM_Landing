import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { landingApi } from '@/api/landing'

export function useLandingData() {
  const { t, tm } = useI18n()
  
  const loading = ref(false)
  const stats = ref({
    total_stores: 0,
    total_workers: 0,
    total_sales_count: 0,
    active_subscriptions: 0,
    cities_count: 0
  })
  const remotePlans = ref([])
  const testimonials = ref([])
  const faqs = ref([])

  const navLinks = computed(() => [
    { text: t("landing.nav.features"), href: "#features", icon: "pi pi-star" },
    { text: t("landing.nav.pricing"), href: "#pricing", icon: "pi pi-tag" },
    { text: "Mijozlar", href: "#testimonials", icon: "pi pi-users" },
    { text: "FAQ", href: "#faq", icon: "pi pi-question-circle" },
    { text: "Bog'lanish", href: "#contact", icon: "pi pi-envelope" }
  ])

  const features = computed(() => [
    { title: t("landing.features.items.warehouse.title"), icon: "pi pi-box", desc: t("landing.features.items.warehouse.desc") },
    { title: t("landing.features.items.analytics.title"), icon: "pi pi-chart-line", desc: t("landing.features.items.analytics.desc") },
    { title: t("landing.features.items.branches.title"), icon: "pi pi-map-marker", desc: t("landing.features.items.branches.desc") }
  ])

  const featureLabels = {
    has_sale_return:    "Tovar qaytarish",
    has_export:         "Excel/PDF eksport",
    has_kpi:            "KPI moduli",
    has_supplier:       "Ta'minotchilar",
    has_wastage:        "Isrof hisobi",
    has_stock_audit:    "Inventarizatsiya",
    has_multi_currency: "Ko'p valyuta",
    has_qr_bulk:        "Ommaviy QR kod",
    has_audit_log:      "Audit log",
    has_telegram:       "Telegram bot",
    has_dashboard:      "Dashboard",
    has_subcategory:    "Subkategoriyalar",
  }

  const formatPrice = (price) => {
    const num = parseFloat(price)
    if (num === 0) return "Bepul"
    return num.toLocaleString('uz-UZ')
  }

  const getYearlyBenefit = (plan) => {
    const monthly = parseFloat(plan.price_monthly)
    const yearly  = parseFloat(plan.price_yearly)
    if (monthly === 0) return null
    const saved = (monthly * 12) - yearly
    return saved > 0 ? saved.toLocaleString('uz-UZ') + " so'm tejaysiz" : null
  }

  const getPlanFeatures = (p) => {
    const list = []
    
    // Limits
    if (p.max_branches > 0) list.push(`${p.max_branches} ta filial`)
    else if (p.max_branches === 0) list.push(`Cheksiz filiallar`)

    if (p.max_warehouses > 0) list.push(`${p.max_warehouses} ta ombor`)
    else if (p.max_warehouses === 0) list.push(`Cheksiz omborlar`)

    if (p.max_workers > 0) list.push(`${p.max_workers} ta xodim`)
    else if (p.max_workers === 0) list.push(`Cheksiz xodimlar`)

    if (p.max_products > 0) list.push(`${p.max_products} tagacha mahsulot`)
    else if (p.max_products === 0) list.push(`Cheksiz mahsulotlar`)

    // Feature Flags mapping
    if (p.features) {
      Object.entries(p.features).forEach(([key, value]) => {
        if (value && featureLabels[key]) {
          list.push(featureLabels[key])
        }
      })
    }
    
    return list
  }

  const plans = computed(() => {
    if (remotePlans.value.length > 0) {
      return remotePlans.value.map(p => ({
        id: p.id,
        name: p.name,
        price_monthly: formatPrice(p.price_monthly),
        price_yearly: formatPrice(p.price_yearly),
        benefit: getYearlyBenefit(p),
        price: formatPrice(p.price_monthly), // default display
        unit: "oy",
        desc: p.description,
        features: getPlanFeatures(p),
        popular: p.plan_type === 'basic', // or logic from backend
        plan_type: p.plan_type
      }))
    }
    return []
  })

  const fetchData = async () => {
    loading.value = true
    try {
      const [statsRes, plansRes, testimonialsRes, faqRes] = await Promise.all([
        landingApi.getStats(),
        landingApi.getPlans(),
        landingApi.getTestimonials(6),
        landingApi.getFaq()
      ])
      
      stats.value = statsRes
      remotePlans.value = plansRes
      testimonials.value = testimonialsRes
      faqs.value = faqRes
    } catch (error) {
      console.error("Failed to fetch landing data:", error)
    } finally {
      loading.value = false
    }
  }

  return {
    navLinks,
    features,
    plans,
    stats,
    testimonials,
    faqs,
    loading,
    fetchData
  }
}
