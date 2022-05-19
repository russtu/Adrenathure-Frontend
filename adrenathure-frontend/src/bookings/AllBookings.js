import useFetch from '../useFetch'
import { Suspense } from 'react'
import Loading from '../Loading'
import { useSetModal, useUser } from '../hooks'
import { Navigate } from 'react-router-dom'
import '../List.css'
const BASE_URL = process.env.REACT_APP_URL


function AllBookings() {
  const setModal = useSetModal()
  const user = useUser()
  const bookings = useFetch(`${BASE_URL}/bookings/admin/bookings`)

  const handleClick = async (e) => {
    e.preventDefault()
    const bookingId = e.target.value

    const res = await fetch(`${BASE_URL}/bookings/admin`, {
      method: 'DELETE',
      body: JSON.stringify({ bookingId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })
    if (res.ok) {
      setModal(<p>La reserva ha sido borrada con éxito.</p>)
      setTimeout(() => {
        setModal(null)
        window.location.reload(true)
      }, 2000)
    } else {
      if (res.status === 404) {
        setModal(<p>No hay datos que borrar/ error desconocido.</p>)
      }
      if (res.status === 500) {
        setModal(<p> Reserva borrada /Database error.(causas posibles: que ya no haya experiencia)</p>)
        setTimeout(() => {
          setModal(null)
          window.location.reload(true)
        }, 4000)
      }
    }
  }

  if (!user) {
    return <Navigate to="/login#divLogin" />
  }

  return (
    <div id='todasReservas'>
      <div className="list">
        <h2 className="list-title">LAS RESERVAS</h2>
        <div className='grid-list-bookings'>
          <span>
            <strong>Nº RESERVA</strong>
          </span>
          <span>
            <strong>FECHA RESERVA</strong>
          </span>
          <span>
            <strong>EXPERIENCIA</strong>
          </span>
          <span>
            <strong>DESTINO</strong>
          </span>
          <span>
            <strong>FECHA EXPERIENCIA</strong>
          </span>
          <span>
            <strong>HORA EXPERIENCIA</strong>
          </span>
          <span>
            <strong>PLAZAS RESERVADAS</strong>
          </span>
          <span>
            <strong>PRECIO TOTAL</strong>
          </span>
          <span>
            <strong>USUARIO</strong>
          </span>
        </div>
        {bookings.length ?
          bookings.map(booking =>
            <div key={booking.id}>
              <div className='grid-list-bookings' >
                <span>{booking.bookingNumber}</span>
                <span>{booking.bookingDate}</span>
                <span>{booking.experienceName}</span>
                <span>{booking.placeName}</span>
                <span>{booking.experienceDate}</span>
                <span>{booking.experienceHour}</span>
                <span>{booking.reservedSeats}</span>
                <span>{booking.totalPrice}</span>
                <span>{booking.firstName} {booking.lastName}</span>
              </div>
              <div className="section-buttons">
                <button className="bin" value={booking.id} onClick={handleClick}>BORRAR</button>
              </div>
            </div>
          ) : <p>No hay ninguna reserva todavía</p>}
      </div>
    </div>
  )
}

const AllBookingsWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <AllBookings />
  </Suspense>


export default AllBookingsWrapper
