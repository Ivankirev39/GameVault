<template>
  <div class="about">
    <h1 class="text-3xl font-bold underline">

      This is an about games page
    </h1>
  </div>
  
  <input type="text" v-model="newGameTitle" placeholder="Search games" />
  <button @click="addGame">Add Game </button>

  <ul>
    <li v-for="game in games" :key="game.id">
      {{ game.title }}
      <button @click="deleteGame(game.id)">Delete</button>
      <!-- Optional: Add Edit button for update functionality -->
      <!-- <button @click="editGame(game)">Edit</button> -->
      <span v-if="newGameTitle.trim() === ''"></span>
    </li>
  </ul>
</template>

<script setup>
import { useGames } from '../modules/useGames.js'

const { games, newGameTitle, addGame, deleteGame } = useGames()


</script>

<style>

</style>
