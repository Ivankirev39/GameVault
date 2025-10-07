<template>
  <section class="home">
    
    <h1 class="md:text-4xl font-bold text-[#f4f4f4] mt-6">
      GameVault
    </h1>

    <h2 class="md:text-4xl italic text-[#f4f4f4] mt-5">
      Looking for what to play? Find it here
    </h2>

    <h3 class="md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4] mt-10">
      Popular Games
    </h3>
   
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