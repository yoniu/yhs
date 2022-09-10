<script setup lang="ts">
  import Cravatar from './Cravatar.vue'
  const props = defineProps<{
    siteMail: string,
  }>()
</script>

<template>
  <div id="loading">
    <Cravatar class="logo" :email-md5="props.siteMail" width="100" height="100" />
  </div>
</template>

<style lang="less">
#loading {
  position: fixed;
  top: 0; left: 0;
  right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(-45deg, #FA897B, #FFDD94);
  transition: all 1s ease-in-out;
  z-index: 3;

  img {
    border-radius: 25px;
    animation: 3s loaderImage infinite linear;
  }
  &.hide {
    transform: scale(3);
    opacity: 0;
    pointer-events: none;
  }
}
@keyframes loaderImage{
  0%{
    opacity: .8;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: .8;
  }
}
</style>