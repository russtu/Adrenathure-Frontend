import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { useSetModal, useUser } from '../hooks'
import { useParams } from "react-router-dom"
const BASE_URL  = process.env.REACT_APP_URL


function PunctuationToRate() {
  const setModal = useSetModal()
  const [rating, setRating] = useState(0)
  const user = useUser()
  const { id } = useParams()

  const handleRating = async rate => {
    setRating(rate)
    const date = new Date()

    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: 'POST',
      body: JSON.stringify({ rate, date }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })

    if (res.ok) {
      setModal('Gracias por tu voto')
    } else {
      if (res.status === 400) {
        setModal('Por favor, vota después de vivir la experiencia.')
      }
      if (res.status === 403) {
        setModal('Ya votaste')
      }
      if (res.status === 500) {
        setModal('Database Error')
      }
    }
  }

  return (
    <div className='App'>
      <Rating onClick={handleRating} ratingValue={rating}/>
    </div>
  )
}

export default PunctuationToRate
