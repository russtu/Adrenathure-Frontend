import useFetch from '../useFetch'
import { Link, useParams } from "react-router-dom"
import { Suspense } from 'react'
import Loading from '../Loading'
const BASE_URL  = process.env.REACT_APP_URL


function YourBooking() {
  const { id } = useParams()
  const booking = useFetch(`${BASE_URL}/bookings/${id}`)

  return booking && (
    <div id='yourBooking'>
      <div className="booking-space">
        <div className="booking-description">
          <h2 className="header-booking-id">DATOS DE TU RESERVA</h2>
          <span><strong>Nº reserva:</strong> {booking.bookingNumber}</span>
          <span><strong>Fecha reserva:</strong> {booking.bookingDate.substring(0, 10)}</span>
          <span><strong>Nombre:</strong> {booking.firstName} {booking.lastName}</span>
          <br></br>
          <span><strong>Tu experiencia:</strong> {booking.experienceName}</span>
          <span><strong>Destino:</strong> {booking.placeName}</span>
          <span><strong>Fecha experiencia:</strong> {booking.experienceDate.substring(0, 10)}</span>
          <span><strong>Hora experiencia:</strong> {booking.experienceHour.substring(0, 5)}</span>
          <span><strong>Plazas reservadas:</strong> {booking.reservedSeats}</span>
          <br></br>
          <span><strong>Precio total:</strong> {booking.totalPrice} €</span>
        </div>
        <div className="booking-photo-section">
          <h2>¡Gracias por confiar en nosotros!</h2>
          <img className='experience-photo' src={`${BASE_URL}/${booking.experiencePhoto}`} alt="avatar" />
        </div>
      </div>
      <div className="button-space">
        <button><Link className="link" to='/experiences#experiences'>SEGUIR COMPRANDO</Link></button>
        <button><Link className="link" to='/'>PÁGINA DE INICIO</Link></button>
      </div>
    </div>

  )
}


const YourBookingWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <YourBooking />
  </Suspense>


export default YourBookingWrapper
