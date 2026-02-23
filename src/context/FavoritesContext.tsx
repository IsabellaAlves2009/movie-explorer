import { createContext, useContext, useState } from "react"
import type { Movie } from "../types/movie"

type FavoritesContextType = {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
}

const FavoritesContext = createContext({} as FavoritesContextType)
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])

  function addFavorite(movie: Movie) {
    setFavorites(prev =>
      prev.some(m => m.id === movie.id) ? prev : [...prev, movie]
    )
  }

  function removeFavorite(id: number) {
    setFavorites(prev => prev.filter(movie => movie.id !== id))
  }

  return (    
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}