import { defineStore } from 'pinia'

import { Status } from '@/config/enum'

import type { LoginStatus } from '@/config/interface'

import AV from '@/config/leancloud'
const { User } = AV

export const useUserStore = defineStore('user', {
  state: () => ({
    user: <any> undefined,
    loginStatus: <LoginStatus>{
      status: Status.waiting
    } 
  }),
  actions: {
    setUserStatus(status: Status, message?: string) {
      this.loginStatus = {
        status,
        message
      }
    },
    setUser(user: any) {
      this.user = user
    },
    getUserLoginMessage() {
      const currentUser = User.current()
      if (currentUser) {
        this.setUserStatus(Status.success)
        this.setUser(currentUser)
      }
    },
    async Login(username: string, password: string) {
      try {
        const user = await User.logIn(username, password)
        this.setUser(user)
        this.setUserStatus(Status.success)
      } catch(e: any) {
        this.setUserStatus(Status.error, e.message as string)
      }
    },
    LogOut() {
      User.logOut()
      this.getUserLoginMessage()
    }
  }
})
