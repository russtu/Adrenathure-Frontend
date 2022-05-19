import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from "../useFetch"
import { useParams } from "react-router-dom"
import PunctuationToRate from '../users/PunctuationToRate'
import './BookingId.css'
const BASE_URL = process.env.REACT_APP_URL

function BookingId() {
  const { id } = useParams()
  const bookingId = useFetch(`${BASE_URL}/bookings/${id}`)

  return bookingId && (
    <>
      <div id='bookingId'></div>
      <div className="booking-space">
        <div className="booking-description">
          <h3 className="header-booking-id">DATOS DE TU RESERVA</h3>
          <span><strong>Nº reserva:</strong> {bookingId.bookingNumber}</span>
          <span><strong>Fecha reserva:</strong> {bookingId.bookingDate}</span>
          <span><strong>Nombre:</strong> {bookingId.firstName} {bookingId.lastName}</span>
          <br></br>
          <span><strong>Experiencia:</strong> {bookingId.experienceName}</span>
          <span><strong>Destino:</strong> {bookingId.placeName}</span>
          <span><strong>Fecha experiencia:</strong> {bookingId.experienceDate}</span>
          <span><strong>Hora experiencia:</strong> {bookingId.experienceHour}</span>
          <span><strong>Plazas reservadas:</strong> {bookingId.reservedSeats}</span>
          <br></br>
          <span><strong>Precio total:</strong> {bookingId.totalPrice} €</span>
        </div>
        <div className="booking-photo-section">
          <span>¡Esperamos para tu voto después de vivir la aventura!</span>
          <PunctuationToRate />
          <img className='experience-photo' src={`${BASE_URL}/${bookingId.experiencePhoto}`} alt="avatar" />
        </div>
      </div>
    </>
  )
}

const BookingIdWrapper = () =>
  <Suspense fallback={<Loading className="page" />}>
    <BookingId />
  </Suspense>

export default BookingIdWrapper
