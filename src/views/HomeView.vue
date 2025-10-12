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
      <div class="w-full h-full bg-gray-800  p-3 shadow-sm cursor-pointer">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#f4f4f4]">{{ game.name }}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-300">Rating: {{ game.rating }}/5</p>
</div>
  </div>
</div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'

const { games, loading, error, getPopularGames } = useRawgAPI()

// Carousel state
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

// Fetch games when component mounts
onMounted(async () => {
  await getPopularGames(12) // Get 12 games
})
</script>

<style scoped>


</style>