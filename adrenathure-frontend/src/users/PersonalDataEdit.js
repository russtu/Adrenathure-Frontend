import { Suspense, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSetModal, useUser } from '../hooks'
import Loading from '../Loading'
import useFetch from '../useFetch'
import UploadAvatar from './UploadAvatar'
import Avatar from './Avatar'
import '../Form.css'
const BASE_URL = process.env.REACT_APP_URL


function PersonalDataEdit() {
  const setModal = useSetModal()
  const personalData = useFetch(`${BASE_URL}/users/profile`)
  const [firstName, setFirstName] = useState(personalData.firstName || '')
  const [lastName, setLastName] = useState(personalData.lastName || '')
  const [email, setEmail] = useState(personalData.email || '')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const user = useUser()

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/users`, {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, email }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }
    })
    // const data = await res.json()
    if (res.ok) {
      setMessage('Updated successfully')
      setModal(<span>Perfil actualizado correctamente</span>)
      setTimeout(() => {
        navigate('/Profile#datos')
        setModal(null)
        window.location.reload(true)
      }, 2000)
    } else {
      setMessage('Error desconocido')
    }
  }

  const handleSubmitPass = async e => {
    e.preventDefault()
    if (password === password2) {
      const res = await fetch(`${BASE_URL}/users`, {
        method: 'PUT',
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
      // const data = await res.json()
      if (res.ok) {
        setMessage('Updated successfully')
        setModal(<span>Contraseña actualizada correctamente</span>)
        setTimeout(() => {
          navigate('/Profile#datos')
          setModal(null)
          window.location.reload(true)
        }, 2000)
      } else {
        setMessage('Error desconocido')
      }
    } else {
      setModal(<p>Las contraseñas deben ser iguales</p>)
      setPassword('')
      setPassword2('')
    }
  }
  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <div id='editarPerfil' />
      <div className="form">
        <fieldset className="form-section">
          <legend>EDITAR FOTO</legend>
          <div className="avatar-edit">
            <Avatar />
            <UploadAvatar />
          </div>
        </fieldset>
        <form onSubmit={handleSubmit}>
          <fieldset className="form-section">
            <legend>EDITAR DATOS PERSONALES</legend>
            <label>
              <span>nombre*</span>
              <br />
              <input name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </label>
            <label>
              <span>apellidos*</span>
              <br />
              <input name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            </label>
            <label>
              <span>e-mail*</span>
              <br />
              <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <p>* campos obligatorios</p>
            <br />
            <button>GUARDAR</button>
            <p>{message}</p>
          </fieldset>
        </form>
        <form onSubmit={handleSubmitPass}>
          <fieldset className="form-section">
            <legend>CAMBIAR CONTRASEÑA</legend>
            <label>
              <span>Nueva contraseña*</span>
              <br />
              <input required type="password" placeholder="Confirma tu contraseña..." name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
              <span>Confirma la nueva contraseña*</span>
              <br />
              <input required type="password" placeholder="Confirma tu contraseña..." name="password" value={password2} onChange={e => setPassword2(e.target.value)} />
            </label>
            <p>* campos obligatorios</p>
            <br />
            <button>GUARDAR</button>
            <p>{message}</p>
          </fieldset>
        </form>
      </div>
    </>
  )
}

const PersonalDataEditWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <PersonalDataEdit />
  </Suspense>


export default PersonalDataEditWrapper
