import useFetchSuspense from '-suspense'
import { useUser } from './hooks'

function useFetch(url) {
  const user = useUser()
  const opts = {}
  if (user?.token) {
    opts.headers = { 'Authorization': 'Bearer ' + user.token }
  }
  const data = useFetchSuspense(url, opts)
  return data

}


export default useFetch
