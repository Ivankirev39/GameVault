<template>

  <section class="home">
    <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">GameVault</h1>
      <p class="italic text-lg md:text-2xl mt-3">
        Looking for what to play? Find it here
      </p>
    </header>

    <div class="mt-10 mx-auto max-w-7xl">
      <h2 id="popular-games" class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4]">
        Popular Games
      </h2>
   
    <!-- Loading state -->
    <div v-if="loading">Loading games...</div>
    
    <!-- Error state -->
    <div v-if="error" class="error">{{ error }}</div>
    
<!-- Games grid -->
<div v-if="!loading && games.length > 0" class="flex flex-wrap gap-5 p-3">
  <div
    v-for="game in games"
    :key="game.id"
    class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden m-2 hover:scale-105 transition-transform duration-300"
    style="flex: 1 1 250px; min-width: 280px;"
  >

    <img
      :src="game.background_image"
      :alt="game.name"
      class="w-full h-[300px] object-cover"
    />
      <div class="w-full h-full bg-gray-800  p-3 shadow-sm">
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
import { onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'

const { games, loading, error, getPopularGames } = useRawgAPI()

// Fetch games when component mounts
onMounted(async () => {
  await getPopularGames(12) // Get 12 games
})
</script>

<style scoped>


.game-card h3 {
  padding: 10px;
  color: white;
}

.error {
  color: red;
  padding: 20px;
}
</style>