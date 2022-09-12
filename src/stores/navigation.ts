import { defineStore } from 'pinia'

import { Status } from '@/config/enum'

import AV from '@/config/leancloud'
const { Query } = AV

export const useNavStore = defineStore('navigation', {
  state: () => ({
    nav: new Array(),
    navStatus: Status.waiting 
  }),
  actions: {
    setNavStatus(status: Status) {
      this.navStatus = status
    },
    getNavigation() {
      const navDispatch = new Query('navigation')
      navDispatch.find().then((navs) => {
        navs.forEach((item) => {
          this.nav.push({
            type: item.get('type'),
            title: item.get('title'),
            description: item.get('description'),
            url: item.get('url'),
            icon: item.get('icon'),
          })
        })
      }).then(() => {
        console.log(this.nav)
        this.setNavStatus(Status.success)
      }).catch((e) => {
        this.setNavStatus(Status.error)
      })
    }
  }
})
