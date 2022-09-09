import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import md5 from 'md5-js'

import AV from 'leancloud-storage'
const { Query } = AV
import { leancloud } from '../config/leancloud'

AV.init({
  appId: leancloud.appId,
  appKey: leancloud.appKey,
  serverURL: leancloud.restAPI
});

enum Status {
  error = 0,
  unbulid,
  success,
  waiting
}

export const useSiteStore = defineStore('site', {
  state: () => ({
    siteOptions: new Map(),
    siteStatus: Status.waiting 
  }),
  getters: {
    siteEmailMd5(state) {
      return md5(state.siteOptions.get('site_email'))
    }
  },
  actions: {
    getSiteOptions() {
      const siteDispatch = new Query('option')
      siteDispatch.find().then((options) => {
        options.forEach((option) => {
          this.siteOptions.set(option.get('option'), option.get('value'))
        })
      })
    }
  }
})
