import { NavLink } from "react-router-dom"
import "./Header.css"

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Movie Tracker</div>

        <nav className="menu">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>

          <NavLink to="/buscar" className={({ isActive }) => isActive ? "active" : ""}>
            Buscar
          </NavLink>

          <NavLink to="/watchlist" className={({ isActive }) => isActive ? "active" : ""}>
            Watchlist
          </NavLink>
        </nav>

      </div>
    </header>
  )
}

export default Header