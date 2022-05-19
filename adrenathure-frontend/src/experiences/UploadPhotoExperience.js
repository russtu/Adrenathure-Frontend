import { useState } from 'react'
import { useUser } from '../hooks'
const BASE_URL  = process.env.REACT_APP_URL


function UploadPhotoExperience() {
  const [file, setFile] = useState(null)
  const user = useUser()

  const handleSubmit = e => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('avatar', file)
    fd.append('Authorization', 'Bearer ' + user.token)

    fetch(`${BASE_URL}/experiences`, {
      method: 'POST',
      body: fd,
      headers: fd
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        escoge foto experiencia
        <input className="input" type='file' onChange={e => setFile(e.target.files[0])} />
        <button className="subir">SUBIR FOTO</button>
      </label>
    </form>
  )
}

export default UploadPhotoExperience
