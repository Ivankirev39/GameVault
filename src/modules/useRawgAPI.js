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

  // 1. Get Popular Games (for Home page)
  const getPopularGames = async (pageSize = 20) => {
    loading.value = true
    error.value = null
    
    try {
      const url = buildURL('/games', {
        page_size: pageSize,
        ordering: '-rating' // Sort by rating (descending)
      })
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      
      const data = await response.json()
      games.value = data.results
      
      return data.results
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
      games.value = data.results
      
      return data.results
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
      game.value = data
      
      return data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching game details:', err)
    } finally {
      loading.value = false
    }
  }

  // 4. Get New Releases (for NewReleases page)
  const getNewReleases = async (pageSize = 20) => {
    loading.value = true
    error.value = null
    
    try {
      // Get games from last 30 days
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
      
      // Filter out adult games manually
      const filtered = data.results.filter(game => {
        const hasAdultTag = game.tags?.some(tag => tag.id === 16459 || tag.slug === 'adult' || tag.slug === 'nsfw')
        return !hasAdultTag
      })
      
      games.value = filtered
      
      return filtered
    } catch (err) {
      error.value = err.message
      console.error('Error fetching new releases:', err)
    } finally {
      loading.value = false
    }
  }

  // 5. Get Top 100 Games (for Top100 page)
  const getTop100Games = async () => {
    loading.value = true
    error.value = null
    
    try {
      const url = buildURL('/games', {
        page_size: 100,
        ordering: '-metacritic', // Sort by Metacritic score
        metacritic: '80,100' // Only highly rated games
      })
      
      const response = await fetch(url)
      const data = await response.json()
      games.value = data.results
      
      return data.results
    } catch (err) {
      error.value = err.message
      console.error('Error fetching top 100:', err)
    } finally {
      loading.value = false
    }
  }

  // Return everything
  return {
    // State
    games,
    game,
    loading,
    error,
    
    // Methods
    getPopularGames,
    searchGames,
    getGameDetails,
    getNewReleases,
    getTop100Games
  }
}

