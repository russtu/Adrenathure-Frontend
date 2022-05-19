import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from "../useFetch"
import { Link } from "react-router-dom"
import { useSetModal, useUser } from '../hooks'
import '../List.css'
const BASE_URL = process.env.REACT_APP_URL


function AllPlaces() {
  const user = useUser()
  const setModal = useSetModal()

  const places = useFetch(`${BASE_URL}/places`)

  const handleClick = async (e) => {
    const placeId = e.target.value
    const res = await fetch(`${BASE_URL}/places/admin`, {
      method: 'DELETE',
      body: JSON.stringify({ placeId }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })
    if (res.ok) {
      setModal('El destino ha sido borrado con éxito.')
      setTimeout(() => {
        setModal(null)
        window.location.reload(true)
      }, 2000)
    } else {
      if (res.status === 404) {
        setModal('No se ha podido borrar el destino/Error desconocido.')
      }
      if (res.status === 500) {
        setModal('Hay una experiencia existente en este destino, por favor borra primero la experiencia.')
      }
    }
  }
  return places && (
    <>
      <div id='allPlaces' />
      <div className="list">
        <h2 className="list-title">LOS DESTINOS</h2>
        <div className='grid-list-places'>
          <span>
            <strong>NOMBRE DESTINO</strong>
          </span>
          <span>
            <strong>DESCRIPCIÓN</strong>
          </span>
          <span>
            <strong>COORDS-LAT</strong>
          </span>
          <span>
            <strong>COORDS-LONG</strong>
          </span>
          <span>
            <strong>FOTO</strong>
          </span>
        </div>
        {places.map(place =>
          <>
            <div key={place.id} className='grid-list-places'>
              <span className='columna'>{place.placeName}</span>
              <span className='columna'>{place.placeDescription}</span>
              <span className='columna'>{place.coordsLong}</span>
              <span className='columna'>{place.coordsLat}</span>
              <span><img className='photo-edit' src={`${BASE_URL}/${place.photo}`} alt="avatar" /></span>
            </div>
            <div class="section-buttons">
              <button className="button-link"><Link className="link" to={`/profile/admin/editPlace/${place.id}#editarDestino`}>EDITAR DESTINO</Link></button>
              <button className="bin" value={place.id} onClick={handleClick}>BORRAR</button>
            </div>
          </>
        )}
        <div class="button-anadir">
          <button><Link className="link" to={`/profile/admin/newPlace#crearDestino`}>AÑADIR NUEVO DESTINO</Link></button>
        </div>
        <div className="volver">
          <button><Link className="link" to={'/profile/admin#administracion'}>VOLVER</Link></button>
        </div>
      </div>
    </>
  )
}

const AllPlacesWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <AllPlaces />
  </Suspense>

export default AllPlacesWrapper
