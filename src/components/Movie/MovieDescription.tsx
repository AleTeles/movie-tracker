// ==========================================================
// MovieDescription.tsx
// ==========================================================

import "./MovieDescription.css"

/**
 * ==========================================================
 * COMPONENTE: MovieDescription
 * ==========================================================
 *
 * RESPONSABILIDADE:
 * -----------------
 * ✔ Exibir a descrição do filme
 * ✔ Controlar altura com scroll
 *
 * NÃO FAZ:
 * --------
 * ❌ Não busca dados
 * ❌ Não chama API
 * ❌ Não tem lógica de negócio
 */
type Props = {
  description: string
}

function MovieDescription({ description }: Props) {
  return (
    <div className="movie-description">
      {description}
    </div>
  )
}

export default MovieDescription