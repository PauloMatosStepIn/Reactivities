import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { Activity } from '../models/activity'
import { User, UserFormValues } from '../models/user'
import { store } from '../stores/store'

// const sleep = (delay: number) => {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay)
//   })
// }

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(config => {
  const token = store.commonStore.token

  if (!config.headers) {
    config.headers = {}
  }

  config.headers.Authorization = `Bearer ${token}`

  return config
})

axios.interceptors.response.use(
  async response => {
    //await sleep(1500)
    return response
  },
  (error: AxiosError) => {
    const { data, statusText, status } = error.response!
    switch (status) {
      case 400:
        toast.error(statusText)
        break
      case 401:
        toast.error('unathorised')
        break
      case 404:
        toast.error('not found')
        break
      case 500:
        store.commonStore.setServerError(data as any)
        toast.error(statusText)
        break
    }
    return Promise.reject(error)
  }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
  list: () => request.get<Activity[]>('/activities'),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => request.post<void>('/activities', activity),
  update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`)
}

const Account = {
  current: () => request.get<User>('/account'),
  login: (user: UserFormValues) => request.post('/account/login', user),
  register: (user: UserFormValues) => request.post('/account/register', user)
}

const agent = {
  Activities,
  Account
}

export default agent
function data(data: any) {
  throw new Error('Function not implemented.')
}
