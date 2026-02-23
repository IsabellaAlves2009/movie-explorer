import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import "./Header.css"

export function Header() {
  const { favorites } = useFavorites()

  return (
    <header className="header">
      <Link to="/" className="logo">Movie Explorer</Link>

      <nav>
        <Link to="/">Início</Link>
        <Link to="/favorites">
          Favoritos
          {favorites.length > 0 && (
            <span className="badge">{favorites.length}</span>
          )}
        </Link>
      </nav>
    </header>
  )
}