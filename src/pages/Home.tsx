import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import type { Movie } from "../types/movie"
import { MagnifyingGlass } from "phosphor-react"
import "../App.css"

const API_KEY = "f76d0c41cea727bb24198e6bb2c4ca0b"

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchMovies()
  }, [])

  function fetchMovies() {
    setLoading(true)
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
    )
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .finally(() => setLoading(false))
  }

  function handleSearch() {
    if (!search.trim()) return

    setLoading(true)
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${search}`
    )
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .finally(() => setLoading(false))
  }

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />

        <button onClick={handleSearch}>
          <MagnifyingGlass size={20} color="#fff" />
        </button>
      </div>
      {loading && <p>Carregando...</p>}
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}