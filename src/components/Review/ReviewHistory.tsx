// ==========================================================
// ReviewHistory.tsx
// ==========================================================

import "./ReviewHistory.css"

/**
 * ==========================================================
 * TIPOS
 * ==========================================================
 */
type Review = {
  id: string
  rating: number
  review_text: string | null
  watched_date: string
}

type Props = {
  reviews: Review[]
}

/**
 * ==========================================================
 * FUNÇÃO: formatDate
 * ==========================================================
 * Converte YYYY-MM-DD → DD/MM/YYYY
 */
function formatDate(date: string) {
  const [year, month, day] = date.split("-")
  return `${day}/${month}/${year}`
}

/**
 * ==========================================================
 * COMPONENTE: ReviewHistory
 * ==========================================================
 */
function ReviewHistory({ reviews }: Props) {

  return (
    <div className="review-history">

      <h3>Histórico</h3>

      <div className="history-list">

        {reviews.length === 0 && (
          <p className="history-empty">
            Nenhuma avaliação ainda
          </p>
        )}

        {reviews.map(review => (

          <div key={review.id} className="history-item">

            {/* DATA */}
            <span className="history-date">
              📅 {formatDate(review.watched_date)}
            </span>

            {/* NOTA + TOOLTIP */}
            <span
              className="history-rating"
              title={review.review_text || ""}
            >
              {review.rating} ★
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ReviewHistory