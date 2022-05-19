import { Suspense } from "react"
import { Link } from "react-router-dom"
import Loading from "../Loading"
import useFetch from "../useFetch"
import './Sidebar.css'
const BASE_URL  = process.env.REACT_APP_URL


function Sidebar() {
  const experiences = useFetch(`${BASE_URL}/experiences`)

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload(true)
    }, 100)
  }


  return experiences && (
    <aside className="sidebar">
      <ul className="ul-sidebar">
        {experiences.map(experience =>
          <li key={experience.id}>
            <Link onClick={handleClick} className="link-sidebar" to={`/experiences/${experience.id}#experienceId`}>
              {experience.experienceName}
            </Link>
          </li>
        )}
      </ul>
    </aside>
  )
}
const SidebarWrapper = () =>
  <Suspense fallback={<Loading className="page" />}>
    <Sidebar />
  </Suspense>

export default SidebarWrapper
