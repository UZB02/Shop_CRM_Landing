import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { subscriptionAPI } from '@/services/api'

export function useLandingData() {
  const { t, tm } = useI18n()
  
  const loading = ref(false)
  const remotePlans = ref([])

  const navLinks = computed(() => [
    { text: t("landing.nav.features"), href: "#features", icon: "pi pi-star" },
    { text: t("landing.nav.pricing"), href: "#pricing", icon: "pi pi-tag" },
    { text: t("landing.nav.about"), href: "#about", icon: "pi pi-info-circle" }
  ])

  const features = computed(() => [
    { title: t("landing.features.items.warehouse.title"), icon: "pi pi-box", desc: t("landing.features.items.warehouse.desc") },
    { title: t("landing.features.items.analytics.title"), icon: "pi pi-chart-line", desc: t("landing.features.items.analytics.desc") },
    { title: t("landing.features.items.branches.title"), icon: "pi pi-map-marker", desc: t("landing.features.items.branches.desc") }
  ])

  const getPlanFeatures = (p) => {
    const features = []
    
    // Limits
    if (p.max_branches > 0) features.push(`${p.max_branches} ta filial`)
    else if (p.max_branches === 0) features.push(`Cheksiz filallar`)

    if (p.max_warehouses > 0) features.push(`${p.max_warehouses} ta ombor`)
    else if (p.max_warehouses === 0) features.push(`Cheksiz omborlar`)

    if (p.max_workers > 0) features.push(`${p.max_workers} ta xodim`)
    else if (p.max_workers === 0) features.push(`Cheksiz xodimlar`)

    if (p.max_products > 0) features.push(`${p.max_products} tagacha mahsulot`)
    else if (p.max_products === 0) features.push(`Cheksiz mahsulotlar`)

    // Feature Flags (Mapping based on main project pattern)
    if (p.has_subcategory) features.push(t('landing.features.items.warehouse.title'))
    if (p.has_sale_return) features.push("Sotuv qaytarmalari")
    if (p.has_wastage) features.push("Mahsulot yaroqsizligi (Spisanie)")
    if (p.has_stock_audit) features.push("Inventarizatsiya")
    if (p.has_kpi) features.push("KPI va Xodimlar nazorati")
    if (p.has_multi_currency) features.push("Ko'p valyutali hisob-kitob")
    if (p.has_supplier) features.push("Ta'minotchilar bilan ishlash")
    if (p.has_export) features.push("Excel/PDF hisobotlar")
    if (p.has_dashboard) features.push("Analitik Dashboard")
    if (p.has_telegram) features.push("Telegram bot orqali bildirishnomalar")
    
    return features
  }

  // Map remote plans to UI format, fallback to hardcoded if empty
  const plans = computed(() => {
    if (remotePlans.value.length > 0) {
      return remotePlans.value.map(p => ({
        id: p.id,
        name: p.name,
        // Formatting price
        price: p.price_monthly === "0" || p.price_monthly === 0 ? t('landing.pricing.free') : new Intl.NumberFormat('uz-UZ').format(p.price_monthly),
        unit: "oy",
        desc: p.description || p.plan_type_display,
        features: getPlanFeatures(p),
        popular: p.plan_type === 'enterprise' || p.is_popular
      }))
    }

    // Fallback/Placeholder while loading
    return [
      { 
        name: t("landing.pricing.plans.startup.name"), 
        price: "199,000", 
        unit: "oy", 
        desc: t("landing.pricing.plans.startup.desc"), 
        features: tm("landing.pricing.plans.startup.features") 
      },
      { 
        name: t("landing.pricing.plans.business.name"), 
        price: "499,000", 
        unit: "oy", 
        desc: t("landing.pricing.plans.business.desc"), 
        popular: true, 
        features: tm("landing.pricing.plans.business.features") 
      },
      { 
        name: t("landing.pricing.plans.annual.name"), 
        price: "4,999,000", 
        unit: "yil", 
        desc: t("landing.pricing.plans.annual.desc"), 
        features: tm("landing.pricing.plans.annual.features") 
      }
    ]
  })

  const fetchPlans = async () => {
    loading.value = true
    try {
      const response = await subscriptionAPI.getPlans()
      remotePlans.value = response.data
    } catch (error) {
      console.error("Failed to fetch plans:", error)
    } finally {
      loading.value = false
    }
  }

  return {
    navLinks,
    features,
    plans,
    loading,
    fetchPlans
  }
}
