// ==========================================================
// tmdb.ts
// ==========================================================

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
 * ==========================================================
 * FUNÇÃO: searchMovies
 * ==========================================================
 *
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
 * ==========================================================
 * FUNÇÃO: getMovieCredits
 * ==========================================================
 *
 * Busca elenco do filme
 */
export async function getMovieCredits(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=pt-BR`
  )

  const data = await response.json()

  return data.cast
}

/**
 * ==========================================================
 * 🔥 NOVA FUNÇÃO: getMovieDetails
 * ==========================================================
 *
 * OBJETIVO:
 * ----------
 * Buscar detalhes completos do filme no TMDB
 *
 * RETORNA:
 * ----------
 * - título
 * - descrição
 * - avaliação
 * - 🔥 gêneros (IMPORTANTE)
 *
 * EXEMPLO DE RETORNO:
 * ----------
 * genres: [
 *   { id: 28, name: "Ação" },
 *   { id: 878, name: "Ficção científica" }
 * ]
 */
export async function getMovieDetails(movieId: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
    )

    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes do filme")
    }

    const data = await response.json()

    return data

  } catch (error) {
    console.error("Erro em getMovieDetails:", error)
    return null
  }
}