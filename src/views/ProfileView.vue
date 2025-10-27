<template>
  <section class="profile min-h-screen">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - User Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-gradient-to-t from-[#1c1c1c] via-[#1a1a1a] to-[#A80ADD] rounded-lg p-6 text-[#f4f4f4]">
            <!-- Join Date -->
            <div class="text-center mb-6">
              <p class="text-lg font-bold">Join date {{ memberSince }}</p>
            </div>
            <!-- Avatar -->
            <div class="flex justify-center mb-6">
              <div class="w-32 h-32 rounded-full bg-white p-1">
                <img 
                  :src="avatarUrl"
                  alt="Profile"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <!-- Username -->
            <h2 class="text-3xl font-bold text-center mb-6">
              {{ displayName }}
            </h2>
            <!-- Edit Profile Button -->
            <button class="w-full border-2 border-[#f4f4f4] rounded-full py-2 px-6 hover:bg-[#f4f4f4] hover:text-[#A80ADD] transition-colors font-semibold">
              Edit Profile
            </button>
            <!-- Stats Section -->
            <div class="mt-8">
              <h3 class="text-2xl font-bold mb-6 border-b border-[#A80ADD] pb-2">Stats</h3>
              <div class="space-y-4 text-lg text-[#f4f4f4]">
                <p><span class="font-semibold">Total favorites:</span> {{ favorites.length }} games</p>
                <p><span class="font-semibold">Most Recent Favorite:</span> {{ mostRecentFavorite }}</p>
                <p><span class="font-semibold">Favorites Value:</span> ${{ collectionValue }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Column - Favorite Games -->
        <div class="lg:col-span-2">
          <div class="mb-6">
            <h2 class="text-4xl font-bold text-[#f4f4f4] mb-2">Favorite Games</h2>
            <hr class="border-[#A80ADD] border-2" />
          </div>
          <!-- Loading State -->
          <div v-if="loading" class="bg-[#f4f4f4] text-black p-4 rounded">
            Loading favorites...
          </div>
          <!-- Empty State -->
          <div v-if="!loading && favorites.length === 0" class="text-center py-12">
            <p class="text-gray-400 text-xl mb-4">You haven't added any favorites yet</p>
            <router-link to="/" class="text-[#A80ADD] hover:underline text-lg">
              Browse games to get started →
            </router-link>
          </div>
          <!-- Favorites Grid (refactored to match rest of app) -->
          <div
            v-if="!loading && favorites.length > 0"
            class="flex flex-wrap gap-5"
          >
            <router-link
              v-for="game in favorites"
              :key="game.id"
              :to="`/game/${game.id}`"
              class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300 relative"
              style="flex: 1 1 250px; min-width: 280px; max-width: 320px; text-decoration: none;"
            >
              <!-- Remove Button (X) -->
              <button 
                @click.stop.prevent="removeFavorite(game.id)"
                class="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-[#f4f4f4] w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors"
                style="box-shadow: 0 2px 8px rgba(0,0,0,0.2);"
                title="Remove from favorites"
              >
                ✕
              </button>
              <img
                :src="game.background_image || 'https://via.placeholder.com/300x400'"
                :alt="game.name"
                class="w-full h-[220px] object-cover"
              />
              <div class="w-full h-full bg-gray-800 p-3 cursor-pointer">
                <h5 class="text-2xl font-bold text-[#f4f4f4] break-words">{{ game.name }}</h5>
                <!-- Rating removed -->
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../modules/useAuth'
import FooterComponent from '../components/FooterComponent.vue'
import { db } from '../modules/firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

const router = useRouter()
const { currentUser } = useAuth()

const favorites = ref([])
const loading = ref(false)

// Avatar logic
const avatarUrl = computed(() => {
  // Use Firebase photoURL if available, else placeholder
  return currentUser.value?.photoURL || 'https://via.placeholder.com/150'
})

// Display name from email
const displayName = computed(() => {
  if (!currentUser.value?.email) return 'User'
  return currentUser.value.email.split('@')[0]
})

// Member since date
const memberSince = computed(() => {
  // Try to use Firebase metadata if available
  if (currentUser.value?.metadata?.creationTime) {
    const date = new Date(currentUser.value.metadata.creationTime)
    return date.toLocaleDateString()
  }
  return 'N/A'
})

// Calculate stats
const mostRecentFavorite = computed(() => {
  if (favorites.value.length === 0) return 'N/A'
  return favorites.value[favorites.value.length - 1]?.name || 'N/A'
})

const collectionValue = computed(() => {
  // Rough estimate: $60 per game
  return (favorites.value.length * 60).toLocaleString()
})

// Load favorites from Firestore
const loadFavorites = async () => {
  if (!currentUser.value) return
  loading.value = true
  try {
    const favsRef = collection(db, `users/${currentUser.value.uid}/favorites`)
    const snapshot = await getDocs(favsRef)
    favorites.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (e) {
    favorites.value = []
  } finally {
    loading.value = false
  }
}

// Remove favorite
const removeFavorite = async (gameId) => {
  if (!currentUser.value) return
  await deleteDoc(doc(db, `users/${currentUser.value.uid}/favorites/${gameId}`))
  favorites.value = favorites.value.filter(g => g.id !== gameId)
}

// Load favorites on mount
onMounted(async () => {
  if (!currentUser.value) {
    router.push('/login')
    return
  }
  await loadFavorites()
})
</script>

<style scoped>
/* ...existing code... */
</style>