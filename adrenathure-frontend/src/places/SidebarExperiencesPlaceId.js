import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from '../useFetch'
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
const BASE_URL  = process.env.REACT_APP_URL


function SidebarExperiencesPlaceId() {
  const { id } = useParams()

  const experiencesPlaceId = useFetch(`${BASE_URL}/experiences/place/${id}`)

  return experiencesPlaceId && (
    <aside className="sidebar-experience-place">
      {experiencesPlaceId.length ?
        <>
          <ul className="ul-sidebar-exp-place">
            {experiencesPlaceId.map(i =>
              <li key={i.id}>
                <div className="sidebar-experience-place-link">
                <Link className="link-sidebar" to={`/experiences/${i.id}#experienceId`}>
                  {i.experienceName}
                </Link>
                {'★★★★★☆☆☆☆☆'.substring(5 - i.avgVote, 10 - i.avgVote)}
                </div>
              </li>
            )}
          </ul>
        </>
        : <p className='error'>En este momento no hay experiencias asociadas a este destino.</p>
      }
    </aside>
  )
}

const SidebarExperiencesPlaceIdWrapper = () =>
  <Suspense fallback={<Loading className="sidebar-experiences-placeId" />}>
    <SidebarExperiencesPlaceId />
  </Suspense>

export default SidebarExperiencesPlaceIdWrapper
