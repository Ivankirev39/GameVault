import { onMounted, ref } from 'vue'
import { collection, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase.js'

export function useGames() {

// Collection reference
const gamesCollectionRef = collection(db, 'games')

// Reactive state
const games = ref([])
const newGameTitle = ref('')

// Load games
onMounted(() => {
  onSnapshot(gamesCollectionRef, (snapshot) => {
    games.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
})

const addGame = async () => {
  if (newGameTitle.value.trim() === '') return

  await addDoc(gamesCollectionRef, {
    title: newGameTitle.value
  })

  newGameTitle.value = ''
}

const deleteGame = async (id) => {
  try{
    await addDoc(collection(db, gamesCollectionRef), {
      title: newGameTitle.value
    })
    newGameTitle.value = ''
  }
  catch (error) {
    console.error("Error deleting document: ", error);
  }
}

 return {
    games,
    newGameTitle,
    addGame,
    deleteGame
}


}