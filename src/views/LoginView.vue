<template>

    <section class="login-view">
  <div class="flex flex-col items-center mt-20 px-2 py-2 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-4xl md:text-5xl font-semibold text-[#A80ADD]">
          GameVault    
      </a>
      <div class="w-full sm:max-w-md md:max-w-xl rounded-lg shadow dark:border md:mt-0 xl:p-8 bg-[#121212]">
          <div class="p-8 space-y-4 md:space-y-6 sm:p-4">
              <h1 class="md:text-2xl font-bold leading-tight tracking-tight text-[#f4f4f4]">
                  <!-- Dynamic headline -->
                  {{ showRegister ? 'Sign up as a new user' : 'Sign in to your account' }}
              </h1>
              <div class="p-2 space-y-2 md:space-y-2  flex flex-col items-center">
                  <form
                    v-if="!showRegister && !isLoggedIn"
                    class="space-y-4 md:space-y-6 flex flex-col items-center w-full"
                    @submit.prevent="loginUser"
                  >
                      <input type="email" class="md:text-lg rounded-lg block w-full md:w-[450px] p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-purple-500 focus:border-purple-500" v-model="email" placeholder="Email" required>
                      <input type="password" class="md:text-lg rounded-lg block w-full md:w-[450px] p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-purple-500 focus:border-purple-500" v-model="password" placeholder="Password" required>
                      <button type="submit" class="w-full md:w-[450px] bg-transparent border-2 border-[#A80ADD] text-[#A80ADD] hover:bg-[#A80ADD] hover:text-[#f4f4f4] font-bold py-3 px-6 rounded-lg transition-colors text-xl" :disabled="loading"> Login </button>
                  </form>
                  <!-- "Don't have an account yet?" link below login form -->
                  <div v-if="!showRegister && !isLoggedIn" class="mt-2">
                      <span class="text-[#f4f4f4]">Don't have an account yet? </span>
                      <button
                          class="text-[#A80ADD] underline hover:text-[#f4f4f4] transition-colors"
                          @click="showRegister = true"
                          type="button">
                          Sign up here!
                      </button>
                  </div>
                  <form
                    v-if="showRegister && !isLoggedIn"
                    class="space-y-4 md:space-y-6 flex flex-col items-center w-full"
                    @submit.prevent="registerUser"
                  >
                      <input type="email" class="md:text-lg rounded-lg block w-full md:w-[450px] p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-purple-500 focus:border-purple-500" v-model="registerEmail" placeholder="Email" required>
                      <input type="password" class="md:text-lg rounded-lg block w-full md:w-[450px] p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-[#f4f4f4] focus:ring-purple-500 focus:border-purple-500" v-model="registerPassword" placeholder="Password" required>
                      <span class="text-[#f4f4f4] text-lg w-full md:w-[450px] text-left">Make sure to write a strong password! </span>
                      <button type="submit" class="w-full md:w-[450px] bg-transparent border-2 border-[#A80ADD] text-[#A80ADD] hover:bg-[#A80ADD] hover:text-[#f4f4f4] font-bold py-3 px-6 rounded-lg transition-colors text-xl" :disabled="loading"> Register </button>
                  </form>
                  <!-- "Already have an account?" link below register form -->
                  <div v-if="showRegister && !isLoggedIn" class="mt-2">
                      <span class="text-[#f4f4f4]">Already have an account? </span>
                      <button
                          class="text-[#A80ADD] underline hover:text-[#f4f4f4] transition-colors"
                          @click="showRegister = false"
                          type="button"
                      >
                          Sign in here!
                      </button>
                  </div>
                  <button
                            v-if="isLoggedIn"
                            @click="logoutUser"
                            class="w-full md:w-[450px] bg-transparent border-2 border-[#A80ADD] text-[#A80ADD] hover:bg-[#A80ADD] hover:text-[#f4f4f4] font-bold py-3 px-6 rounded-lg transition-colors text-xl mt-4"
                        >
                            Logout
                        </button>
                  <div v-if="isLoggedIn" class="flex flex-col text-[#f4f4f4] md:text-xl items-center justify-center mt-4">
                      Logged in as: {{ currentUser?.email }}
                  </div>
              </div>
          </div>
      </div>
  </div>

   <div class="error color-brown-500 mt-[10px]" v-if="authError">
        {{ authError }}
    </div>
</section>

</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../modules/useAuth'
const { login, logout, register, authError, loading, isLoggedIn, currentUser } = useAuth()

const email = ref('')
const password = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const showRegister = ref(false)

const loginUser = () => {
    login(email.value, password.value)
}
const registerUser = () => {
    register(registerEmail.value, registerPassword.value)
}
const logoutUser = () => {
    logout()
}
</script>

<style>




</style>