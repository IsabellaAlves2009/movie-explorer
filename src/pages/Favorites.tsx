import { useEffect, useState } from "react"
import { getFavorites, removeFavorite } from "../utils/favorites"
import { useNavigate } from "react-router-dom"
import { X } from "phosphor-react";
import type { Movie } from "../types/movie"
import "../App.css"

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  function handleRemove(id: number) {
    removeFavorite(id)
    setFavorites(getFavorites())
  }

  if (favorites.length === 0) {
    return <p style={{ textAlign: "center" }}>Nenhum filme favoritado 😭</p>
  }

  return (
    <div className="movies-grid">
      {favorites.map(movie => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>

          <button
            className="fav-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleRemove(movie.id)
            }}
          >
            <X color="#fff" size={22} />
          </button>
        </div>
      ))}
    </div>
  )
}