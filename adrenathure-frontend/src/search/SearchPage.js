import useFetch from 'fetch-suspense'
import { Suspense } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../Loading'

const BASE_URL = process.env.REACT_APP_URL


function SearchPage() {

  let { search } = useLocation()
  const experiences2 = useFetch(`${BASE_URL}/experiences${search}`)

  let experiencesMap = experiences2.map(exp => {
    return [JSON.stringify(exp), exp]
  });
  let experiencesMapArr = new Map(experiencesMap); // Pares de clave y valor

  let experiences = [...experiencesMapArr.values()]; // Conversión a un array



  return (
    <>
      <div className='errorSearch'>
        <h2 id='title-searchPage'>Resultados de la busqueda:</h2>
      </div>
      <div className='experiences'>
        {experiences.length ?
          experiences.map(experience =>
            <div key={experience.experience_id} className='articleExp'>
              <div className='photoArticle'><img className='photoExperience' src={`http://${BASE_URL}/${experience.experiencePhoto}`} alt="avatar" /></div>
              <article key={experience.id} >
                <Link className='title-exp' to={`/experiences/${experience.experience_id}#experienceId`}>{experience.experienceName}</Link>
                <p>{'★★★★★☆☆☆☆☆'.substring(5 - experience.avgVote, 10 - experience.avgVote)}</p>
                <p className='description'> {experience.experienceDescription}</p>
                <p className='searchData'>Destino: {experience.placeName}</p>
                <p className='searchData'>Precio: {experience.price} €</p>
                <Link to={`/experiences/${experience.id}#experienceId`} className='button-exp'>
                  descubrir más
                </Link>
              </article>
            </div>
          ) : <p id='messageNoContent'>no se han encontrado resultados</p>}
      </div>
    </>
  )
}

const SearchPageWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <SearchPage />
  </Suspense>


export default SearchPageWrapper
