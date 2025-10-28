import { ref } from 'vue'
import Steam from '../assets/store-icons/SteamIcon.png'
import EpicGames from '../assets/store-icons/EpicIcon.png'
import GOG from '../assets/store-icons/GogIcon.png'
import Nintendo from '../assets/store-icons/NintendoIcon.png'
import Playstation from '../assets/store-icons/PlaystationIcon.png'
import Xbox from '../assets/store-icons/XboxIcon.png'
import GooglePlay from '../assets/store-icons/GooglePlayIcon.png'
import AppStore from '../assets/store-icons/AppStoreIcon.png'
import DefaultIcon from '../assets/store-icons/default.svg' // Add a default icon if you have one


export const useIcons = () => {
    const icons = ref({
        Steam: Steam,
        "Epic Games": EpicGames,
        GOG: GOG,
        Nintendo: Nintendo,
        Playstation: Playstation,
        Xbox: Xbox,
        GooglePlay: GooglePlay,
        AppStore: AppStore,
        default: DefaultIcon // Add this line
    })
    return { icons }
}