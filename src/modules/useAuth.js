import { computed, ref } from 'vue'
import { firebaseApp } from './firebase'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'


const auth = getAuth(firebaseApp)

const currentUser = ref(null)

const isLoggedIn = computed(() => !!currentUser.value);

const authError = ref(null)
const loading = ref(false)

onAuthStateChanged(auth, (user) => {
    currentUser.value = user
})

const login = async (email, password) => {
    console.log('login attempt: ', email)
    loading.value = true
    authError.value = null 
    try {
        await signInWithEmailAndPassword(auth, email, password)

    }
    catch(err) {
        authError.value = err.message
    }
    finally {
    loading.value = false
    }
}

const logout = async (routerInstance) => {
    console.log("logout of this mail", currentUser.value?.email)
    loading.value = true
    authError.value = null;

    try{
        await signOut(auth)
        if (routerInstance) {
            routerInstance.push('/')
        }
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
        loading.value = false
    }
}

export function useAuth () {
    return{
        currentUser,
        isLoggedIn,
        authError,
        loading,
        login,
        logout
    }
}