<template>

<section class="min-h-screen flex flex-col items-center justify-center py-8">
  <a href="#" class="flex items-center mb-6 md:text-5xl font-semibold text-[#A80ADD]">
    GameVault
  </a>
  <div class="w-[1400px] rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-8 bg-[#121212]">
    <div class="p-8 space-y-4 md:space-y-6 sm:p-4">
      <h1 class="md:text-2xl font-bold leading-tight tracking-tight text-[#f4f4f4]">
        Profile
      </h1>
      <div class="p-2 space-y-2 md:space-y-2  flex flex-col items-center">
        <div v-if="isLoggedIn" class="flex flex-col text-[#f4f4f4] md:text-xl items-center justify-center mt-4">
          Welcome to your profile, {{ currentUser?.email }}!
        </div>
        <div v-else class="flex flex-col text-[#f4f4f4] md:text-xl items-center justify-center mt-4">
          You are not logged in. Please log in to view your profile.
        </div>
      </div>
    </div>
  </div>
</section>

<FooterComponent />

</template>


<script setup>
import { useAuth } from '../modules/useAuth'
import FooterComponent from '../components/FooterComponent.vue'

const { isLoggedIn, currentUser } = useAuth()

</script>

<style>

</style>