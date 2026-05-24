// ==========================================================
// MovieHeader.tsx
// ==========================================================

import "./MovieHeader.css"
import noPoster from "../../assets/no-poster.png"

import {
  FaHeart,
  FaRegHeart,
  FaCheck,
  FaRegCircle
} from "react-icons/fa"

import MovieHistoryRatings from "../Rating/MovieHistoryRatings"
import "../../styles/buttons.css"

/**
 * ==========================================================
// TIPOS
// ==========================================================
 */

type Genre = {
  id: number
  name: string
}

type Movie = {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

type Props = {
  movie: Movie

  genres: Genre[]

  watched: boolean
  wantToWatch: boolean

  onWantToWatch: () => void
  onWatched: () => void
}

/**
 * ==========================================================
// COMPONENTE
// ==========================================================
 */

function MovieHeader({
  movie,
  genres,
  watched,
  wantToWatch,
  onWantToWatch,
  onWatched
}: Props) {

  return (

    <div className="movie-header">

      {/* POSTER */}
      <div className="movie-header-poster">

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : noPoster
          }
          alt={movie.title}
        />

      </div>

      {/* INFOS */}
      <div className="movie-header-info">

        <h2>{movie.title}</h2>

        <p className="modal-genres">
          {genres.map(g => g.name).join(" • ")}
        </p>

        <p className="modal-meta">
          {movie.release_date?.substring(0, 4)} ⭐ {movie.vote_average?.toFixed(1)}
        </p>

        {/* AÇÕES */}
        <div className="modal-actions">

          <div
            className={`movie-action-button want-to-watch ${wantToWatch ? "active" : ""}`}
            onClick={onWantToWatch}
          >
            {wantToWatch ? <FaHeart /> : <FaRegHeart />}
            <span>Quero assistir</span>
          </div>

          <div
            className={`movie-action-button watched ${watched ? "active" : ""}`}
            onClick={onWatched}
          >
            {watched ? <FaCheck /> : <FaRegCircle />}
            <span>Já assisti</span>
          </div>

        </div>

      </div>

      {/* HISTÓRICO */}
      <div className="movie-header-history">

        {watched && (
          <MovieHistoryRatings tmdbMovieId={movie.id} className="movie-header-history" buttonClassName="movie-header-history-button" />
        )}

      </div>

    </div>

  )
}

export default MovieHeader