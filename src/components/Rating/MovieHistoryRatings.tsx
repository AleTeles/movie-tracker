// ==========================================================
// MovieHistoryRatings.tsx
// ==========================================================

import { useState } from "react"
import { supabase } from "../../services/supabase"
import { getCurrentUsersAppId } from "../../services/auth"

import "./MovieHistoryRatings.css"
import "../../styles/buttons.css"

/**
 * ==========================================================
 * TIPOS
 * ==========================================================
 */
type RatingHistory = {
  id: string
  movie_id: string
  tmdb_movie_id: number
  rating: number
  review_text: string | null
  watched_date: string
}

type Props = {
  movieId?: string | null
  tmdbMovieId?: number | null

  className?: string
  buttonClassName?: string
}

/**
 * ==========================================================
 * FUNÇÃO: formatDate
 * ==========================================================
 */
function formatDate(date: string) {

  const [year, month, day] = date.split("-")

  return `${day}/${month}/${year}`
}

/**
 * ==========================================================
 * COMPONENTE: MovieHistoryRatings
 * ==========================================================
 */
function MovieHistoryRatings({
  movieId,
  tmdbMovieId,
  className,
  buttonClassName
}: Props) {

  const usersAppId = getCurrentUsersAppId()

  const [ratingsHistory, setRatingsHistory] = useState<RatingHistory[]>([])

  const [showHistory, setShowHistory] = useState(false)

  const [loading, setLoading] = useState(false)

  /**
   * ==========================================================
   * FUNÇÃO: loadHistory
   * ==========================================================
   */
  async function loadHistory() {

    try {

      setLoading(true)

      const { data, error } = await supabase.rpc(
        "getmovie_historyratings",
        {
          p_users_app_id: usersAppId,
          p_movie_id: movieId,
          p_tmdb_movie_id: tmdbMovieId
        }
      )

      if (error) {
        console.error(error)
        return
      }

      setRatingsHistory(data || [])

      setShowHistory(true)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className={`movie-history-ratings ${className || ""}`}>

      {!showHistory && (

        <button
          className={`movie-action-button history-button ${buttonClassName || ""}`}
          onClick={loadHistory}
          disabled={loading}
        >

          {loading
            ? "Carregando..."
            : "Ver histórico de avaliações"}

        </button>

      )}

      {showHistory && (

        <div className="history-list">

          {ratingsHistory.length === 0 && (

            <p className="history-empty">
              Nenhuma avaliação ainda
            </p>

          )}

          {ratingsHistory.map(rating => (

            <div
              key={rating.id}
              className="history-item"
            >

              <div
                className="history-date"
                title="Data em que assistiu o filme"
              >
                📅 Assistido em {formatDate(rating.watched_date)}
              </div>

              <div className="history-bottom">
                <span className="history-rating">
                  ⭐ Nota {rating.rating}
                </span>

                {rating.review_text && (
                  <span
                    className="history-comment"
                    title={rating.review_text}
                  >
                    💬
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )
}

export default MovieHistoryRatings