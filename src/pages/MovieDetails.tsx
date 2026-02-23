import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Heart, Calendar, Star } from "phosphor-react"
import {
  addFavorite,
  removeFavorite,
  isFavorite
} from "../utils/favorites"
import "./MovieDetails.css"

type Movie = {
  vote_average: number,
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string | null
  release_date: string
}

const API_KEY = "f76d0c41cea727bb24198e6bb2c4ca0b"

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [favorited, setFavorited] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    )
      .then(res => res.json())
      .then(data => {
        setMovie(data)
        setFavorited(isFavorite(data.id))
      })
  }, [id])

    function toggleFavorite() {
    if (!movie) return

    if (favorited) {
      removeFavorite(movie.id)
      setMessage("Removido dos favoritos")
    } else {
      addFavorite(movie)
      setMessage("Adicionado aos favoritos ❤️")
    }

    setFavorited(!favorited)

    setTimeout(() => {
      setMessage("")
    }, 2000)
  }

  if (!movie) return <p className="loading">Carregando...</p>

  return (
    <div className="movie-details">
      {movie.backdrop_path && (
        <div className="movie-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
          />
          <div className="overlay" />
        </div>
      )}

      <div className="movie-content">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="info">
          <h1>{movie.title}</h1>
          <span><Star color="#FFD700" size={18} weight="fill" /> {movie.vote_average} <br /></span>
          <span><Calendar size={18} weight="regular" /> {movie.release_date}</span>
          <p>{movie.overview}</p>

          <button className="favorite-btn" onClick={toggleFavorite}>
            <Heart
              size={28}
              weight={favorited ? "fill" : "regular"}
            />
            {favorited ? " Favoritado" : " Favoritar"}
          </button>
        </div>
      </div>

      {message && <div className="toast">{message}</div>}
    </div>
  )
}