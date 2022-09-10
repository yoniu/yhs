<script setup lang="ts">
  import { watchEffect } from 'vue'
  import { RouterView } from 'vue-router'

  import { useSiteStore } from './stores/site'

  import { localOptions } from './config/default'
  import { Status } from '@/config/enum'

  import Header from './components/Header.vue'
  import Loading from './components/Loading.vue'
  const siteOptions = useSiteStore()
  siteOptions.getSiteOptions()
  const options = siteOptions.siteOptions;
  watchEffect(() => {
    if(typeof(options.values) == 'function')
      document.title = options.get('site_name') ?? localOptions.siteTitle
    else
      document.title = localOptions.siteTitle
  })
</script>

<template>
  <Header id="header" :options="siteOptions" />
  <div id="content">
    <RouterView />
  </div>
  <Loading :site-mail="siteOptions.siteEmailMd5" :class="{
    'hide': siteOptions.siteStatus == Status.success
  }" />
</template>

<style lang="less" scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(-45deg, #FA897B, #FFDD94);
  box-shadow: 10px 0 20px rgba(0, 0, 0, .1);
  z-index: 1;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background-image: url("https://www.transparenttextures.com/patterns/food.png");
    z-index: 0;
  }
}
#content {
  position: fixed;
  top: 0; left: 50%;
  width: 50%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
