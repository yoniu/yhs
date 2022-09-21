<script setup lang="ts">
  // vue
  import { watchEffect, ref, onMounted, provide } from 'vue'
  import { RouterView } from 'vue-router'

  // pinia
  import { useSiteStore } from '@/stores/site'
  import { useNavStore } from '@/stores/navigation'
  import { useUserStore } from '@/stores/user'

  // 本地设置
  import { localOptions } from '@/config/default'
  import { Status } from '@/config/enum'

  // 组件
  import { NDialogProvider, NMessageProvider } from 'naive-ui'
  import Header from '@/components/Header.vue'
  import Loading from '@/components/Loading.vue'

  // pinia 获取设置
  const siteOption = useSiteStore()
  const navOption = useNavStore()
  const user = useUserStore()
  siteOption.getSiteOptions()
  navOption.getNavigation()
  user.getUserLoginMessage()

  provide('loginStatus', user.loginStatus)

  // 获取页面标题
  watchEffect(() => {
    const options = siteOption.siteOptions
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
  <n-dialog-provider>
    <n-message-provider>
      <div id="container" :style="`--width: ${appWidth}px`">
        <Header id="header" :options="siteOption" :nav="navOption" />
        <div id="content">
          <RouterView />
        </div>
      </div>
      <Loading :site-mail="siteOption.siteEmailMd5" :class="{
        'hide': siteOption.siteStatus == Status.success && navOption.navStatus == Status.success
      }" />
    </n-message-provider>
  </n-dialog-provider>
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
