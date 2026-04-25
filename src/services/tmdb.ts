// *** tmdb.ts *** //

/**
 * Chave da API (centralizada aqui)
 * Evita repetição no projeto
 */
const API_KEY = "b0111a83c0d38d967f8a1b496996af0a"

/**
 * URL base da API
 */
const BASE_URL = "https://api.themoviedb.org/3"

/**
 * Busca filmes pelo nome
 */
export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`
  )

  const data = await response.json()

  return data.results
}

/**
 * 🔥 NOVO: Busca elenco do filme
 * Recebe o ID do filme
 */
export async function getMovieCredits(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=pt-BR`
  )

  const data = await response.json()

  /**
   * Retorna apenas o elenco
   */
  return data.cast
}