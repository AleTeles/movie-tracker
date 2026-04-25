// *** MovieModal.tsx *** //

import { useEffect, useState } from "react"
import { getMovieCredits } from "../../services/tmdb"
import "./MovieModal.css"

/**
 * Tipo de filme
 */
type Movie = {
  id: number
  title: string
  poster_path: string
  release_date: string
  overview: string
  vote_average: number
}

/**
 * Tipo do ator (elenco)
 */
type Cast = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

/**
 * Props do modal
 */
type Props = {
  isOpen: boolean
  movie: Movie | null
  onClose: () => void
}

function MovieModal({ isOpen, movie, onClose }: Props) {
  /**
   * Estado do elenco
   */
  const [cast, setCast] = useState<Cast[]>([])

  /**
   * Busca elenco ao abrir modal
   */
  useEffect(() => {
    if (!movie) return

    async function fetchCast() {
      try {
        /**
         * Busca dados da API
         */
        const data = await getMovieCredits(movie!.id)

        /**
         * Validação de segurança:
         * garante que é um array antes de usar
         */
        if (Array.isArray(data)) {
          setCast(data.slice(0, 5))
        } else {
          console.warn("Elenco inválido:", data)
          setCast([])
        }
      } catch (error) {
        console.error("Erro ao buscar elenco:", error)
        setCast([])
      }
    }

    fetchCast()
  }, [movie])

  /**
   * Não renderiza se fechado
   */
  if (!isOpen || !movie) return null

  /**
   * Imagem do filme
   */
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem"

  /**
   * Ano
   */
  const year = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "----"

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <div className="modal-body">
          <img
            src={imageUrl}
            alt={movie.title}
            className="modal-image"
          />

          <div className="modal-info">
            <h2>{movie.title}</h2>

            <p className="modal-meta">
              {year} ⭐ {movie.vote_average?.toFixed(1)}
            </p>

            <p className="modal-description">
              {movie.overview || "Sem descrição disponível"}
            </p>

            {/* ================= ELENCO ================= */}
            <h3>Elenco</h3>

            <div className="cast-list">
              {cast.length === 0 && (
                <p style={{ color: "#aaa" }}>
                  Carregando elenco...
                </p>
              )}

              {cast.map((actor) => {
                const actorImage = actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/100x150?text=Sem+Foto"

                return (
                  <div key={actor.id} className="cast-card">
                    <img src={actorImage} alt={actor.name} />
                    <p>{actor.name}</p>
                    <small>{actor.character}</small>
                  </div>
                )
              })}
            </div>
            {/* ========================================== */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal