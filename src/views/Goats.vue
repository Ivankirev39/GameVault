<template>
 <section class="goats">
    <!-- Header -->
    <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6 px-4">
      <h1 class="text-4xl md:text-5xl font-bold">Best Rated Games of All Time</h1>
      <p class="italic text-lg md:text-3xl mt-6">
        The greatest games ever made, ranked by critics
      </p>
       <!-- Purple border under title -->
      <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />


    </header>

    <div class="mx-auto max-w-7xl mt-6 px-4 flex items-center gap-6">
      <!-- Platform Dropdown -->
      <div class="relative">
        <button 
          @click="togglePlatformDropdown"
          class="inline-flex items-center rounded-lg border-2 border-[#A80ADD] bg-[#121212] px-5 py-2.5 text-center text-lg font-medium text-[#f4f4f4]" 
          type="button"
        >
          {{ selectedPlatformName || 'Platform' }}
          <svg class="ms-3 h-5 w-5 text-[#A80ADD]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div 
          v-if="showPlatformDropdown"
          class="absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-gray-900 shadow-lg"
        >
          <ul class="py-2 text-sm text-gray-200">
            <li>
              <button 
                @click="selectPlatform(null, 'All Platforms')"
                class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                All Platforms
              </button>
            </li>
            <li v-for="platform in platforms" :key="platform.id">
              <button 
                @click="selectPlatform(platform.id, platform.name)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                {{ platform.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Genre Dropdown -->
      <div class="relative">
        <button 
          @click="toggleGenreDropdown"
          class="inline-flex items-center rounded-lg border-2 border-[#A80ADD] bg-[#121212] px-5 py-2.5 text-center text-lg font-medium text-[#f4f4f4]" 
          type="button"
        >
          {{ selectedGenreName || 'Genre' }}
          <svg class="ms-3 h-5 w-5 text-[#A80ADD]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div 
          v-if="showGenreDropdown"
          class="absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-gray-900 shadow-lg"
        >
          <ul class="py-2 text-sm text-gray-200">
            <li>
              <button 
                @click="selectGenre(null, 'All Genres')"
                class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                All Genres
              </button>
            </li>
            <li v-for="genre in genres" :key="genre.id">
              <button 
                @click="selectGenre(genre.id, genre.name)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                {{ genre.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <button 
        v-if="selectedPlatform || selectedGenre"
        @click="clearFilters"
        class="rounded-lg bg-red-600 px-4 py-2 text-[#f4f4f4] cursor-pointer text-xl hover:bg-red-700"
      >
        Clear Filters
      </button>
    </div>


    <!-- Loading state -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 mt-10">
      <div class="bg-[#f4f4f4] p-[10px]">Loading top games...</div>
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="mx-auto max-w-7xl px-4 mt-10">
      <div class="text-red-500 p-[20px]">{{ error }}</div>
    </div>

    <!-- GOAT Grid -->
    <div v-if="!loading && top100Games.length > 0" class="mx-auto max-w-7xl px-4 mt-10">
      <div class="flex flex-wrap gap-5">
        <div
          v-for="(game, index) in top100Games"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300 relative"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <!-- Rank Badge -->
          <div class="absolute top-2 left-2 bg-[#A80ADD] text-[#f4f4f4] font-bold text-xl px-3 py-1 rounded-full">
            #{{ index + 1 }}
          </div>

          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover block"
          />
          <div class="bg-gray-800 h-full p-3 cursor-pointer">
            <router-link :to="`/game/${game.id}`" class="block">
              <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            </router-link>
            <div class="flex justify-between items-center mt-2">
             <p v-if="game.metacritic" class="text-[#A80ADD] text-lg font-bold">
               Metacritic score: {{ game.metacritic }}
              </p>
            </div>
            <p v-if="game.genres && game.genres.length" class="text-gray-300 text-lg mt-1">
              {{ game.genres[0]?.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'

const { getBestRatedGames, getGenres, getPlatforms } = useRawgAPI()

const top100Games = ref([])
const loading = ref(false)
const error = ref(null)


// Filter state
const genres = ref([])
const platforms = ref([])
const selectedGenre = ref(null)
const selectedGenreName = ref(null)
const selectedPlatform = ref(null)
const selectedPlatformName = ref(null)
const showGenreDropdown = ref(false)
const showPlatformDropdown = ref(false)

// Toggle dropdowns
const toggleGenreDropdown = () => {
  showGenreDropdown.value = !showGenreDropdown.value
  showPlatformDropdown.value = false
}

const togglePlatformDropdown = () => {
  showPlatformDropdown.value = !showPlatformDropdown.value
  showGenreDropdown.value = false
}

// Select filters
const selectGenre = async (id, name) => {
  selectedGenre.value = id
  selectedGenreName.value = name
  showGenreDropdown.value = false
  await fetchFilteredGames()
}

const selectPlatform = async (id, name) => {
  selectedPlatform.value = id
  selectedPlatformName.value = name
  showPlatformDropdown.value = false
  await fetchFilteredGames()
}

// Clear filters
const clearFilters = async () => {
  selectedGenre.value = null
  selectedGenreName.value = null
  selectedPlatform.value = null
  selectedPlatformName.value = null
  await fetchFilteredGames()
}

// Fetch filtered games for GOAT section
const fetchFilteredGames = async () => {
  loading.value = true
  error.value = null
  try {
    top100Games.value = await getBestRatedGames({
      genre: selectedGenre.value,
      platform: selectedPlatform.value
    })
    error.value = null
  } catch (e) {
    error.value = 'Failed to load top 100 games'
  } finally {
    loading.value = false
  }
}

// Initial data fetch
onMounted(async () => {
  genres.value = await getGenres()
  platforms.value = await getPlatforms()
  await fetchFilteredGames()
})
</script>

<style>

</style>