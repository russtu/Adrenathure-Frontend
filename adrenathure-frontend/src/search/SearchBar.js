import { Suspense, useState } from 'react'
import useFetch from 'fetch-suspense'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'
import { useSetModal } from '../hooks'
import '../Modal.css'
import './SearchBar.css'
const BASE_URL = process.env.REACT_APP_URL


function SearchBar() {
  const setModal = useSetModal()
  const navigate = useNavigate()

  const [viewPlace, setViewPlace] = useState(false)
  const [viewPrice, setViewPrice] = useState(false)

  const [viewDate, setViewDate] = useState(false)

  const [valuePlace, setValuePlace] = useState('')
  const [valueLowPrice, setValueLowPrice] = useState('')
  const [valueHighPrice, setValueHighPrice] = useState('')
  const [valueDateFrom, setValueDateFrom] = useState('')
  const [valueDateTo, setValueDateTo] = useState('')

  const placesData = useFetch(`${BASE_URL}/places`)

  const showDefault = () => {
    setValuePlace('')
    setValueLowPrice('')
    setValueHighPrice('')
    setValueDateFrom('')
    setValueDateTo('')
  }
  const handleClick = () => {
    setViewPlace(true)
    setModal(null)
  }
  const handleClick2 = () => {
    setViewPrice(true)
    setModal(null)
  }
  const handleClick3 = () => {
    setViewDate(true)
    setModal(null)
  }

  function Modal1() {
    return (
      <>
        <select defaultValue={'Destino:'} onChange={(e) => setValuePlace(e.target.value)}>
          <option disabled  >Destino:</option>
          {
            placesData.map(place =>
              <option key={place.id} className='place' value={place.placeName} >{place.placeName}</option>
            )
          }
        </select>
        <button className="button-modal" onClick={handleClick}>APLICAR</button>
      </>)
  }
  function Modal2() {
    return (
      <>
        <select defaultValue={'Precio desde:'} onChange={(e) => setValueLowPrice(e.target.value)}>
          <option disabled >Precio desde:</option>
          <option className='price' value={100} >100</option>
          <option className='price' value={200} >200</option>
          <option className='price' value={300} >300</option>
          <option className='price' value={500} >500</option>
        </select>
        <select defaultValue={'Precio hasta:'} onChange={(e) => setValueHighPrice(e.target.value)}>
          <option disabled >Precio hasta:</option>
          <option className='price' value={300} >300</option>
          <option className='price' value={500} >500</option>
          <option className='price' value={1000} >1000</option>
          <option className='price' value={2000} >2000</option>
        </select>
        <button className="button-modal" onClick={handleClick2}>APLICAR</button>
      </>)
  }

  function Modal3() {
    return (
      <div id='calendarSearchBar'>
        <label className="modal-element">Fecha desde</label>
        <input className='inputCalendarSearchBar' placeholder="Fecha desde" type='date' defaultValue={'Fecha desde:'} onChange={(e) => setValueDateFrom(e.target.value)} />
        <label className="modal-element">Fecha hasta</label>
        <input className='inputCalendarSearchBar' type='date' defaultValue={'Fecha hasta:'} onChange={(e) => setValueDateTo(e.target.value)} />
        <button className="button-modalDates" onClick={handleClick3}>APLICAR</button>
      </div>
    )
  }
  return (
    <div className='searchBar'>
      <div className='selectSearchBar'>
        <div className='buttons-searchBar' onClick={() => {
          setModal(<Modal1 />)
          setViewPlace(false)
          setValuePlace('')
        }}>
          {viewPlace && valuePlace ? valuePlace : 'Destino ⌄'}
        </div>
        <div className='buttons-searchBar' onClick={() => {
          setModal(<Modal2 />)
          setViewPrice(false)
          setValueHighPrice('')
          setValueLowPrice('')
        }} >
          {viewPrice && (valueLowPrice || valueHighPrice) ? ` desde: ${valueLowPrice}€ - hasta: ${valueHighPrice}€` : 'Precio ⌄'}

        </div>
        <div className='buttons-searchBar' onClick={() => {
          setModal(<Modal3 />)
          setViewDate(false)
          setValueDateFrom('')
          setValueDateTo('')
        }}>
          {viewDate && (valueDateFrom || valueDateTo) ? <><p>Desde: {valueDateFrom}</p> <p>Hasta: {valueDateTo}</p></> : 'Fecha ⌄'}
        </div>
      </div>
      <div className="search">
        <div onClick={() => {
        }}><img onClick={() => {
          const searchUrl = new URLSearchParams()
          if (valuePlace) {
            searchUrl.set('place', valuePlace)
          }
          if (valueLowPrice) {
            searchUrl.set('lowPrice', valueLowPrice)
          }
          if (valueHighPrice) {
            searchUrl.set('highPrice', valueHighPrice)
          }
          if (valueDateFrom) {
            searchUrl.set('dateFrom', valueDateFrom)
          }
          if (valueDateTo) {
            searchUrl.set('dateTo', valueDateTo)
          }
          navigate(`/search?${searchUrl.toString()}#title-searchPage`)
        }} className="lupa" src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" alt="lupa" />
        </div>
        <img className="lupa" src="https://img.icons8.com/fluency-systems-regular/48/000000/cancel.png" alt="clear" onClick={() => {
          showDefault()
        }}></img>
      </div>
    </div>
  )
}
const searchBarWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <SearchBar />
  </Suspense>

export default searchBarWrapper
