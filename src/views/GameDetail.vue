<template>
  <section class="game-detail min-h-screen text-[#f4f4f4]">
    <!-- Loading State -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 py-20">
      <div class="bg-[#f4f4f4] text-black p-4 rounded">Loading game details...</div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="mx-auto max-w-7xl px-4 py-20">
      <div class="text-red-500 p-5 bg-red-900/20 rounded">{{ error }}</div>
      <router-link to="/" class="text-[#A80ADD] mt-4 inline-block">
        ← Back to Home
      </router-link>
    </div>

    <!-- Game Details -->
    <div v-if="!loading && game" class="mx-auto max-w-7xl px-4 py-8">
      
      <!-- Back Button -->
      <router-link to="/" class="text-[#A80ADD] mb-6 text-lg">
        ← Back
      </router-link>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold mb-8 border-b-2 border-[#A80ADD] pb-4">
        {{ game.name }}
      </h1>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        <!-- Left Column - Image & Add to Favorites -->
        <div class="lg:col-span-1">
          <div class="border-4 border-[#A80ADD] rounded-lg overflow-hidden mb-6">
            <img 
              :src="game.background_image" 
              :alt="game.name"
              class="w-full h-[258px] object-cover"
            />
          </div>

          <!-- Add to Favorites Button -->
          <button 
            @click="toggleFavorite"
            class="w-full bg-transparent border-2 border-[#A80ADD] text-[#A80ADD] hover:bg-[#A80ADD] hover:text-[#f4f4f4] font-bold py-3 px-6 rounded-lg transition-colors text-lg"
          >
            {{ isFavorited ? '- Remove from favorites' : '+ Add to favorites' }}
          </button>
        </div>

        <!-- Right Column - Game Info -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Description -->
          <div>
            <div 
              class="text-gray-300 leading-relaxed prose prose-invert max-w-none"
              v-html="game.description"
            ></div>
          </div>

          <!-- Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 border-t-2 border-[#A80ADD] pt-8">
            
            <!-- Left Info Column -->
            <div class="space-y-4">
              <!-- Platforms -->
              <div v-if="game.platforms && game.platforms.length">
                <h3 class="text-[#f4f4f4] font-semibold mb-2">Platforms</h3>
                <p class="text-gray-300">
                  {{ game.platforms.slice(0).map(p => p.platform.name).join(', ') }}
                </p>
              </div>

              <!-- Developer -->
            <div v-if="game.developers && game.developers.length">
  <h3 class="text-[#f4f4f4] font-semibold mb-2">Developer</h3>
  <router-link
    :to="`/developer/${game.developers[0].id}`"
    class="text-[#A80ADD] hover:underline"
  >
    {{ game.developers[0].name }}
  </router-link>
</div>

              <!-- Genre -->
              <div v-if="game.genres && game.genres.length">
                <h3 class="text-[#f4f4f4] font-semibold mb-2">Genre</h3>
                <p class="text-gray-300">{{ game.genres.map(g => g.name).join(', ') }}</p>
              </div>
            </div>

            <!-- Right Info Column -->
            <div class="space-y-4">
              <!-- Release Date -->
              <div v-if="game.released">
                <h3 class="text-[#f4f4f4] font-semibold mb-2">Release date</h3>
                <p class="text-gray-300">{{ formatDate(game.released) }}</p>
              </div>

              <!-- Publisher -->
              <div v-if="game.publishers && game.publishers.length">
                <h3 class="text-[#f4f4f4] font-semibold mb-2">Publisher</h3>
  <router-link
    :to="`/publisher/${game.publishers[0].id}`"
    class="text-[#A80ADD] hover:underline"
  >
    {{ game.publishers[0].name }}
  </router-link>              </div>

              <!-- Age Rating -->
              <div v-if="game.esrb_rating">
                <h3 class="text-[#f4f4f4] font-semibold mb-2">Age Rating</h3>
                <p class="text-gray-300">{{ game.esrb_rating.name }}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- Ratings & Where to Buy Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t-2 border-[#A80ADD] pt-8">
        
        <!-- Ratings -->
       <div>
  <h2 class="text-2xl font-bold mb-6">Ratings:</h2>
  
  <!-- Rating & Metacritic -->
  <div class="flex gap-4 mb-4">
    <div class="bg-[#A80ADD] px-4 py-2 rounded-lg">
      <span class="text-[#f4f4f4] font-bold text-lg">
        ⭐ {{ game.rating }}/5
      </span>
    </div>
     <div v-if="game.metacritic" class="bg-green-600 px-4 py-2 rounded-lg">
      <span class="text-[#f4f4f4]font-bold text-lg">
        Metacritic: {{ game.metacritic }}
      </span>
    </div>
  </div>
</div>


        <!-- Where to Buy -->
        <div v-if="game.stores && game.stores.length">
    <div v-if="game.stores && game.stores.length">
  <h2 class="text-2xl font-bold mb-6">Where to buy</h2>
  <div class="flex flex-wrap gap-4">
  <a 
  v-for="store in game.stores.slice(0, 4)" 
  :key="store.id"
  :href="getStoreUrl(store)"
  target="_blank"
  class="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
>
  <span class="text-2xl">
    {{ getStoreIcon(store.store.slug) }}
  </span>
</a>
  </div>
</div>
</div>

      </div>

      <!-- Screenshots -->
      <div v-if="screenshots.length > 0" class="border-t-2 border-[#A80ADD] pt-8">
        <h2 class="text-2xl font-bold mb-6">Images</h2>
        <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
          <img 
            v-for="screenshot in screenshots.slice(0, 4)" 
            :key="screenshot.id"
            :src="screenshot.image"
            class="w-full h-[350px] object-cover rounded hover:opacity-80 transition-opacity cursor-pointer"
            @click="openScreenshot(screenshot.image)"
          />
        </div>
      </div>

    </div>

  
  </section>
    <FooterComponent />

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'
// Add import for favorites composable
import { useFavorites } from '../modules/useFavorites.js'

const route = useRoute()
const { getGameDetails } = useRawgAPI()
// Use favorites composable
const { isFavorited, addFavorite, removeFavorite, checkFavorite } = useFavorites()

const game = ref(null)
const screenshots = ref([])
const loading = ref(false)
const error = ref(null)

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Toggle favorite
const toggleFavorite = async () => {
  if (!game.value) return
  if (isFavorited.value) {
    await removeFavorite(game.value.id)
  } else {
    await addFavorite({
      id: game.value.id,
      name: game.value.name,
      background_image: game.value.background_image
    })
  }
  await checkFavorite(game.value.id)
}

// Open screenshot
const openScreenshot = (imageUrl) => {
  window.open(imageUrl, '_blank')
}

// Fetch game details
const fetchGameDetails = async () => {
  loading.value = true
  try {
    const gameId = route.params.id
    game.value = await getGameDetails(gameId)
    // Fetch screenshots
    if (game.value) {
      const screenshotsUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${import.meta.env.VITE_RAWG_API_KEY}`
      const response = await fetch(screenshotsUrl)
      const data = await response.json()
      screenshots.value = data.results || []
      // Check if this game is favorited
      await checkFavorite(game.value.id)
    }
    error.value = null
  } catch (e) {
    error.value = 'Failed to load game details'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Helper to construct store URL (Only takes you to store homepage, because RAWG API doesn't provide direct purchase links)
const getStoreUrl = (store) => {
  // Use direct URL if available
  if (store.url) return store.url
  // Fallback to store homepage
  if (store.store && store.store.domain) {
    return `https://${store.store.domain}`
  }
  return '#'
}


const getStoreIcon = (slug) => {
  switch (slug) {
    case 'steam': return '🟦'
    case 'epic-games': return '🟪'
    case 'gog': return '🟩'
    case 'playstation-store': return '🎮'
    case 'xbox-store': return '🟦'
    case 'nintendo': return '🔴'
    default: return '🛒'
  }
}

// Fetch game details on mount
onMounted(fetchGameDetails)

// Watch for route changes and refetch
watch(() => route.params.id, fetchGameDetails)
</script>

<style scoped>
/* Remove default link styles from description HTML */
:deep(a) {
  color: #A80ADD;

}

:deep(p) {
  margin-bottom: 1rem;
}
</style>