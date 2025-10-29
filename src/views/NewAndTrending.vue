<template>
<section class="New and trending">

 <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">New and Trending</h1>
      <!-- Purple border under title -->
      <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />
    </header>
    <div class="mx-auto max-w-7xl mt-6 px-4 flex items-center gap-6">
      <!-- Sort Dropdown -->
      <Dropdown
        :options="sortOptions"
        :selected="selectedSort"
        :selectedLabel="selectedSortName"
        placeholder="Sort By"
        :showAllOption="false"
        @select="(value, name) => selectSort(value, name)"
      />
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
        <GameCard
          v-for="game in trending"
          :key="game.id"
          :game="game"
        />
      </div>
    </div>
</section>
<FooterComponent />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'
import GameCard from '../components/GameCard.vue'
import Dropdown from '../components/Dropdown.vue'

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

const selectSort = (value, name) => {
  selectedSort.value = value
  selectedSortName.value = name
}

// Fetch trending games when sort changes
watch(selectedSort, () => {
  fetchTrendingGames()
})

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