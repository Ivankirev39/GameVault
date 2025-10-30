<template>
<button v-if="isLoggedIn" @click="handleLgoout" class="auth-btn cursor-pointer">Logout</button>
<router-link v-else class="auth-btn" to="/login"> Login </router-link>
</template>

<script setup>


import { useAuth } from '../modules/useAuth';
import { useRouter } from 'vue-router';

const { isLoggedIn, logout } = useAuth()
const router = useRouter()

const handleLgoout = () => {
    logout(router)
}

</script>

<style>

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