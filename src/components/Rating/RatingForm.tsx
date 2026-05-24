// ==========================================================
// RatingForm.tsx (UX AJUSTADO)
// ==========================================================

import { useState, useEffect } from "react"
import "./RatingForm.css"

type Props = {
  onSave: (data: {
    rating: number
    reviewText: string
    watchedDate: string
  }) => void
  onCancel?: () => void
}

function RatingForm({ onSave, onCancel }: Props) {

  const [watchedDate, setWatchedDate] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    setWatchedDate(today)
  }, [])

  function handleSave() {
    if (!rating) {
      alert("Selecione uma nota")
      return
    }

    onSave({
      rating,
      reviewText,
      watchedDate
    })
  }

  /**
   * 🔥 valor exibido no label
   */
  const displayRating = hoverRating || rating

  return (
    <div className="review-form">

      {/* DATA */}
      <div className="review-group">
        <label className="review-label">📅 Data</label>
        <input
          type="date"
          className="review-date-input"
          value={watchedDate}
          onChange={(e) => setWatchedDate(e.target.value)}
        />
      </div>

      {/* NOTA */}
      <div className="review-group">

        <label className="review-label">
          ⭐ Nota{displayRating ? `: ${displayRating}` : ""}
        </label>

        <div className="review-stars">
          {[1,2,3,4,5,6,7,8,9,10].map((n) => (
            <span
              key={n}
              className={`review-star ${
                n <= (hoverRating || rating || 0) ? "active" : ""
              }`}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(n)}
              title={`Nota ${n}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* COMENTÁRIO */}
      <div className="review-group">
        <label className="review-label">📝 Comentário</label>
        <textarea
          className="review-textarea"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>

      {/* DIVISOR */}
      <div className="review-divider" />

      {/* BOTÕES */}
      <div className="review-buttons">

        {onCancel && (
          <button
            className="review-button cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}

        <button
          className="review-button save"
          onClick={handleSave}
        >
          Salvar
        </button>

      </div>

    </div>
  )
}

export default RatingForm