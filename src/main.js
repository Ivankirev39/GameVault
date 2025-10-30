import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authReady } from './modules/useAuth' // import the promise

const app = createApp(App)

app.use(router)

// Wait for Firebase Auth to initialize before mounting
authReady.then(() => {
  app.mount('#app')
})
