<template>
  <section class="mx-auto max-w-7xl mt-6 px-4">
    <h1 class="text-3xl text-[#f4f4f4] font-bold mb-6">
      Games by {{ developerName || 'Developer' }}
    </h1>
    <div v-if="loading" class="bg-[#f4f4f4] p-[10px]">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="games.length > 0" class="flex flex-wrap gap-5">
      <router-link
        v-for="game in games"
        :key="game.id"
        :to="`/game/${game.id}`"
        class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden m-2 hover:scale-105 transition-transform duration-300"
        style="flex: 1 1 250px; min-width: 280px; text-decoration: none;"
      >
        <img
          :src="game.background_image"
          :alt="game.name"
          class="w-full h-[300px] object-cover"
        />
        <div class="w-full h-full bg-gray-800 p-3 cursor-pointer">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#f4f4f4]">{{ game.name }}</h5>
          <p class="mb-3 font-normal text-gray-300">Rating: {{ game.rating }}/5</p>
        </div>
      </router-link>
    </div> 
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRawgAPI } from '../modules/useRawgAPI'

const route = useRoute()
const { getGamesByDeveloper, games, loading, error } = useRawgAPI()

const developerName = ref('')

async function fetchDeveloperName(id) {
  try {
    const res = await fetch(`https://api.rawg.io/api/developers/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`)
    if (!res.ok) throw new Error('Failed to fetch developer')
    const data = await res.json()
    developerName.value = data.name || ''
  } catch {
    developerName.value = ''
  }
}

onMounted(() => {
  getGamesByDeveloper(route.params.id)
  fetchDeveloperName(route.params.id)
})
</script>