import { Agent } from 'http'
import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { User, UserFormValues } from '../models/user'
import { store } from './store'

export default class UserStore {
  user: User | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get IsLoggedIn() {
    return !!this.user
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = (await agent.Account.login(creds)) as User
      store.commonStore.setToken(user.token)
      runInAction(() => (this.user = user))
      store.modalStore.closeModal()
    } catch (error) {
      throw error
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    window.localStorage.removeItem('jwt')
    this.user = null
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => (this.user = user))
    } catch (error) {
      console.log(error)
    }
  }

  register = async (creds: UserFormValues) => {
    try {
      const user = (await agent.Account.register(creds)) as User
      store.commonStore.setToken(user.token)
      runInAction(() => (this.user = user))
      store.modalStore.closeModal()
    } catch (error) {
      throw error
    }
  }
}
