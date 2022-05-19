import { Suspense, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useSetModal, useUser } from '../hooks'
import Loading from '../Loading'
import useFetch from '../useFetch'
const BASE_URL  = process.env.REACT_APP_URL


function ExperienceIdReservar() {
  const navigate = useNavigate()
  const setModal = useSetModal()
  const { id, date } = useParams()
  const experiences = useFetch(`${BASE_URL}/experiences/${id}/${date}`)

  const [experiencePhoto ] = useState(experiences[0].experiencePhoto)
  const [experienceName, setExperienceName] = useState(experiences[0].experienceName)
  const [place_id, setPlace_id] = useState(experiences[0].placeName)
  const [experienceDate, setExperienceDate] = useState(date)
  const [experienceHour, setExperienceHour] = useState((experiences[0].experienceHour))
  const [availableSeats, setAvailableSeats] = useState(experiences[0].availableSeats)
  const [reservedSeats, setReservedSeats] = useState('')
  const [price, setPrice] = useState(experiences[0].price || '')


  const user = useUser()

  const handleSubmit = async e => {

    let totalPrice = price * reservedSeats
    let availableSeats = experiences[0].availableSeats - reservedSeats
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/bookings/${id}` , {
      method: 'POST',
      body: JSON.stringify({ experiencePhoto, experienceName, place_id, experienceDate, experienceHour, availableSeats, reservedSeats, price, totalPrice }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })
    if (res.ok) {
      const data = await res.json()
      setModal('Reservado con éxito')
      setTimeout(() => {
        navigate(`/yourBooking/${data.bookingId}#yourBooking`)
        setModal(null)
        window.location.reload(true)
      }, 2000)
    } else {
      if (res.status === 404) {
        setModal(<p>No se puede reservar más plazas de las que tenemos libres</p>)
      }
      if (res.status === 400) {
        setModal(<p>Por favor, revisa si todos los campos están rellenos correctamente o si hay suficientes plazas libres.</p>)
      }
    }
  }
  if (!user) {
    return <Navigate to="/login#divLogin" />
  }
  if (experiences[0].availableSeats === 0) {
    return <p>No quedan plazas libres</p>
  }

  return (
    <>
      <div id='reservar'></div>
      <form id className="form" onSubmit={handleSubmit}>
        <fieldset className="form-section">
          <legend>Ya estás muy cerca de vivir una experiencia inolvidable!</legend>
          <label>
            <span>Nombre experiencia</span>
            <br/>
            <input name="name" value={experienceName} onChange={e => setExperienceName(e.target.value)} disabled/>
          </label>
          <label>
            <span>Destino</span>
            <br/>
            <input name="place_id" value={place_id} onChange={e => setPlace_id(e.target.value)} disabled/>
          </label>
          <label>
            <span>Fecha</span>
            <br/>
            <input name="fecha" type="date" value={experienceDate} onChange={e => setExperienceDate(e.target.value)} disabled/>
          </label>
          <label>
            <span>Hora</span>
            <br/>
            <input name="hour" type="time" value={experienceHour} onChange={e => setExperienceHour(e.target.value)} disabled/>
          </label>
          <label>
            <span>Llazas libres</span>
            <br/>
            <input name="availableSeats" type="number" value={availableSeats} onChange={e => setAvailableSeats(e.target.value)} disabled/>
          </label>
          <label>
            <span>Llazas reservadas</span>
            <br/>
            <input name="reservedSeats" type="number" min="0" max={availableSeats} placeholder="Cuantas plazas te gustaría reservar?" value={reservedSeats} onChange={e => setReservedSeats(e.target.value)} />
          </label>
          <label>
            <span>Precio/plaza</span>
            <br/>
            <input name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} disabled/>€
          </label>
          <label>
            <span>Precio total</span>
            <br/>
            <input name="total price" type="number" value={(price * reservedSeats)}  disabled/>€
          </label>
          <button>ENVIAR</button>
        </fieldset>
      </form>
      </>
  )
}

const ExperienceIdReservarWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <ExperienceIdReservar />
  </Suspense>

export default ExperienceIdReservarWrapper
