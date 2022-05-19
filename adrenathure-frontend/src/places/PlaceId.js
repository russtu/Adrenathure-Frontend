import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from 'fetch-suspense'
import { useParams } from "react-router-dom"
import ErrorBoundary from '../ErrorBoundary'
import './Place.css'
import SidebarExperiencesPlaceIdWrapper from './SidebarExperiencesPlaceId'
const BASE_URL  = process.env.REACT_APP_URL


function PlaceId() {
  const { id } = useParams()
  const placeId = useFetch(`${BASE_URL}/places/${id}`)
  return placeId && (
    <>
    <div id='placeId'></div>
    <div className="space-place">
      <div className="space-photo">
        <img className='photo-place' src={`${BASE_URL}/${placeId.photo}`} alt='foto experiencia'></img>
      </div>
      <div className="space-content">
        <h2 className="place-title">{placeId.placeName}</h2>
        <p className="place-text">{placeId.placeDescription}</p>
        <p className="place-text">Escoge alguna de las experiencias que realizamos en {placeId.placeName}:</p>
        <SidebarExperiencesPlaceIdWrapper />
      </div>
    </div>
    </>
  )
}

const PlaceIdWrapper = () =>
  <Suspense fallback={<Loading className="page" />}>
    <ErrorBoundary fallback="Bookings is failing">
      <PlaceId />
    </ErrorBoundary>
  </Suspense>

export default PlaceIdWrapper
