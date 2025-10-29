<template>
  <div class="mt-8">
    <h3 class="text-2xl font-bold mb-6 border-b border-[#A80ADD] pb-2">Stats</h3>
    <div class="space-y-4 text-lg text-[#f4f4f4]">
      <p><span class="font-semibold">Total favorites:</span> {{ totalFavorites }} games</p>
      <p><span class="font-semibold">Most Recent Favorite:</span> {{ mostRecentFavorite }}</p>
      <p><span class="font-semibold">Favorites Value:</span> ${{ collectionValue }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalFavorites: { type: Number, required: true },
  mostRecentFavorite: { type: String, required: true },
  collectionValue: { type: [String, Number], required: true }
})
</script>
