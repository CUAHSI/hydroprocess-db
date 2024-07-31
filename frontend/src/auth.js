import { ENDPOINTS } from '@/constants'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from './stores/alerts'

export async function logIn(username, password, callback) {
  const alertStore = useAlertStore()
  const authStore = useAuthStore()
  
  // create a new FormData object
  const formData = new FormData()
  // append the username and password to the form
  formData.append('username', username)
  formData.append('password', password)
  // send the form data to the login endpoint
  const response = await fetch(ENDPOINTS.authLogin, {
    method: 'POST',
    body: formData
  })
  console.log('response', response)
  const json = await response.json()
  if (!response.ok) {
    alertStore.displayAlert({
      title: 'Error logging in',
      text: json.detail,
      type: 'error',
      closable: false,
      duration: 3
    })
    return
  }

  authStore.login(json)

  const userinfo = await fetch(ENDPOINTS.userInfo, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${json.access_token}`
    }
  })
  if (userinfo.ok) {
    const result = await userinfo.json()
    authStore.user = result
    alertStore.displayAlert({
      title: 'Logged in',
      text: 'You have successfully logged in',
      type: 'success',
      closable: true,
      duration: 3
    })
    callback?.()
  } else {
    alertStore.displayAlert({
      title: 'Error getting user info',
      text: 'There was an error getting user info',
      type: 'error',
      closable: true,
      duration: 3
    })
  }
}

export async function logOut(callback) {
  const authStore = useAuthStore()
  const alertStore = useAlertStore()
  authStore.logout()
  await fetch(ENDPOINTS.logout, { method: 'POST', credentials: 'include', mode: 'cors' })
  alertStore.displayAlert({
    title: 'Logged out',
    text: 'You have successfully logged out',
    type: 'success',
    closable: true,
    duration: 3
  })
  callback?.()
}
