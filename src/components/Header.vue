<script setup lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import HelloWorld from './HelloWorld.vue'
import Cravatar from './Cravatar.vue'

const props = defineProps<{
  options: any
}>()

</script>


<template>
  <header>
    <!--img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" -->
    <Cravatar class="logo" :email-md5="options.siteEmailMd5" width="125" height="125" alt="油油" />

    <div class="wrapper">
      <hello-world msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  & > * {
    position: relative;
    z-index: 1;
  }
  .logo {
    border-radius: 10px;
    border: 5px solid #eee;
    line-height: 1;
    margin-bottom: 1rem;
  }
}
</style>