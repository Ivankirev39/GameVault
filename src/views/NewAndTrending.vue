<template>
<section class="New and trending">

 <header class="text-[#f4f4f4] mx-auto max-w-7xl mt-6">
      <h1 class="text-4xl md:text-5xl font-bold">New and Trending</h1>
      <!-- Purple border under title -->
      <hr class="my-6 border-[#A80ADD] sm:mx-auto lg:my-8" />


    </header>

          <div class="mx-auto max-w-7xl mt-6 flex items-center gap-6">
             <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-3 text-xl border-[#A80ADD] text-[#f4f4f4] font-semibold bg-[#121212]">
  <span>Platforms</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-[#A80ADD]" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 14z" clip-rule="evenodd" />
  </svg>
</button>
     <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border-3 text-xl border-[#A80ADD] text-[#f4f4f4] font-semibold bg-[#121212]">
  <span>Genre</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-[#A80ADD]" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 14z" clip-rule="evenodd" />
  </svg>
</button>
      </div>


</section>



<FooterComponent />

</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRawgAPI } from '../modules/useRawgAPI'
import FooterComponent from '../components/FooterComponent.vue'

</script>

<style>

</style>