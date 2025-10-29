// NSFW filter
export function isNSFW(game) {
  return game.tags?.some(tag => tag.id === 16459 || tag.slug === 'adult' || tag.slug === 'nsfw')
}

// Date formatting
export function formatDate(dateString) {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Store icon mapping and helpers
import Steam from '../assets/store-icons/SteamIcon.png'
import EpicGames from '../assets/store-icons/EpicIcon.png'
import GOG from '../assets/store-icons/GogIcon.png'
import Nintendo from '../assets/store-icons/NintendoIcon.png'
import Playstation from '../assets/store-icons/PlaystationIcon.png'
import Xbox from '../assets/store-icons/XboxIcon.png'
import GooglePlay from '../assets/store-icons/GooglePlayIcon.png'
import AppStore from '../assets/store-icons/AppStoreIcon.png'
import DefaultIcon from '../assets/store-icons/default.svg'

export const storeIcons = {
  Steam,
  "Epic Games": EpicGames,
  GOG,
  Nintendo,
  Playstation,
  Xbox,
  GooglePlay,
  AppStore,
  default: DefaultIcon
}

export function getStoreIcon(slug) {
  const slugToIconKey = {
    steam: 'Steam',
    'epic-games': 'Epic Games',
    gog: 'GOG',
    'playstation-store': 'Playstation',
    'xbox-store': 'Xbox',
    nintendo: 'Nintendo',
    'google-play': 'GooglePlay',
    'app-store': 'AppStore',
    'apple-appstore': 'AppStore',
    'apple-store': 'AppStore'
  }
  const key = slugToIconKey[slug]
  return (key && storeIcons[key]) ? storeIcons[key] : storeIcons['default']
}
