// *** Buscar.tsx *** //

import { useState } from "react"
import { searchMovies } from "../../services/tmdb"
import "./Buscar.css"
import MovieModal from "../../components/MovieModal/MovieModal"

/**
 * Tipo de filme retornado pela API
 */
type Movie = {
  id: number
  title: string
  poster_path: string
  release_date: string
  overview: string
  vote_average: number
}

function Buscar() {
  /**
   * Texto digitado na busca
   */
  const [query, setQuery] = useState("")

  /**
   * Lista de filmes retornados
   */
  const [movies, setMovies] = useState<Movie[]>([])

  /**
   * Controle do modal (abre/fecha)
   */
  const [isModalOpen, setIsModalOpen] = useState(false)

  /**
   * Filme selecionado (IMPORTANTE)
   */
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  /**
   * Limita tamanho da descrição
   */
  function truncate(text: string, maxLength: number) {
    if (!text) return "Sem descrição"

    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text
  }

  /**
   * Busca filmes e ordena por data
   */
  async function handleSearch() {
    try {
      const results = await searchMovies(query)

      const sorted = results.sort((a: Movie, b: Movie) => {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        )
      })

      setMovies(sorted)
    } catch (error) {
      console.error("Erro ao buscar filmes:", error)
    }
  }

  /**
   * Abre o modal com o filme clicado
   */
  function handleOpenModal(movie: Movie) {
    setSelectedMovie(movie) // guarda o filme
    setIsModalOpen(true)    // abre o modal
  }

  /**
   * Fecha o modal
   */
  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  return (
    <div className="buscar-container">
      <h1 className="buscar-title">Buscar Filmes</h1>

      <div className="buscar-bar">
        <input
          className="buscar-input"
          type="text"
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="buscar-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* GRID DE FILMES */}
      <div className="movies-grid">
        {movies.map((movie) => {
          const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=Sem+Imagem"

          const year = movie.release_date
            ? movie.release_date.substring(0, 4)
            : "----"

          return (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleOpenModal(movie)} // 👈 aqui está o segredo
            >
              <div className="movie-card-inner">
                <img src={imageUrl} alt={movie.title} />

                <div className="movie-info">
                  <p className="movie-title">{movie.title}</p>

                  <p className="movie-meta">
                    {year} ⭐ {movie.vote_average?.toFixed(1)}
                  </p>
                </div>

                <div className="movie-extra">
                  <p className="movie-description">
                    {truncate(movie.overview, 120)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* MODAL */}
      <MovieModal
        isOpen={isModalOpen}
        movie={selectedMovie} // 👈 passa o filme
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Buscar