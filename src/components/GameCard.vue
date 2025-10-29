<template>
  <router-link
    :to="`/game/${game.id}`"
    class="bg-[#2a2a2a] rounded-lg border-[#A80ADD] border-b-10 overflow-hidden hover:scale-105 transition-transform duration-300 relative"
    style="flex: 1 1 250px; min-width: 280px; text-decoration: none;"
  >
    <!-- Rank badge (GOATs) -->
    <div v-if="showRank && typeof rank === 'number'" class="absolute top-2 left-2 bg-[#A80ADD] text-[#f4f4f4] font-bold text-xl px-3 py-1 rounded-full">
      #{{ rank + 1 }}
    </div>
    <!-- Remove button (Favorites/Profile) -->
    <button
      v-if="showRemove"
      @click.stop.prevent="onRemove && onRemove(game.id)"
      class="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-[#f4f4f4] w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer transition-colors"
      title="Remove from favorites"
      style="box-shadow: 0 2px 8px rgba(0,0,0,0.2);"
    >✕</button>
    <img
      :src="game.background_image || 'https://via.placeholder.com/300x400'"
      :alt="game.name"
      class="w-full h-[300px] object-cover"
    />
    <div class="w-full h-full bg-gray-800 p-3 cursor-pointer">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#f4f4f4] break-words">{{ game.name }}</h5>
      <p v-if="showRating" class="mb-1 font-normal text-gray-300">Rating: {{ game.rating }}/5</p>
      <p v-if="showMetacritic && game.metacritic" class="text-[#A80ADD] text-lg font-bold">Metacritic: {{ game.metacritic }}</p>
      <p v-if="showGenre && game.genres && game.genres.length" class="text-gray-300 text-lg mt-1">{{ game.genres[0]?.name }}</p>
      <p v-if="showReleaseDate && game.released" class="mb-1 font-normal text-gray-300">Released: {{ game.released }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  game: { type: Object, required: true },
  showRemove: { type: Boolean, default: false },
  onRemove: { type: Function, default: null },
  showRank: { type: Boolean, default: false },
  rank: { type: Number, default: null },
  showRating: { type: Boolean, default: true },
  showMetacritic: { type: Boolean, default: false },
  showGenre: { type: Boolean, default: false },
  showReleaseDate: { type: Boolean, default: false }
})
</script>
