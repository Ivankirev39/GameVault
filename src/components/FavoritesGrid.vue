<template>
  <div v-if="favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    <GameCard
      v-for="game in favorites"
      :key="game.id"
      :game="game"
      :showRemove="true"
      :onRemove="onRemove"
      :showRating="false"
      imgClass="h-[220px]"
      cardClass="m-0"
    />
  </div>
</template>

<script setup>
import GameCard from './GameCard.vue'

defineProps({
  favorites: { type: Array, required: true },
  onRemove: { type: Function, required: true }
})
</script>
