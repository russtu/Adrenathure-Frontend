import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from 'fetch-suspense'
import { Link } from "react-router-dom"
import '../experiences/Experiences.css'
const BASE_URL  = process.env.REACT_APP_URL



function SidebarPlaces() {
  const places = useFetch(`${BASE_URL}/places`)
  
  return places && (
    <div className="experiences">
      <div id='places'></div>
        { places.length ?
        places.map(place =>
          <div key={place.id} className='articleExp'>
            <div className='photoArticle'>
              <img className='photoExperience' src={`${BASE_URL}/${place.photo}`} alt='foto experiencia'></img>
            </div>
            <div key={place.id} >
              <Link to={`/places/${place.id}#placeId`} className='title-exp'>
                {place.placeName}
              </Link>
              <p className='experience-description'>{place.placeDescription}</p>
              <Link to={`/places/${place.id}#placeId`} className='button-exp'>
                DESCUBRIR MÁS
              </Link>
            </div>
          </div>
        ): <p>aun no hay destinos disponibles, disculpa las molestias.</p>}
    </div>

  )
}

const SidebarPlacesWrapper = () =>
  <Suspense fallback={<Loading className="page" />}>
    <SidebarPlaces />
  </Suspense>

export default SidebarPlacesWrapper
