<template>

  <section class="home">
    <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">Game Vault</h1>
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
    <div v-if="!loading && games.length > 0" class="games-grid">
      <div v-for="game in games" :key="game.id" class="game-card">
        <img :src="game.background_image" :alt="game.name" />
        <h3>{{ game.name }}</h3>
        <p>Rating: {{ game.rating }}/5</p>
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
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.game-card {
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
}

.game-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.game-card h3 {
  padding: 10px;
  color: white;
}

.error {
  color: red;
  padding: 20px;
}
</style>