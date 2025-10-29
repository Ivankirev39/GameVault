<template>
  <section class="home">
    <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">GameVault</h1>
      <p class="italic text-lg md:text-3xl mt-3">
        Looking for what to play? Find it here
      </p>
    </header>

    <div class="mt-10 mx-auto max-w-7xl">
      <!-- Players Choice Carousel -->
      <Carousel :items="games" :pageSize="4">
        <template #header>
          <h2 id="popular-games" class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4]">
            Players Choice
          </h2>
        </template>
        <template #default="{ pagedItems }">
          <GameCard
            v-for="game in pagedItems"
            :key="game.id"
            :game="game"
          />
        </template>
      </Carousel>

      <!-- New Releases Carousel -->
      <div class="mt-16">
        <Carousel :items="newReleases" :pageSize="4">
          <template #header>
            <h2 class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4]">
              New Releases
            </h2>
          </template>
          <template #default="{ pagedItems }">
            <GameCard
              v-for="game in pagedItems"
              :key="game.id"
              :game="game"
              :showReleaseDate="true"
              :showRating="false"
            />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'
import GameCard from '../components/GameCard.vue'
import Carousel from '../components/Carousel.vue'

const { getPopularGames, getNewReleases } = useRawgAPI()

// Top Rated Games state
const games = ref([])
const loading = ref(false)
const error = ref(null)

// New Releases state
const newReleases = ref([])
const newLoading = ref(false)
const newError = ref(null)

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