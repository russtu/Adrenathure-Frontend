import { Suspense, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSetModal, useSetRegister } from "../hooks"
import Loading from "../Loading"
import '../Form.css'
const BASE_URL  = process.env.REACT_APP_URL


function Register() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()
  const setRegistered = useSetRegister()
  const setModal = useSetModal()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify({ email, password: pass, firstName, lastName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // const data = await res.json()
    if (res.ok) {
      setModal('Usuario registrado con éxito.')
      setRegistered(true)
      setTimeout(() => {
        navigate('/login#divLogin')
        setModal(null)
      }, 2000)

    } else {
      if (res.status === 500 ){
        setModal('Database error')
      }
      if (res.status === 409 ){
        setModal('El usuario ya existe')
      }  }
  }

  return (
    <div id='divRegister'>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form-section ">
          <legend>Crea tu cuenta adrenathure y disfruta de nuestras exclusivas experiencias</legend>
          <label>
            <span>Nombre*</span>
            <br/>
            <input name="nombre" type='text' placeholder="Introduce tu nombre..." value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
          </label>
          <label>
            <span>Apellidos*</span>
            <br/>
            <input name="apellidos" type='text' placeholder="Introduce tus apellidos..." value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
          </label>
          <label>
            <span>E-mail*</span>
            <br/>
            <input type='email' placeholder="Introduce tu e-mail..." value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </label>
          <label>
            <span>Contraseña*</span>
            <br/>
            <input type='password' placeholder="Introduce tu password..." value={pass} onChange={(e) => setPass(e.target.value)}></input>
          </label>
          <p>* campos obligatorios</p>
          <button>CREAR CUENTA</button>
        </fieldset>
      </form>
      <nav>
        <p>Ya te has registrado? <Link to="/login#divLogin" className='linkLogin'> Acceder</Link></p>
      </nav>
      <p>Al pulsar sobre “crear cuenta” confirmas haber leído y estar de acuerdo con la <Link to="/politicaDePrivacidad#privacidad" target='_blank' rel="noreferrer" id='cookies'>Política de Privacidad</Link>.</p>
    </div>
  )
}

const RegisterWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <Register />
  </Suspense>


export default RegisterWrapper
