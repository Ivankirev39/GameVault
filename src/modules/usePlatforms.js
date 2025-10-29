import { ref } from 'vue'

export function usePlatforms() {
  const platforms = ref([])
  const loading = ref(false)
  const error = ref(null)
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY
  const BASE_URL = 'https://api.rawg.io/api'

  const fetchPlatforms = async () => {
    loading.value = true
    error.value = null
    try {
      const url = `${BASE_URL}/platforms?key=${API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      platforms.value = data.results
    } catch (err) {
      error.value = err.message
      platforms.value = []
    } finally {
      loading.value = false
    }
    return platforms.value
  }

  return { platforms, loading, error, fetchPlatforms }
}
