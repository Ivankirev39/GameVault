<template>
<section class="New and trending">

 <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">New and Trending</h1>
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




    <!-- TRENDING -->
    <div class="mt-10 mx-auto max-w-7xl px-4">
      <h2 class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4] mb-6">
         Trending this week
      </h2>

      <!-- Loading state -->
      <div v-if="trendingLoading" class="bg-[#f4f4f4] p-[10px]">Loading trending games...</div>
      
      <!-- Error state -->
      <div v-if="trendingError" class="text-red-500 p-[20px]">{{ trendingError }}</div>
      
      <!-- Games Grid -->
      <div v-if="!trendingLoading && trending.length > 0" class="flex flex-wrap gap-5">
        <div
          v-for="game in trending"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover"
          />
               <div class="w-full h-full bg-gray-800  p-3 cursor-pointer">
            <router-link :to="`/game/${game.id}`" class="block">
              <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            </router-link>
            <p class="text-gray-300">Rating: {{ game.rating }}/5</p>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW RELEASES SECTION -->
    <div class="mt-16 mx-auto max-w-7xl px-4">
      <h2 class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4] mb-6">
        New Releases (Last 30 Days)
      </h2>

      <!-- Loading state -->
      <div v-if="newReleasesLoading" class="bg-[#f4f4f4] p-[10px]">Loading new releases...</div>
      
      <!-- Error state -->
      <div v-if="newReleasesError" class="text-red-500 p-[20px]">{{ newReleasesError }}</div>
      
      <!-- Games Grid -->
      <div v-if="!newReleasesLoading && newReleases.length > 0" class="flex flex-wrap gap-5">
        <div
          v-for="game in newReleases"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover"
          />
          <div class="bg-gray-800 p-3 cursor-pointer">
            <router-link :to="`/game/${game.id}`" class="block">
              <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            </router-link>
            <p class="text-gray-300">Released: {{ game.released }}</p>
          </div>
        </div>
      </div>
    </div>


</section>



<FooterComponent />

</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'

const { getTrendingGames, getNewReleases, getGenres, getPlatforms } = useRawgAPI()

// Trending state
const trending = ref([])
const trendingLoading = ref(false)
const trendingError = ref(null)

// New Releases state
const newReleases = ref([])
const newReleasesLoading = ref(false)
const newReleasesError = ref(null)

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
const selectGenre = (id, name) => {
  selectedGenre.value = id
  selectedGenreName.value = name
  showGenreDropdown.value = false
  fetchFilteredGames()
}

const selectPlatform = (id, name) => {
  selectedPlatform.value = id
  selectedPlatformName.value = name
  showPlatformDropdown.value = false
  fetchFilteredGames()
}

// Clear filters
const clearFilters = () => {
  selectedGenre.value = null
  selectedGenreName.value = null
  selectedPlatform.value = null
  selectedPlatformName.value = null
  fetchFilteredGames()
}

const fetchFilteredGames = async () => {
  const filters = {
    genre: selectedGenre.value,
    platform: selectedPlatform.value
  }

  // Only fetch Trending with filters
  trendingLoading.value = true
  try {
    trending.value = await getTrendingGames(12, filters)
    trendingError.value = null
  } catch (e) {
    trendingError.value = 'Failed to load trending games'
  } finally {
    trendingLoading.value = false
  }

  // New Releases stays unfiltered - remove this section or fetch without filters
  // Don't call it here, keep the original onMounted fetch
}

onMounted(async () => {
  genres.value = await getGenres()
  platforms.value = await getPlatforms()

  // Fetch trending (will be filtered later)
  await fetchFilteredGames()

  // Fetch new releases ONCE without filters
  newReleasesLoading.value = true
  try {
    newReleases.value = await getNewReleases(12)  // No filters
    newReleasesError.value = null
  } catch (e) {
    newReleasesError.value = 'Failed to load new releases'
  } finally {
    newReleasesLoading.value = false
  }
})


// Initial data fetch
onMounted(async () => {
  // Fetch genres and platforms
  genres.value = await getGenres()
  platforms.value = await getPlatforms()

  // Fetch games
  fetchFilteredGames()
})
</script>