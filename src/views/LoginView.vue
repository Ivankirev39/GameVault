<template>

    <section class="login-view">
  <div class="flex flex-col items-center mt-20 px-2 py-2 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 md:text-5xl font-semibold text-[#A80ADD]">
          GameVault    
      </a>
      <div class="w-[1400px] rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-8 bg-[#121212]">
          <div class="p-8 space-y-4 md:space-y-6 sm:p-4">
              <h1 class="md:text-2xl font-bold leading-tight tracking-tight text-[#f4f4f4]">
                  Sign in to your account
              </h1>
              <div class="p-2 space-y-2 md:space-y-2  flex flex-col items-center">
                  <form class="space-y-4 md:space-y-6 flex flex-col items-center" @submit.prevent="loginUser">
                      <input type="email" class="md:text-lg rounded-lg block w-[450px] p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-purple-500 focus:border-purple-500" v-model="email" placeholder="Email" required>
                      <input type="password" class=" md:text-lg rounded-lg block w-[450px] p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-purple-500 focus:border-purple-500" v-model="password" placeholder="Passwords" required>
                      <button type="submit" class="w-[450px] bg-transparent border-2 border-[#A80ADD] text-[#A80ADD] hover:bg-[#A80ADD] hover:text-[#f4f4f4] font-bold py-3 px-6 rounded-lg transition-colors text-xl" :disabled="loading"> Login </button>
                  </form>
              </div>
          </div>
      </div>
  </div>

   <div class="error color-brown-500 mt-[10px]" v-if="authError">
        {{ authError }}
    </div>

    <div v-if="isLoggedIn">
        Logged in as: {{ currentUser?.email }}

    </div>
</section>

<!-- <div class="login-view">
     <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="space-y-4 md:space-y-6" @submit.prevent="loginUser">
        <input type="email" class="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-[#A80ADD] focus:border-[#A80ADD]" v-model="email" placeholder="Email" required>
        <input type="password" class="rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-[#A80ADD] focus:border-[#A80ADD]" v-model="password" placeholder="Passwords" required>
        <button type="submit" class="w-full bg-transparent border-2 border-[#A80ADD] text-[#A80ADD] hover:bg-[#A80ADD] hover:text-[#f4f4f4] font-bold py-3 px-6 rounded-lg transition-colors text-lg" :disabled="loading"> Login </button>
    </form>
</div>

    <div class="error" v-if="authError">
        {{ authError }}
    </div>

    <div v-if="isLoggedIn">
        Logged in as: {{ currentUser?.email }}

    </div>

</div> -->
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../modules/useAuth'
const { login, authError, loading, isLoggedIn, currentUser } = useAuth()

const email = ref('')
const password = ref('')


const loginUser = () => {
    login(email.value, password.value)
}



</script>

<style>




</style>