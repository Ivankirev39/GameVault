import { ref } from 'vue'

export function useGenres() {
  const genres = ref([])
  const loading = ref(false)
  const error = ref(null)
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY // guuuut
  const BASE_URL = 'https://api.rawg.io/api' // also guuuut to store in variable ( research why many are using UPPERcase for that)

  const fetchGenres = async () => {
    loading.value = true
    error.value = null
    try {
      const url = `${BASE_URL}/genres?key=${API_KEY}`
      const response = await fetch(url)
      const data = await response.json()
      genres.value = data.results
    } catch (err) {
      error.value = err.message
      genres.value = []
    } finally {
      loading.value = false
    }
    return genres.value
  }

  return { genres, loading, error, fetchGenres }
}
