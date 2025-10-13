<template>
<footer class="bg-[#141414] mt-10">
  <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div class="md:flex md:justify-between">
      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
        <div>
          <h2 class="mb-6 md:text-2xl font-bold text-[#f4f4f4]">Home</h2>
          <ul class="font-medium md:text-xl text-gray-400">
            <li class="mb-4">
              <Routerlink to="/" class="hover:underline">My profile</Routerlink>
            </li>
            <li class="mb-4">
              <Routerlink to="/" class="hover:underline">Login/register</Routerlink>
            </li>
            <li class="mb-4">
              <Routerlink to="/" class="hover:underline">Browse</Routerlink>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 md:text-2xl font-bold text-[#f4f4f4]">Games</h2>
          <ul class="font-medium md:text-xl text-gray-400">
              <li class="mb-4">
              <Routerlink to="/" class="hover:underline">Browse</Routerlink>
            </li>
            <li class="mb-4">
              <Routerlink to="/" class="hover:underline">New releases</Routerlink>
            </li>
              <li class="mb-4">
              <Routerlink to="/" class="hover:underline">Top Rated</Routerlink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />
    <div class="sm:flex sm:items-center sm:justify-between">
      <span class="text-sm text-gray-400 sm:text-center">@2025 GameVault, All Rights Reserved </span>
  <ul class="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400 [&>li:not(:last-child)::after]:content-['|'] [&>li:not(:last-child)::after]:mx-3 [&>li:not(:last-child)::after]:text-gray-400">
  <li><a href="#" class="hover:underline">Terms Of Use</a></li>
  <li><a href="#" class="hover:underline">Privacy Policy</a></li>
  <li><a href="#" class="hover:underline">Cookie Policy</a></li>
</ul>

    </div>
  </div>
</footer>

</template>


<script setup>


</script>

<style>

</style>