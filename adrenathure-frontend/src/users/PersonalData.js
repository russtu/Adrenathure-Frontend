import { Suspense } from 'react'
import Loading from '../Loading'
import useFetch from '../useFetch'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import './PersonalData.css'
import ErrorBoundary from '../ErrorBoundary'
import Bookings from '../bookings/Bookings'
const BASE_URL  = process.env.REACT_APP_URL


function PersonalData() {
  const personalData = useFetch(`${BASE_URL}/users/profile`)
  return personalData && (
    <div className="data">
      <div id='datos'>TUS DATOS</div>
      <div className="allPersonalData">
        <Avatar />
        <div className="personalData">
          <h4>{personalData.firstName} {personalData.lastName}</h4>
          <h4 className="email">{personalData.email}</h4>
        </div>
        <button className="button-link"><Link className="link" to="/profile/editar#editarPerfil">EDITAR PERFIL</Link></button>
      </div>
      <div id='bookingsTitleProfile'>RESERVAS</div>
      <Bookings />
    </div>
  )
}

const PersonalDataWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <ErrorBoundary fallback="PersonalData is failing">
      <PersonalData />
    </ErrorBoundary>
  </Suspense>


export default PersonalDataWrapper
