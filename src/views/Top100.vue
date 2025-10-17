<template>
 <section class="top100">
    <!-- Header -->
    <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6 px-4">
      <h1 class="text-4xl md:text-5xl font-bold">Top 100 Games of All Time</h1>
      <p class="italic text-lg md:text-3xl mt-6">
        The greatest games ever made, ranked by critics
      </p>
       <!-- Purple border under title -->
      <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />


    </header>

    

    <!-- Loading state -->
    <div v-if="loading" class="mx-auto max-w-7xl px-4 mt-10">
      <div class="bg-[#f4f4f4] p-[10px]">Loading top games...</div>
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="mx-auto max-w-7xl px-4 mt-10">
      <div class="text-red-500 p-[20px]">{{ error }}</div>
    </div>

    <!-- Top 100 Grid -->
    <div v-if="!loading && top100Games.length > 0" class="mx-auto max-w-7xl px-4 mt-10">
      <div class="flex flex-wrap gap-5">
        <div
          v-for="(game, index) in top100Games"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300 relative"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <!-- Rank Badge -->
          <div class="absolute top-2 left-2 bg-[#A80ADD] text-[#f4f4f4] font-bold text-xl px-3 py-1 rounded-full z-10">
            #{{ index + 1 }}
          </div>

          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover block"
          />
          <div class="bg-gray-800 h-full p-3 cursor-pointer">
            <a href="#">
              <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            </a>
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

const { getTop100Games } = useRawgAPI()

const top100Games = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    top100Games.value = await getTop100Games()
    error.value = null
  } catch (e) {
    error.value = 'Failed to load top 100 games'
  } finally {
    loading.value = false
  }
})

</script>

<style>

</style>