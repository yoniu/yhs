<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import HelloWorld from './HelloWorld.vue'
  import Cravatar from './Cravatar.vue'
  import Navigation from './Navigation.vue'

  const props = defineProps<{
    options: any
  }>()

</script>

<template>
  <header>
    <Navigation />
    <div class="header-image" :style="`--background: url(${options.siteOptions.get('site_header_image')})`"></div>
    <div class="header-bloger">
      <span class="header-title">{{ options.siteOptions.get('site_name') }}</span>
      <Cravatar class="header-avatar" :email-md5="options.siteEmailMd5" width="64" height="64" alt="油油" />
    </div>
    <div class="header-description" v-if="options.siteOptions.get('site_description') != undefined">{{ options.siteOptions.get('site_description') }}</div>
  </header>
</template>

<style lang="less" scoped>
header {
  position: relative;
  display: flex;
  flex-direction: column;
  --header-image-width: 64px;
  
  .header-image {
    background-image: var(--background);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    overflow: hidden;
    
    &::after {
      content: '';
      float: left;
      padding-top: calc((3 / 4) * 100%);
    }
  }
  .header-bloger {
    display: flex;
    justify-content: end;
    align-items: flex-end;
    margin-top: calc(var(--header-image-width) * (3 / 4) * -1);
    padding: 0 var(--content-padding);

    .header-title {
      margin-bottom: calc(var(--header-image-width) * (1 / 4));
      padding: 0 1rem .5rem 0;
      font-size: 1.1rem;
      color: #fff;
    }
    img {
      width: var(--header-image-width);
      height: var(--header-image-width);
      border-radius: 10px;
    }
  }
  .header-description {
    max-width: 60%;
    align-self: flex-end;
    padding: 1rem var(--content-padding);
    font-size: .9rem;
    color: #666;
  }
}
</style>