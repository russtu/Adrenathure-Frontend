import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'
import useFetch from './useFetch'
const BASE_URL  = process.env.REACT_APP_URL


function AccountActivated() {
  let { validateCode }= useParams()

  const emailValidate = useFetch(`${BASE_URL}/users/validate/${validateCode}`)

  return (
    <div id='activatedPage'>
      <div className='loginRegisteredMessage'>Bienvenido a Adrenathure , Tu Cuenta ha sido activada correctamente</div>
      <Link to='/login#divLogin'>Login</Link>
    </div>
  )
}

const AccountActivatedWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <AccountActivated />
  </Suspense>


export default AccountActivatedWrapper
