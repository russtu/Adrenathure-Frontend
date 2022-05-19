import { Suspense, useState } from 'react'
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom'
import { useSetModal, useUser } from '../hooks'
import Loading from '../Loading'
import useFetch from '../useFetch'
import '../Form.css'
const BASE_URL = process.env.REACT_APP_URL


function EditExperience() {
  const { id } = useParams()
  const setModal = useSetModal()
  const experiences = useFetch(`${BASE_URL}/experiences/${id}`)
  const places = useFetch(`${BASE_URL}/places`)



  const [dateId, setDateId] = useState('')
  const [experienceDescription, setExperienceDescription] = useState(experiences[0].experienceDescription || '')
  const [experienceName, setExperienceName] = useState(experiences[0].experienceName || '')
  const [place_id, setPlace_id] = useState(experiences[0].place_id || '')
  const [experienceDate, setExperienceDate] = useState('')
  const [totalSeats, setTotalSeats] = useState('')
  const [price, setPrice] = useState(experiences[0].price || '')
  const [experienceHour, setExperienceHour] = useState('')

  const [file, setFile] = useState(null)

  const [message, setMessage] = useState(null)
  const [messagePost, setMessagePost] = useState(null)
  const [messageDelete, setMessageDelete] = useState(null)


  const navigate = useNavigate()
  const user = useUser()


  const fd = new FormData()
  const fdDate = new FormData()
  if (file) {
    fd.append('avatar', file)
  }
  fdDate.append('dateId', Number(dateId))
  fd.append('experienceName', experienceName)
  fd.append('price', price)
  fd.append('experienceDescription', experienceDescription)
  fd.append('place_id', place_id)
  fdDate.append('experienceDate', experienceDate)
  fdDate.append('experienceHour', experienceHour)
  fdDate.append('totalSeats', totalSeats)

  const handleSubmitEdit = async e => {
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/experiences/admin/${id}`, {
      method: 'PUT',
      body: fd,
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    })
    // const data = await res.json()
    if (res.ok) {
      setModal('Los cambios a la experiencia se han guardado con éxito.')
      setTimeout(() => {
        setModal(null)
        window.location.reload(true)
      }, 2000)

    } else {
      if (res.status === 400) {
        setModal('Por favor, revisa si todos los campos están rellenados.')
      }
      if (res.status === 404) {
        setModal('Formato incorrecto, sigue las indicaciones en cada campo a cubrir.')
      }
      if (res.status === 500) {
        setModal('Database Error.')
      }

    }
  }

  const handleSubmitEditDates = async e => {
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/dates/${id}`, {
      method: 'PUT',
      body: fdDate,
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    })
    // const data = await res.json()
    if (res.ok) {
      setModal('El cambio de la fecha de la experiencia se ha guardado con éxito.')
      setTimeout(() => {
        setModal(null)
        window.location.reload(true)
      }, 2000)

    } else {
      if (res.status === 400) {
        setModal('Por favor, revisa si todos los campos están rellenados.')
      }
      if (res.status === 404) {
        setModal('Formato incorrecto, sigue las indicaciones en cada campo a cubrir.')
      }
      if (res.status === 500) {
        setModal('Database Error.')
      }

    }
  }

  if (!user) {
    return <Navigate to="/login#divLogin" />
  }

  const handleSubmitPost = async e => {
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/dates/${id}`, {
      method: 'POST',
      body: JSON.stringify({ experienceDate, experienceHour, totalSeats }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })
    // const data = await res.json()
    if (res.ok) {
      setModal('La fecha ha sido añadida con éxito.')
      setTimeout(() => {
        setModal(null)
        window.location.reload(true)
      }, 2000)
    } else {

      if (res.status === 500) {
        setModal('Database Error.')
      }

    }
  }

  const handleDelete = async () => {
    if (dateId) {
      const res = await fetch(`${BASE_URL}/dates`, {
        method: 'DELETE',
        body: JSON.stringify({ dateId }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
      if (res.ok) {
        // const data = await res.json()
        setModal('La fecha ha sido borrada con éxito.')
        window.location.reload(true)
      } else {
        if (res.status === 404) {
          setModal('No se ha podido borrar la fecha./Error desconocido.')

        }
      }
    } else {
      setModal('escoge fecha primero')
    }
  }

  const handleChangeSelectDate = e => {
    setMessageDelete('')
    setTotalSeats(experiences[e.target.selectedIndex - 1].totalSeats)
    setExperienceHour(experiences[e.target.selectedIndex - 1].experienceHour)
    setExperienceDate(e.target.value)
    setDateId(e.target.options[e.target.options.selectedIndex].id)
  }

  return (
    <>
      <div id='editarDestino'></div>
      <div className="form">
        <form onSubmit={handleSubmitEdit}>
          <fieldset className='form-section'>
            <legend>EDITAR EXPERIENCIA</legend>
            <label>
              <img className='photo-edit' src={`http://${BASE_URL}/${experiences[0].experiencePhoto}`} alt="avatar" />
            </label>
            <label>
              Cambiar foto experiencia
              <input className="input" type='file' onChange={e => setFile(e.target.files[0])} />
            </label>
            <label>
              <span>Nombre experiencia</span>
              <br />
              <input size='sm' required name="name" value={experienceName} onChange={e => setExperienceName(e.target.value)} />
            </label>
            <label>
              <span>Descripcion experiencia</span>
              <br />
              <textarea required name="description" value={experienceDescription} onChange={e => setExperienceDescription(e.target.value)} />
            </label>
            <div className="form-line">
              <span>Destino actual  <span className="false-input">{experiences[0].placeName}</span></span>
              <span>  Cambiar destino</span>
              <select defaultValue={''} className="select-destino" onChange={e => setPlace_id(e.target.value)} name='escoge destino'>
                <option disabled></option>
                {places &&
                  places.map(place =>
                    <option key={place.id} required name="place" value={place.id} >{place.placeName}</option>
                  )
                }
              </select>
            </div>
            <label>
              <span>Precio</span>
              <br />
              <input required name="price" value={price} onChange={e => setPrice(e.target.value)} />
              <span>€</span>
            </label>
            <button>GUARDAR</button>
            <p>{message}</p>
          </fieldset>
        </form>

        {experiences[0].experienceDate ?
          <form onSubmit={handleSubmitEditDates}>
            <fieldset className='form-section'>
              <legend>EDITAR FECHAS</legend>
              <div className="form-line">
                <span>Fechas existentes</span>
                <select defaultValue={'Elige fecha para editar'} className='select' onChange={handleChangeSelectDate} name='escoge fecha'>
                  <option disabled >Elige fecha para editar</option>
                  {experiences &&
                    experiences.map(experience =>
                      <option required key={experience.idDate} id={experience.idDate} name='date' value={experience.experienceDate} >{experience.experienceDate}</option>
                    )
                  }
                </select>
                <button id='delete-date-button' className="link" onClick={handleDelete}>BORRAR FECHA</button>
                <span>{messageDelete}</span>
              </div>
              {(!experiences[0].experienceDate || !experiences[0].experienceHour || !experiences[0].totalSeats) ?
                <p>No hay fechas disponibles</p> :
                <>
                  <label>
                    <span> Cambiar hora</span>
                    <br />
                    <input type='time' name="hour" value={experienceHour} onChange={e => {
                      setExperienceHour(e.target.value)
                    }} />
                  </label>
                  <label>
                    <span> Cambiar fecha</span>
                    <br />
                    <input type='date' name="date" value={experienceDate} onChange={e => {
                      setExperienceDate(e.target.value)
                    }} />
                  </label>
                  <label>
                    <span>Plazas totales</span>
                    <br />
                    <input max="20" min="1" type="number" name="seats" value={totalSeats} onChange={e => setTotalSeats(e.target.value)} />
                  </label>
                </>
              }
              <button>GUARDAR</button>
              <p>{message}</p>
            </fieldset>
          </form>
          : <p>No hay fechas existentes</p>}

        <form onSubmit={handleSubmitPost}>
          <fieldset className='form-section'>
            <legend>AÑADIR FECHAS NUEVAS</legend>
            <label>
              <span>Añadir fecha</span>
              <br />
              <input required type='date' name="date" onChange={e => {
                setExperienceDate(e.target.value)
              }} />
            </label>
            <label>
              <span>Añadir hora</span>
              <br />
              <input required type='time' name="hour" onChange={e => {
                setExperienceHour(e.target.value)
              }} />
            </label>
            <label>
              <span>Añadir plazas totales</span>
              <br />
              <input type='number' min='1' max='20' placeholder="Introduce plazas totales..." required name="seats" onChange={e => setTotalSeats(e.target.value)} />
            </label>
            <button>AÑADIR</button>
            <p>{messagePost}</p>
          </fieldset>
        </form>
        <button><Link className="link" to={'/profile/admin#allexperiences'}>VOLVER</Link></button>
      </div>
    </>
  )
}

const EditExperienceWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <EditExperience />
  </Suspense>

export default EditExperienceWrapper
