const API_KEY = import.meta.env.VITE_RAWG_API_KEY




import { ref } from 'vue'

export function useRawgAPI() {
  // State
  const games = ref([])
  const game = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // API Configuration
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY
  const BASE_URL = 'https://api.rawg.io/api'
  
  // Helper function to build URL
  const buildURL = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`)
    url.searchParams.append('key', API_KEY)
    
    // Add additional parameters
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.append(key, params[key])
      }
    })
    
    return url.toString()
  }

  // Helper to check if a game is NSFW/adult
const isNSFW = (game) => {
  return game.tags?.some(tag => tag.id === 16459 || tag.slug === 'adult' || tag.slug === 'nsfw')
}

// 1. Get Popular Games (for Home page)
const getPopularGames = async (pageSize = 20, filters = {}) => {
  loading.value = true
  error.value = null

  try {
    const url = buildURL('/games', {
      page_size: pageSize,
      ordering: '-rating'
    })

    const response = await fetch(url)
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    const data = await response.json()
    // Filter NSFW unless allowed
    const filtered = (filters.allowNSFW)
      ? data.results
      : data.results.filter(game => !isNSFW(game))
    games.value = filtered
    return filtered
  } catch (err) {
    error.value = err.message
    console.error('Error fetching popular games:', err)
  } finally {
    loading.value = false
  }
}

// 2. Search Games (for SearchBar)
const searchGames = async (query, filters = {}) => {
  if (!query || query.trim() === '') {
    games.value = []
    return []
  }

  loading.value = true
  error.value = null

  try {
    const url = buildURL('/games', {
      search: query,
      page_size: filters.pageSize || 20,
      genres: filters.genre,
      platforms: filters.platform,
      ordering: filters.ordering || '-rating'
    })

    const response = await fetch(url)
    const data = await response.json()
    // Filter NSFW unless allowed
    const filtered = (filters.allowNSFW)
      ? data.results
      : data.results.filter(game => !isNSFW(game))
    games.value = filtered
    return filtered
  } catch (err) {
    error.value = err.message
    console.error('Error searching games:', err)
  } finally {
    loading.value = false
  }
}

// 3. Get Game Details (for GameDetail page)
const getGameDetails = async (gameId) => {
  loading.value = true
  error.value = null
  
  try {
    const url = buildURL(`/games/${gameId}`)
    
    const response = await fetch(url)
    const data = await response.json()
    
    return data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching game details:', err)
  } finally {
    loading.value = false
  }
}


  // 4. Get New Releases (for NewReleases page)
  const getNewReleases = async (pageSize = 20, filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const dateString = thirtyDaysAgo.toISOString().split('T')[0]

      const url = buildURL('/games', {
        dates: `${dateString},${new Date().toISOString().split('T')[0]}`,
        ordering: '-released',
        page_size: pageSize
      })

      const response = await fetch(url)
      const data = await response.json()
      // Filter NSFW unless allowed
      const filtered = (filters.allowNSFW)
        ? data.results
        : data.results.filter(game => !isNSFW(game))
      games.value = filtered
      return filtered
    } catch (err) {
      error.value = err.message
      console.error('Error fetching new releases:', err)
    } finally {
      loading.value = false
    }
  }

  // 5. Get Best Rated Games (for GOAT page)
  const getBestRatedGames = async (filters = {}) => {
    loading.value = true
    error.value = null

    try {
      const url = buildURL('/games', {
        page_size: 100,
        ordering: '-metacritic',
        metacritic: '80,100',
        genres: filters.genre,
        platforms: filters.platform
      })

      const response = await fetch(url)
      const data = await response.json()
      // Filter NSFW unless allowed
      const filtered = (filters.allowNSFW)
        ? data.results
        : data.results.filter(game => !isNSFW(game))
      games.value = filtered
      return filtered
    } catch (err) {
      error.value = err.message
      console.error('Error fetching top 100:', err)
    } finally {
      loading.value = false
    }
  }

// In src/modules/useRawgAPI.js

// Get all genres
const getGenres = async () => {
  try {
    const url = buildURL('/genres', {})
    const response = await fetch(url)
    const data = await response.json()
    return data.results
  } catch (err) {
    console.error('Error fetching genres:', err)
    return []
  }
}

// Get all platforms
const getPlatforms = async () => {
  try {
    const url = buildURL('/platforms', {})
    const response = await fetch(url)
    const data = await response.json()
    return data.results
  } catch (err) {
    console.error('Error fetching platforms:', err)
    return []
  }
}

const getTrendingGames = async (pageSize = 20, filters = {}) => {
  loading.value = true
  error.value = null

  try {
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    const dateString = threeMonthsAgo.toISOString().split('T')[0]
    const today = new Date().toISOString().split('T')[0]

    const url = buildURL('/games', {
      page_size: pageSize,
      dates: `${dateString},${today}`,
      ordering: filters.ordering || '-rating',
      exclude_additions: 1
    })

    const response = await fetch(url)
    const data = await response.json()
    // Filter NSFW unless allowed
    const filtered = (filters.allowNSFW)
      ? data.results
      : data.results.filter(game => !isNSFW(game))
    return filtered
  } catch (err) {
    error.value = err.message
    console.error('Error fetching trending games:', err)
  } finally {
    loading.value = false
  }
}

return {
  games,
  loading,
  error,
  getPopularGames,
  getNewReleases,
  getTrendingGames,
  getBestRatedGames,
  getGenres,
  getPlatforms,
  searchGames,
  getGameDetails  
}

  
}