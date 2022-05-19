import useFetch from 'fetch-suspense'
import { Suspense } from 'react'
import { Link } from "react-router-dom"
import Loading from '../Loading'
import './Experiences.css'
const BASE_URL  = process.env.REACT_APP_URL


function Experiences() {
  const experiences = useFetch(`${BASE_URL}/experiences`)

  return experiences && (
    <div id='experiences'>
      {experiences.length ?
        experiences.map(experience =>
          <div key={experience.id} className='articleExp'>
            <div className='photoArticle'>
              <img className='photoExperience' src={`${BASE_URL}/${experience.experiencePhoto}`} alt='foto experiencia'></img>
            </div>
            <div key={experience.id} >
              <Link to={`/experiences/${experience.id}#experienceId`} className='title-exp'>
                {experience.experienceName}
              </Link>
              <p>{'★★★★★☆☆☆☆☆'.substring(5 - experience.avgVote, 10 - experience.avgVote)}</p>
              <p className='experience-description'>{experience.experienceDescription}</p>
              <Link to={`/experiences/${experience.id}#experienceId`} className='button-exp'>
                descubrir más
              </Link>
            </div>
          </div>
        ) : <p>Aún no hay experiencias existentes, disculpe las molestias.</p>}
    </div>
  )
}

const ExperiencesWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <Experiences />
  </Suspense>


export default ExperiencesWrapper
