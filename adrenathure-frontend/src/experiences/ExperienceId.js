import { useParams } from "react-router-dom"
import useFetch from "../use"
import Sidebar from "./Sidebar"
import { Suspense, useEffect, useState } from "react"
import Loading from "../Loading"
import { Link } from 'react-router-dom'
import './ExperienceId.css'
const BASE_URL  = process.env.REACT_APP_URL


function ExperienceId() {
  const { id } = useParams()
  const [experienceDate, setExperienceDate] = useState('')

  const experienceId = useFetch(`${BASE_URL}/experiences/${id}`)

  useEffect(() => {
    setExperienceDate(null)
  }, [experienceId])

  return experienceId && (
    <div id="experienceId">
      <div className="experience">
        <Sidebar className="sidebar" />
        <div className="space-experience">
          <div className="space-photo">
            <img className='photo-experience' src={`${BASE_URL}/${experienceId[0].experiencePhoto}`} alt='foto experiencia'></img>
          </div>
          <div className="space-content">
            <div className="experience-title">
              <h2>{experienceId[0].experienceName} en {experienceId[0].placeName}</h2>
              <div>{'★★★★★☆☆☆☆☆'.substring(5 - experienceId[0].avgVote, 10 - experienceId[0].avgVote)}</div>
            </div>
            <div className="experience-content">
              <p className="experience-text">{experienceId[0].experienceDescription}</p>
              <p className="experience-price">Hora de la Experiencia: {experienceId[0].experienceHour}</p>
              <div className="price-date">
                <p className="experience-price">Precio: {experienceId[0].price}€</p>
                {(experienceId[0].experienceDate && experienceId[0].availableSeats > 0) ?
                  <>
                    <select className="select-date" defaultValue={'Escoje una de las fechas disponibles y vive la experiencia!'} onChange={e => {
                      setExperienceDate(e.target.value)
                    }} name='Escoje una de las fechas disponibles y vive la experiencia!'>
                      <option className="select-date" disabled >Escoje una de las fechas disponibles y vive la experiencia!</option>
                      {experienceId.map(experience =>
                        (experience.availableSeats > 0) &&
                        <option required key={experience.id} name="date" value={experience.experienceDate} >{experience.experienceDate}</option>
                      )
                      }
                    </select>
                  </>
                  : <p>No hay fechas disponibles</p>}
                {experienceDate &&
                  <button className="reservar"><Link className="link" to={`/experiences/${experienceId[0].id}/${experienceDate}/book#reservar`}>RESERVAR</Link></button>}
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

const ExperienceIdWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <ExperienceId />
  </Suspense>


export default ExperienceIdWrapper
