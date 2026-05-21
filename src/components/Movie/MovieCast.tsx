// ==========================================================
// MovieCast.tsx
// ==========================================================

import "./MovieCast.css"

/**
 * ==========================================================
 * COMPONENTE: MovieCast
 * ==========================================================
 *
 * RESPONSABILIDADE:
 * -----------------
 * ✔ Exibir elenco do filme
 * ✔ Mostrar imagem + nome + personagem
 * ✔ Scroll horizontal controlado
 *
 * NÃO FAZ:
 * --------
 * ❌ Não busca dados
 * ❌ Não chama API
 */
type Cast = {
  id: number
  name: string
  character: string
  profile_path: string | null
}

type Props = {
  cast: Cast[]
}

function MovieCast({ cast }: Props) {

  return (
    <div className="movie-cast">

      <h3>Elenco</h3>

      <div className="cast-list">
        {cast.map(actor => {

          // 🔥 monta URL da imagem
          const imageUrl = actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : "https://via.placeholder.com/80x120"

          return (
            <div key={actor.id} className="cast-item">

              {/* FOTO */}
              <img
                src={imageUrl}
                alt={actor.name}
                className="cast-image"
              />

              {/* INFO */}
              <div>
                <p>{actor.name}</p>
                <small>{actor.character}</small>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MovieCast