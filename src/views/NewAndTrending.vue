<template>
<section class="New and trending">

 <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">New and Trending</h1>
      <!-- Purple border under title -->
      <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />
    </header>
    <div class="mx-auto max-w-7xl mt-6 px-4 flex items-center gap-6">
      <!-- Sort Dropdown -->
      <div class="relative">
        <button 
          @click="toggleSortDropdown"
          class="inline-flex items-center rounded-lg border-2 border-[#A80ADD] bg-[#121212] px-5 py-2.5 text-center text-lg font-medium text-[#f4f4f4]" 
          type="button"
        >
          {{ selectedSortName || 'Sort By' }}
          <svg class="ms-3 h-5 w-5 text-[#A80ADD]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div 
          v-if="showSortDropdown"
          class="absolute z-10 mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-gray-900 shadow-lg"
        >
          <ul class="py-2 text-sm text-gray-200">
            <li v-for="option in sortOptions" :key="option.value">
              <button 
                @click="selectSort(option.value, option.name)"
                class="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-[#f4f4f4]"
              >
                {{ option.name }}
              </button>
            </li>
          </ul>
        </div>
      </div>
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
        <router-link
          v-for="game in trending"
          :key="game.id"
          :to="`/game/${game.id}`"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300"
          style="flex: 1 1 250px; min-width: 280px; text-decoration: none;"
        >
          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover"
          />
          <div class="w-full h-full bg-gray-800  p-3 cursor-pointer">
            <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            <p class="text-gray-300">Rating: {{ game.rating }}/5</p>
          </div>
        </router-link>
      </div>
    </div>
</section>
<FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'

const { getTrendingGames, getNewReleases } = useRawgAPI()

// Trending state
const trending = ref([])
const trendingLoading = ref(false)
const trendingError = ref(null)

// New Releases state
const newReleases = ref([])
const newReleasesLoading = ref(false)
const newReleasesError = ref(null)

// Sort state
const sortOptions = [
  { name: 'Relevance', value: '' },
  { name: 'Date Added', value: '-added' },
  { name: 'Name', value: 'name' },
  { name: 'Release Date', value: '-released' },
  { name: 'Average Rating', value: '-rating' }
]
const selectedSort = ref('')
const selectedSortName = ref('Relevance')
const showSortDropdown = ref(false)

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value
}

const selectSort = (value, name) => {
  selectedSort.value = value
  selectedSortName.value = name
  showSortDropdown.value = false
  fetchTrendingGames()
}

const fetchTrendingGames = async () => {
  trendingLoading.value = true
  try {
    trending.value = await getTrendingGames(18, { ordering: selectedSort.value })
    trendingError.value = null
  } catch (e) {
    trendingError.value = 'Failed to load trending games'
  } finally {
    trendingLoading.value = false
  }
}

onMounted(async () => {
  await fetchTrendingGames()
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
</script>