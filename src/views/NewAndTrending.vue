<template>
<section class="New and trending">

 <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">New and Trending</h1>
      <!-- Purple border under title -->
      <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />


    </header>

          <div class="mx-auto max-w-7xl mt-6 flex items-center gap-6">
             <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-3 text-lg border-[#A80ADD] text-[#f4f4f4] font-semibold bg-[#121212]">
  <span>Platforms</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] text-[#A80ADD]" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 14z" clip-rule="evenodd" />
  </svg>
</button>
     <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-3 text-lg border-[#A80ADD] text-[#f4f4f4] font-semibold bg-[#121212]">
  <span>Genre</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] text-[#A80ADD]" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 14z" clip-rule="evenodd" />
  </svg>
</button>
      </div>



    <!-- TRENDING THIS WEEK SECTION -->
    <div class="mt-10 mx-auto max-w-7xl px-4">
      <h2 class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4] mb-6">
         Trending This Week
      </h2>

      <!-- Loading state -->
      <div v-if="trendingLoading" class="bg-[#f4f4f4] p-[10px]">Loading trending games...</div>
      
      <!-- Error state -->
      <div v-if="trendingError" class="text-red-500 p-[20px]">{{ trendingError }}</div>
      
      <!-- Games Grid -->
      <div v-if="!trendingLoading && trending.length > 0" class="flex flex-wrap gap-5">
        <div
          v-for="game in trending"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover"
          />
               <div class="w-full h-full bg-gray-800  p-3 cursor-pointer">
            <a href="#">
              <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            </a>
            <p class="text-gray-300">Rating: {{ game.rating }}/5</p>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW RELEASES SECTION -->
    <div class="mt-16 mx-auto max-w-7xl px-4">
      <h2 class="text-3xl md:text-4xl underline decoration-[#A80ADD] font-semibold text-[#f4f4f4] mb-6">
        New Releases (Last 30 Days)
      </h2>

      <!-- Loading state -->
      <div v-if="newReleasesLoading" class="bg-[#f4f4f4] p-[10px]">Loading new releases...</div>
      
      <!-- Error state -->
      <div v-if="newReleasesError" class="text-red-500 p-[20px]">{{ newReleasesError }}</div>
      
      <!-- Games Grid -->
      <div v-if="!newReleasesLoading && newReleases.length > 0" class="flex flex-wrap gap-5">
        <div
          v-for="game in newReleases"
          :key="game.id"
          class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300"
          style="flex: 1 1 250px; min-width: 280px;"
        >
          <img
            :src="game.background_image"
            :alt="game.name"
            class="w-full h-[300px] object-cover"
          />
          <div class="bg-gray-800 p-3 cursor-pointer">
            <a href="#">
              <h5 class="text-2xl font-bold text-[#f4f4f4]">{{ game.name }}</h5>
            </a>
            <p class="text-gray-300">Released: {{ game.released }}</p>
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



const { getTrendingGames, getNewReleases } = useRawgAPI()

// Trending state
const trending = ref([])
const trendingLoading = ref(false)
const trendingError = ref(null)

// New Releases state
const newReleases = ref([])
const newReleasesLoading = ref(false)
const newReleasesError = ref(null)

// Fetch data on mount
onMounted(async () => {
  // Fetch Trending
  trendingLoading.value = true
  try {
    trending.value = await getTrendingGames(12)
    trendingError.value = null
  } catch (e) {
    trendingError.value = 'Failed to load trending games'
  } finally {
    trendingLoading.value = false
  }

  // Fetch New Releases
  newReleasesLoading.value = true
  try {
    newReleases.value = await getNewReleases(12)
    newReleasesError.value = null
  } catch (e) {
    newReleasesError.value = 'Failed to load new releases'
  } finally {
    newReleasesLoading.value = false
  }
})

</script>

<style>

</style>