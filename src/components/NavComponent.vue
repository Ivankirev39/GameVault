<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthButton from './AuthButton.vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import { useAuth } from '../modules/useAuth'
const { isLoggedIn } = useAuth()

const searchQuery = ref('')
const showDropdown = ref(false)
const searchResults = ref([])
const { searchGames } = useRawgAPI()
const router = useRouter()
const mobileMenuOpen = ref(false)

watch(searchQuery, async (val) => {
  if (val && val.trim().length > 1) {
    showDropdown.value = true
    const results = await searchGames(val)
    searchResults.value = results.slice(0)
  } else {
    showDropdown.value = false
    searchResults.value = []
  }
})

const selectGame = (game) => {
  showDropdown.value = false
  searchQuery.value = ''
  searchResults.value = []
  router.push(`/game/${game.id}`)
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
<nav class="z-20 w-full bg-[#141414]">
  <div class="flex flex-wrap items-center justify-between px-4 py-4">
    <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <span class="self-center text-4xl font-semibold text-[#A80ADD]">GameVault</span>
    </RouterLink>

    <!-- Hamburger button for mobile -->
    <button
      class="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      @click="mobileMenuOpen = !mobileMenuOpen"
      aria-controls="navbar-sticky"
      aria-expanded="mobileMenuOpen"
    >
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Desktop nav -->
    <div class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
      <ul class="flex flex-row space-x-8 md:text-xl">
        <li>
          <RouterLink to="/"  class="block rounded-sm px-3 py-2 text-[#f4f4f4] hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#A80ADD] md:dark:hover:bg-transparent">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/new-trending" class="block rounded-sm px-3 py-2 text-[#f4f4f4] hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#A80ADD] md:dark:hover:bg-transparent">New and Trending</RouterLink>
        </li>
        <li>
          <RouterLink to="/goats" class="block rounded-sm px-3 py-2 text-[#f4f4f4] hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-[#A80ADD] md:dark:hover:bg-transparent">GOAT</RouterLink>
        </li>
      </ul>
    </div>

    <!-- Desktop search bar -->
    <div class="relative hidden w-64 md:order-2 md:block">
      <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span class="sr-only">Search icon</span>
      </div>
      <input
        type="text"
        id="search-navbar"
        v-model="searchQuery"
        @focus="showDropdown = !!searchResults.length"
        @blur="setTimeout(() => showDropdown = false, 150)"
        class="block w-[350px] rounded-lg border border-gray-900 bg-gray-800 p-2 ps-10 text-sm text-gray-50 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Search..."
        autocomplete="off"
      />
      <!-- DROPDOWN -->
      <ul
        v-if="showDropdown && searchResults.length"
        class="absolute left-0 z-30 mt-1 w-full rounded-lg bg-gray-900 shadow-lg"
      >
        <li
          v-for="game in searchResults"
          :key="game.id"
          @mousedown.prevent="selectGame(game)"
          class="cursor-pointer px-4 py-2 text-gray-100 hover:bg-[#A80ADD] hover:text-[#f4f4f4]"
        >
          {{ game.name }}
        </li>
      </ul>
    </div>
     
    <!-- Desktop auth buttons -->
    <div class=" space-x-2 md:order-4 md:space-x-2 rtl:space-x-reverse items-center hidden md:flex">
      <RouterLink to="/profile"
        v-if="isLoggedIn"
        class="auth-btn !bg-[#A80ADD] hover:!bg-[#121212] !border !border-[#A80ADD] font-medium"
        style="margin-left: 0;"
      >
        My Profile
      </RouterLink>
      <AuthButton />
    </div>
  </div>

  <!-- Mobile menu dropdown -->
  <div
    v-if="mobileMenuOpen"
    class="md:hidden bg-[#141414] px-4 pb-4 pt-2 z-30 w-full border-t border-gray-800"
  >
    <ul class="flex flex-col space-y-2 text-lg">
      <li>
        <RouterLink to="/" class="block rounded-sm px-3 py-2 text-[#f4f4f4] hover:bg-gray-100 hover:text-[#A80ADD]" @click="closeMobileMenu">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/new-trending" class="block rounded-sm px-3 py-2 text-[#f4f4f4] hover:bg-gray-100 hover:text-[#A80ADD]" @click="closeMobileMenu">New and Trending</RouterLink>
      </li>
      <li>
        <RouterLink to="/goats" class="block rounded-sm px-3 py-2 text-[#f4f4f4] hover:bg-gray-100 hover:text-[#A80ADD]" @click="closeMobileMenu">GOAT</RouterLink>
      </li>
    </ul>
    <!-- Mobile search bar -->
    <div class="relative mt-3">
      <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span class="sr-only">Search icon</span>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        @focus="showDropdown = !!searchResults.length"
        @blur="setTimeout(() => showDropdown = false, 150)"
        class="block w-full rounded-lg border border-gray-900 bg-gray-800 p-2 ps-10 text-sm text-gray-50 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Search..."
        autocomplete="off"
      />
      <ul
        v-if="showDropdown && searchResults.length"
        class="absolute left-0 z-30 mt-1 w-full rounded-lg bg-gray-900 shadow-lg"
      >
        <li
          v-for="game in searchResults"
          :key="game.id"
          @mousedown.prevent="selectGame(game); closeMobileMenu()"
          class="cursor-pointer px-4 py-2 text-gray-100 hover:bg-[#A80ADD] hover:text-[#f4f4f4]"
        >
          {{ game.name }}
        </li>
      </ul>
    </div>
    <!-- Mobile auth buttons -->
    <div class="flex flex-col items-center space-y-2 mt-4">
      <RouterLink to="/profile"
        v-if="isLoggedIn"
        class="auth-btn !bg-[#A80ADD] hover:!bg-[#121212] !border !border-[#A80ADD] font-medium w-auto"
        @click="closeMobileMenu"
      >
        My Profile
      </RouterLink>
      <div class="w-auto mt-7">
        <AuthButton />
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.auth-btn {
    margin: 0 16px;
    padding: 8px 16px;
    background-color: #333;
    color: #ededed;
    border: none;
    border-radius: 4px;
    text-decoration: none;
}
</style>
