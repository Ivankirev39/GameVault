<template>
<footer class="bg-[#141414] mt-10">
  <div class="mx-auto w-full max-w-screen-xl px-4 py-6 lg:py-8">
    <div class="flex flex-col md:flex-row md:justify-between">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 w-full">
        <div>
          <h2 class="mb-4 text-lg md:text-2xl font-bold text-[#f4f4f4]">Home</h2>
          <ul class="font-medium text-base md:text-xl text-gray-400">
            <li class="mb-2 md:mb-4">
              <RouterLink to="/profile" class="hover:underline">My profile</RouterLink>
            </li>
            <li class="mb-2 md:mb-4">
              <RouterLink to="/login" class="hover:underline">Login/register</RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 text-lg md:text-2xl font-bold text-[#f4f4f4]">Games</h2>
          <ul class="font-medium text-base md:text-xl text-gray-400">
            <li class="mb-2 md:mb-4">
              <RouterLink to="/" class="hover:underline">Home</RouterLink>
            </li>
            <li class="mb-2 md:mb-4">
              <RouterLink to="/new-trending" class="hover:underline">New and Trending</RouterLink>
            </li>
            <li class="mb-2 md:mb-4">
              <RouterLink to="/goats" class="hover:underline">GOAT</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span class="text-xs md:text-sm text-gray-400 sm:text-center">@2025 GameVault, All Rights Reserved </span>
      <ul class="mt-3 flex flex-wrap items-center text-xs md:text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400 [&>li:not(:last-child)::after]:content-['|'] [&>li:not(:last-child)::after]:mx-3 [&>li:not(:last-child)::after]:text-gray-400">
        <li><a href="#" class="hover:underline">Terms Of Use</a></li>
        <li><a href="#" class="hover:underline">Privacy Policy</a></li>
        <li><a href="#" class="hover:underline">Cookie Policy</a></li>
      </ul>
    </div>
  </div>
</footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style>
/* ...existing code... */
</style>