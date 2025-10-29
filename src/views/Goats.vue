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
      <Dropdown
        :options="platforms"
        :selected="selectedPlatform"
        :selectedLabel="selectedPlatformName"
        placeholder="Platform"
        :showAllOption="true"
        allLabel="All Platforms"
        @select="selectPlatform"
      />
      <!-- Genre Dropdown -->
      <Dropdown
        :options="genres"
        :selected="selectedGenre"
        :selectedLabel="selectedGenreName"
        placeholder="Genre"
        :showAllOption="true"
        allLabel="All Genres"
        @select="selectGenre"
      />
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
        <GameCard
          v-for="(game, index) in top100Games"
          :key="game.id"
          :game="game"
          :showRank="true"
          :rank="index"
          :showMetacritic="true"
          :showGenre="true"
          :showRating="false"
        />
      </div>
    </div>

    <FooterComponent />
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'
import GameCard from '../components/GameCard.vue'
import Dropdown from '../components/Dropdown.vue'

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