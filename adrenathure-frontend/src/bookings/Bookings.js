import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from "../useFetch"
import { Link } from "react-router-dom"
import ErrorBoundary from '../ErrorBoundary'
import './AllBookings.css'
const BASE_URL  = process.env.REACT_APP_URL

function Bookings() {
  const bookings = useFetch(`${BASE_URL}/bookings`)
  return bookings && (
    <div id='bookingsProfiledata'>
        {bookings.length ?
        bookings.map(booking =>
          <article key={booking.id} className='articles'>
            <div className='fila'>Nº de la reserva:
              <div className='columna'>{booking.bookingNumber}</div>
            </div>
            <div className='fila'>Experiencia:
              <div className='columna'>{booking.experienceName}</div>
            </div>
            <div className='fila'>Fecha:
              <div className='columna'>{booking.bookingDate.substring(0,10)}</div>
            </div>
            <div className='fila'>Precio total:
              <div className='columna'>{booking.totalPrice}€</div>
            </div>
            <div className='fila'>Plazas reservadas:
              <div className='columna'>{booking.reservedSeats}</div>
            </div>
            <Link className='button-link' to={`/profile/bookings/${booking.id}#bookingId` }>VER</Link>
          </article>
        ): <p id='messageNoBookings'> Aún no has realizado ninguna reserva.</p>}
    </div>
  )
}

const BookingsWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <ErrorBoundary fallback="Bookings is failing">
      <Bookings />
    </ErrorBoundary>
  </Suspense>

export default BookingsWrapper
