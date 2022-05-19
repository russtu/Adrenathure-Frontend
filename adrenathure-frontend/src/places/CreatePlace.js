import { Suspense, useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useSetModal, useUser } from '../hooks'
import Loading from '../Loading'
import '../Form.css'
const BASE_URL  = process.env.REACT_APP_URL



function CreatePlace() {
  const [placeName, setPlaceName] = useState('')
  const [placeDescription, setPlaceDescription] = useState('')
  const [coordsLong, setCoordsLong] = useState('')
  const [coordsLat, setCoordsLat] = useState('')
  const [file, setFile] = useState(null)
  const setModal = useSetModal()

  const navigate = useNavigate()
  const user = useUser()

  const handleSubmit = async e => {
    e.preventDefault()
    const fd = new FormData()
    if (file) {
      fd.append('avatar', file)
    }
    fd.append('placeName', placeName)
    fd.append('placeDescription', placeDescription)
    if (coordsLong) {
          fd.append('coordsLong', coordsLong)
    }
    if (coordsLat) {
          fd.append('coordsLat', coordsLat)
    }

    const res = await fetch(`${BASE_URL}/places/admin`, {
      method: 'POST',
      body: fd,
      headers: {
        Authorization: 'Bearer ' + user.token
      }
    })

    if (res.ok) {
      // const data = await res.json()
      setModal('Nuevo destino creado con éxito.')
      setTimeout(() => {
        navigate('/Places#places')
        setModal(null)
        window.location.reload(true)
      }, 2000)
      
    } else {
      setModal('Error desconocido.')
    }
    setPlaceName('')
  }

  if (!user) {
    return <Navigate to="/login#divLogin" />
  }

  return (
    <div id='crearDestino'>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form-section">
          <legend>CREAR DESTINO</legend>
          <label>
            <span>Nombre destino</span>
            <br/>
            <input required name="name" placeholder="Introduce nombre del destino..." value={placeName} onChange={e => setPlaceName(e.target.value)} />
          </label>
          <label>
            <span>Descripción destino</span>
            <br/>
            <textarea required name="description" placeholder="Introduce descripción del destino..." value={placeDescription} onChange={e => setPlaceDescription(e.target.value)} />
          </label>
          <label>
            <span>Coordenadas latitud</span>
            <br/>
            <input name="dates" placeholder="Introduce longitude del destino..." value={coordsLong} onChange={e => setCoordsLong(e.target.value)} />
          </label>
          <label>
            <span>Coordenadas longitud</span>
            <br/>
            <input name="hour" placeholder="Introduce latitude del destino..." value={coordsLat} onChange={e => setCoordsLat(e.target.value)} />
          </label>
          <label>
          <span>Escojer foto destino</span>
          <input  className="input" type='file' onChange={e => setFile(e.target.files[0])} />
          </label>
          <button>GUARDAR</button>
        </fieldset>
        <div className="volver">
          <button><Link className="link" to={'/profile/admin/allPlaces#allPlaces'}>VOLVER</Link></button>
      </div>
      </form>
    </div>
  )
}

const CreatePlaceWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <CreatePlace />
  </Suspense>

export default CreatePlaceWrapper
