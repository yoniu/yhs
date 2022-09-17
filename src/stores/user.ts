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

    },
    Login(username: string, password: string) {
      User.logIn(username, password).then((user) => {
        this.setUser(user)
        this.setUserStatus(Status.success)
      }).catch((e) => {
        this.setUserStatus(Status.error)
      })
    }
  }
})
