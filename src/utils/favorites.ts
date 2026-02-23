import type { Movie } from "../types/movie"

const STORAGE_KEY = "@movies-favorites"

export function getFavorites(): Movie[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function isFavorite(id: number): boolean {
  const favorites = getFavorites()
  return favorites.some(movie => movie.id === id)
}

export function addFavorite(movie: Movie) {
  const favorites = getFavorites()
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...favorites, movie])
  )
}

export function removeFavorite(id: number) {
  const favorites = getFavorites().filter(movie => movie.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export function toggleFavorite(movie: Movie) {
  if (isFavorite(movie.id)) {
    removeFavorite(movie.id)
  } else {
    addFavorite(movie)
  }
}