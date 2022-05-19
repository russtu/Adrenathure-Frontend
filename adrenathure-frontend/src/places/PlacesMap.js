import { Suspense } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Loading from '../Loading'
import './Places.css'
import useFetch from 'fetch-suspense'
import { Link } from "react-router-dom"
const BASE_URL  = process.env.REACT_APP_URL


function PlacesMap() {
  const places = useFetch(`${BASE_URL}/places/`)

  return (
    <MapContainer id="placesMap"center={[40.4310754, -3.7028892]} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"/>
      {places.map(place =>
        <Marker key={place.id} position={ [place.coordsLong, place.coordsLat] }>
          <Popup>
            <Link to= {`/places/${place.id}#placeId`}>{place.placeName}</Link>
          </Popup>
        </Marker>)}
    </MapContainer>
  )
}

const PlacesMapWrapper = () =>
  <Suspense fallback={<Loading />}>
    <PlacesMap />
  </Suspense>

export default PlacesMapWrapper
