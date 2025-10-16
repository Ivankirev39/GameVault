<template>

  <section class="home">
    <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">GameVault</h1>
      <p class="italic text-lg md:text-3xl mt-3">
        Looking for what to play? Find it here
      </p>
    </header>

    <div class="mt-10 mx-auto max-w-7xl">
      <!-- Header + Carousel Row -->
      <div class="flex items-center justify-between">
        <h2 id="popular-games" class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4]">
          Top Rated Games
        </h2>
        
        <div class="flex w-[250px] h-[60px] items-center justify-between rounded-md bg-[#121212] p-2">
          <!-- Left Arrow -->
          <button
            class="cursor-pointer rounded-md bg-[#1a1a1a] p-2"
            @click="prevPage"
            :disabled="carouselPage === 0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4f4f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Progress Dots -->
          <div class="flex items-center space-x-2">
            <span
              v-for="n in totalPages"
              :key="n"
              :class="[
                'h-2',
                n - 1 === carouselPage ? 'w-8 bg-[#A80ADD]' : 'w-5 bg-gray-700',
                'rounded-full'
              ]"
            ></span>
          </div>

          <!-- Right Arrow -->
          <button
            class="cursor-pointer rounded-md bg-[#1a1a1a] p-2"
            @click="nextPage"
            :disabled="carouselPage === totalPages - 1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4f4f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

   
    <!-- Loading state -->
    <div v-if="loading" class="bg-[#f4f4f4] p-[10px]">Loading games...</div>
    
    <!-- Error state -->
    <div v-if="error" class="error text-red-500 p-[20px]">{{ error }}</div>
    
<!-- Games grid -->
<div v-if="!loading && games.length > 0" class="flex flex-wrap gap-5">
  <div
    v-for="game in pagedGames"
    :key="game.id"
    class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden m-2 hover:scale-105 transition-transform duration-300"
    style="flex: 1 1 250px; min-width: 280px;"
  >

    <img
      :src="game.background_image"
      :alt="game.name"
      class="w-full h-[300px] object-cover"
    />
      <div class="w-full h-full bg-gray-800  p-3 cursor-pointer">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#f4f4f4]">{{ game.name }}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-300">Rating: {{ game.rating }}/5</p>
</div>
  </div>
</div>

    <!-- New Releases Carousel -->
    <div class="mt-16">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4]">
          New Releases
        </h2>
        <div class="flex w-[250px] h-[60px] items-center justify-between rounded-md bg-[#121212] p-2">
          <button
            class="cursor-pointer rounded-md bg-[#1a1a1a] p-2"
            @click="prevNewPage"
            :disabled="newCarouselPage === 0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4f4f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="flex items-center space-x-2">
            <span
              v-for="n in newTotalPages"
              :key="n"
              :class="[
                'h-2',
                n - 1 === newCarouselPage ? 'w-8 bg-[#A80ADD]' : 'w-5 bg-gray-700',
                'rounded-full'
              ]"
            ></span>
          </div>
          <button
            class="cursor-pointer rounded-md bg-[#1a1a1a] p-2"
            @click="nextNewPage"
            :disabled="newCarouselPage === newTotalPages - 1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4f4f4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="newLoading" class="bg-[#f4f4f4] p-[10px]">Loading new releases...</div>
      <div v-if="newError" class="error text-red-500 p-[20px]">{{ newError }}</div>
      <div v-if="!newLoading && newReleases.length > 0" class="flex flex-wrap gap-5">
        <div
          v-for="game in pagedNewReleases"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden m-2 hover:scale-105 transition-transform duration-300"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover"
          />
          <div class="w-full h-full bg-gray-800  p-3 shadow-sm cursor-pointer">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#f4f4f4]">{{ game.name }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-300">Released: {{ game.released }}</p>
          </div>
        </div>
      </div>
    </div>

    </div>
  </section>

<FooterComponent />

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'

const { getPopularGames, getNewReleases } = useRawgAPI()

// Top Rated Games state
const games = ref([])
const loading = ref(false)
const error = ref(null)
const carouselPage = ref(0)
const pageSize = 4

const totalPages = computed(() =>
  Math.ceil(games.value.length / pageSize)
)
const pagedGames = computed(() => {
  const start = carouselPage.value * pageSize
  return games.value.slice(start, start + pageSize)
})
function prevPage() {
  if (carouselPage.value > 0) carouselPage.value--
}
function nextPage() {
  if (carouselPage.value < totalPages.value - 1) carouselPage.value++
}

// New Releases state
const newReleases = ref([])
const newLoading = ref(false)
const newError = ref(null)
const newCarouselPage = ref(0)
const newPageSize = 4

const newTotalPages = computed(() =>
  Math.ceil(newReleases.value.length / newPageSize)
)
const pagedNewReleases = computed(() => {
  const start = newCarouselPage.value * newPageSize
  return newReleases.value.slice(start, start + newPageSize)
})
function prevNewPage() {
  if (newCarouselPage.value > 0) newCarouselPage.value--
}
function nextNewPage() {
  if (newCarouselPage.value < newTotalPages.value - 1) newCarouselPage.value++
}

// Fetch games when component mounts
onMounted(async () => {
  loading.value = true
  try {
    games.value = await getPopularGames(16)
    error.value = null
  } catch (e) {
    error.value = 'Failed to load top rated games'
  } finally {
    loading.value = false
  }

  newLoading.value = true
  try {
    newReleases.value = await getNewReleases(16)
    newError.value = null
  } catch (e) {
    newError.value = 'Failed to load new releases'
  } finally {
    newLoading.value = false
  }
})
</script>

<style scoped>


</style>