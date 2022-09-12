import { defineStore } from 'pinia'
import md5 from 'md5-js'

import { localOptions } from '@/config/default'
import { Status } from '@/config/enum'

import AV from '@/config/leancloud'
const { Query } = AV

export const useSiteStore = defineStore('site', {
  state: () => ({
    siteOptions: new Map(),
    siteStatus: Status.waiting 
  }),
  getters: {
    siteEmailMd5(state) {
      return md5(state.siteOptions.get('site_email') || localOptions.siteMail)
    }
  },
  actions: {
    getSiteOptions() {
      const siteDispatch = new Query('option')
      siteDispatch.find().then((options) => {
        options.forEach((option) => {
          this.siteOptions.set(option.get('option'), option.get('value'))
        })
      }).then(() => {
        this.setSiteStatus(Status.success)
      }).catch((e) => {
        this.setSiteStatus(Status.error)
      })
    },
    setSiteStatus(status: Status) {
      this.siteStatus = status
    }
  }
})
