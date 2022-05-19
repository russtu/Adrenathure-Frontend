import { Suspense, useState } from 'react'
import { useSetModal, useUser } from '../hooks'
import Loading from '../Loading'
const BASE_URL  = process.env.REACT_APP_URL



function UploadAvatar() {
  const [file, setFile] = useState(null)
  const setModal = useSetModal()
  const user = useUser()

  const handleSubmit = e => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('avatar', file)
    fd.append('Authorization', 'Bearer ' + user.token)

    const res = fetch(`${BASE_URL}/users/uploads`, {
      method: 'POST',
      body: fd,
      headers: fd
    })
    if (res) {
      setModal('file uploaded succesfully')
      setTimeout(() => {
        setModal(null)
        window.location.reload(true)
      }, 2000)
    }
  }
  return (
      <form onSubmit={handleSubmit}>
        <label>
          <span>Escojer foto perfil</span>
          <input required className="input" type='file' onChange={e => setFile(e.target.files[0])} />
          <button className="subir">SUBIR FOTO</button>
        </label>
      </form>
  )
}

const UploadAvatarWrapper = () =>
  <Suspense fallback={<Loading className='page' />}>
    <UploadAvatar />
  </Suspense>


export default UploadAvatarWrapper
