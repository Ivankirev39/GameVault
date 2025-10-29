<template>
  <section class="mx-auto max-w-7xl mt-6 px-4">
    <h1 class="text-3xl text-[#f4f4f4] font-bold mb-6">
      Games by {{ publisherName || 'Publisher' }}
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
const { getGamesByPublisher, games, loading, error } = useRawgAPI()

const publisherName = ref('')

async function fetchPublisherName(id) {
  try {
    const res = await fetch(`https://api.rawg.io/api/publishers/${id}?key=${import.meta.env.VITE_RAWG_API_KEY}`)
    if (!res.ok) throw new Error('Failed to fetch publisher')
    const data = await res.json()
    publisherName.value = data.name || ''
  } catch {
    publisherName.value = ''
  }
}

onMounted(() => {
  getGamesByPublisher(route.params.id)
  fetchPublisherName(route.params.id)
})
</script>