import { ref } from 'vue'
import { db } from './firebase'
import { useAuth } from './useAuth'
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'

const isFavorited = ref(false)

export function useFavorites() {
  const { currentUser } = useAuth()

  // Add favorite
  const addFavorite = async (game) => {
    if (!currentUser.value) return
    const favRef = doc(db, `users/${currentUser.value.uid}/favorites/${game.id}`)
    await setDoc(favRef, {
      name: game.name,
      background_image: game.background_image,
      addedAt: new Date()
    })
    isFavorited.value = true
  }

  // Remove favorite
  const removeFavorite = async (gameId) => {
    if (!currentUser.value) return
    const favRef = doc(db, `users/${currentUser.value.uid}/favorites/${gameId}`)
    await deleteDoc(favRef)
    isFavorited.value = false
  }

  // Check if favorited
  const checkFavorite = async (gameId) => {
    if (!currentUser.value) {
      isFavorited.value = false
      return
    }
    const favRef = doc(db, `users/${currentUser.value.uid}/favorites/${gameId}`)
    const favSnap = await getDoc(favRef)
    isFavorited.value = favSnap.exists()
  }

  return {
    isFavorited,
    addFavorite,
    removeFavorite,
    checkFavorite
  }
}
