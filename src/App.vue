<script setup lang="ts">
  // vue
  import { watchEffect, ref, onMounted } from 'vue'
  import { RouterView } from 'vue-router'

  // pinia
  import { useSiteStore } from './stores/site'

  // 本地设置
  import { localOptions } from './config/default'
  import { Status } from '@/config/enum'

  // 组件
  import Header from './components/Header.vue'
  import Loading from './components/Loading.vue'

  // pinia 获取设置
  const siteOptions = useSiteStore()
  siteOptions.getSiteOptions()
  const options = siteOptions.siteOptions;
  // 获取页面标题
  watchEffect(() => {
    if(typeof(options.values) == 'function')
      document.title = options.get('site_name') ?? localOptions.siteTitle
    else
      document.title = localOptions.siteTitle
  })
  
  // 判断是否电脑端设置可视宽度
  const appWidth = ref(0);
  onMounted(() => {
    if (document.body.clientHeight < document.body.clientWidth) {
      appWidth.value = Math.ceil(document.body.clientHeight * (9 / 16));
      window.addEventListener("resize", function () {
        appWidth.value = Math.ceil(document.body.clientHeight * (9 / 16));
      });
    } else {
      appWidth.value = Math.ceil(document.body.clientWidth);
    }
  })
</script>

<template>
  <div id="container" :style="`--width: ${appWidth}px`">
    <Header id="header" :options="siteOptions" />
    <div id="content">
      <RouterView />
    </div>
  </div>
  <Loading :site-mail="siteOptions.siteEmailMd5" :class="{
    'hide': siteOptions.siteStatus == Status.success
  }" />
</template>

<style lang="less" scoped>
#container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: var(--width);
  min-height: 100vh;
  background-color: #fff;
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);
  overflow: hidden;
}
@media only screen and (min-width : 320px) and (max-width : 767px) {
  #container {
    width: 100vw;
  }
}
</style>
