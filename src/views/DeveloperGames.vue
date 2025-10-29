<template>
  <section class="mx-auto max-w-7xl mt-6 px-4">
    <h1 class="text-3xl text-[#f4f4f4] font-bold mb-6">
      Games by {{ developerName || 'Developer' }}
    </h1>
    <div v-if="loading" class="bg-[#f4f4f4] p-[10px]">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="games.length > 0" class="flex flex-wrap gap-5">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
      />
    </div> 
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRawgAPI } from '../modules/useRawgAPI'
import GameCard from '../components/GameCard.vue'

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