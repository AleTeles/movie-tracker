// ==========================================================
// MovieModal.tsx 
// ==========================================================
// OBS: (FIX: abrir RatingForm)

import { useEffect, useState } from "react"
import { getMovieCredits, getMovieDetails } from "../../services/tmdb"
import { supabase } from "../../services/supabase"
import { getCurrentUsersAppId } from "../../services/auth"
import "./MovieModal.css"

import MovieDescription from "../Movie/MovieDescription"
import MovieHeader from "../Movie/MovieHeader"
import RatingForm from "../Rating/RatingForm"

type Movie = {
  id: number
  title: string
  original_title: string
  poster_path: string
  release_date: string
  overview: string
  vote_average: number
}

type Cast = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

type Genre = {
  id: number
  name: string
}

type Props = {
  isOpen: boolean
  movie: Movie | null
  onClose: () => void
}

function MovieModal({ isOpen, movie, onClose }: Props) {

  const [cast, setCast] = useState<Cast[]>([])
  const [genres, setGenres] = useState<Genre[]>([])

  const [userStatus, setUserStatus] = useState({
    watched: false,
    want_to_watch: false
  })

  const [mode, setMode] = useState<"normal" | "review">("normal")
  const usersAppId = getCurrentUsersAppId()

  // =========================
  // BUSCAR DADOS
  // =========================
  useEffect(() => {
    if (!movie) return

    const currentMovie = movie

    async function fetchData() {
      const castData = await getMovieCredits(currentMovie.id)
      if (Array.isArray(castData)) {
        setCast(castData.slice(0, 10))
      }

      const details = await getMovieDetails(currentMovie.id)
      if (details?.genres) {
        setGenres(details.genres)
      }
    }

    fetchData()
  }, [movie])

  // =========================
  // STATUS
  // =========================
  useEffect(() => {
    if (!movie || !isOpen) return

    const currentMovie = movie

    async function fetchStatus() {
      const { data } = await supabase.rpc("get_user_movie_status", {
        p_user_id: usersAppId,
        p_tmdb_movie_id: currentMovie.id
      })

      if (data && data.length > 0) {
        setUserStatus({
          watched: data[0].watched,
          want_to_watch: data[0].want_to_watch
        })
      } else {
        setUserStatus({
          watched: false,
          want_to_watch: false
        })
      }
    }

    fetchStatus()
  }, [movie, isOpen])

  // =========================
  // QUERO ASSISTIR
  // =========================
  async function handleWantToWatch() {
    if (!movie) return

  const newValue = !userStatus.want_to_watch

  const { data, error } = await supabase.rpc("set_desejo_assistir", {
    p_user_app_id: usersAppId,
    p_want_to_watch: newValue,

    p_tmdb_movie_id: movie.id,
    p_title: movie.title,
    p_original_title: movie.original_title,
    p_release_date: movie.release_date,
    p_tmdb_rating_average: movie.vote_average,
    p_tmdb_poster_path: movie.poster_path,
    p_genres: genres

  })
  // ========================================
  // ERRO TÉCNICO
  // ========================================
  if (error) {
    alert(error.message)
    return
  }
  // ========================================
  // ERRO DA FUNÇÃO
  // ========================================
  if (!data?.Success) {
    alert(data?.MessageReturn || "Erro ao atualizar")
    return
  }
  // ========================================
  // SUCESSO
  // ========================================
  setUserStatus({
    watched: userStatus.watched,
    want_to_watch: newValue
  })
  }

  function handleWatchedClick() {
    setMode("review")
  }

  // ==========================================================
  // FUNÇÃO: handleSaveReview
  // ==========================================================
  // RESPONSABILIDADE:
  // ----------------------------------------------------------
  // ✔ Receber os dados do formulário (RatingForm)
  // ✔ Enviar para o banco (Supabase RPC)
  // ✔ Tratar erro
  // ✔ Atualizar status na tela
  // ✔ Fechar o formulário
  // ==========================================================
  async function handleSaveReview(data: {
    rating: number
    reviewText: string
    watchedDate: string
  }) {
    
    // 🔒 Segurança: garante que existe um filme selecionado
    if (!movie) return

    // ==========================================================
    // 🔥 CHAMADA AO BANCO (RPC)
    // ==========================================================
    // Essa função no banco deve:
    // - verificar se o filme existe
    // - criar se não existir
    // - remover "quero assistir" (se estiver marcado)
    // - marcar como assistido
    // - criar a avaliação

    const { data: result, error } = await supabase.rpc("create_movie_review", {
      p_users_app_id: usersAppId,
      p_tmdb_movie_id: movie.id,

      p_title: movie.title,
      p_original_title: movie.title,
      p_release_date: movie.release_date,
      p_tmdb_rating_average: movie.vote_average,
      p_tmdb_poster_path: movie.poster_path,
      p_genres: genres,

      p_rating: data.rating,
      p_review_text: data.reviewText,
      p_watched_date: data.watchedDate
    })

    // ==========================================================
    // ❌ ERRO TÉCNICO (ex: falha na chamada)
    // ==========================================================
// ========================================
// ERRO TÉCNICO
// ========================================
    if (error) {
      alert(error.message)
      return
    }

    // ========================================
    // ERRO DA FUNÇÃO
    // ========================================
    if (!result?.[0]?.success) {
      alert(result?.[0]?.message || "Erro ao salvar avaliação")
      return
    }

    // ========================================
    // MENSAGEM DO BANCO
    // ========================================
    if (result?.[0]?.message) {
      alert(result[0].message)
    }

  // ==========================================================
  // ✅ SUCESSO
  // ==========================================================
  // Atualiza o estado da tela manualmente
  // (não precisa buscar no banco novamente)

    setUserStatus({
      watched: true,
      want_to_watch: false
    })

  // Fecha o formulário e volta para o modo normal
    setMode("normal")
  }

  if (!isOpen || !movie) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✖</button>

        <MovieHeader
          movie={movie}
          genres={genres}

          watched={userStatus.watched}
          wantToWatch={userStatus.want_to_watch}

          onWantToWatch={handleWantToWatch}
          onWatched={handleWatchedClick}
        />

        <div className="modal-divider" />

        {/* ================= MODO ================= */}
        {mode === "review" ? (
          <RatingForm
          // 🔥 Quando o usuário clicar em "Salvar":
          // o RatingForm envia os dados preenchidos (rating, reviewText, watchedDate)
          // para essa função handleSaveReview que criamos.
          // Essa função é responsável por:
          // 1. salvar no banco
          // 2. tratar erro
          // 3. atualizar status (Já assisti / Quero assistir)
          // 4. fechar o formulário
            onSave={handleSaveReview}
            onCancel={() => setMode("normal")} // cancelar continua fechando
          />
        ) : (
          <>
            <MovieDescription description={movie.overview} />

            <h3>Elenco</h3>
            <div className="cast-list">
              {cast.map(actor => (
                <div key={actor.id}>
                  <p>{actor.name}</p>
                  <small>{actor.character}</small>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default MovieModal