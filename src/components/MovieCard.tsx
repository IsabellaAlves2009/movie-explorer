import { useState } from "react"
import type { Movie } from "../types/movie"
import { isFavorite, addFavorite, removeFavorite } from "../utils/favorites"
import { useNavigate } from "react-router-dom"
import { Heart } from "phosphor-react"
import "../App.css"

type Props = {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const [fav, setFav] = useState(isFavorite(movie.id))
  const navigate = useNavigate()

  function handleFavorite(e: React.MouseEvent) {
    e.stopPropagation() 

    if (fav) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }

    setFav(!fav)
  }

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      <button className="fav-btn" onClick={handleFavorite}>
        <Heart color="#fff" size={22} weight={fav ? "fill" : "regular"} />
      </button>
    </div>
  )
}