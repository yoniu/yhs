<template lang="">
  <T :currentUser="prop.currentUser" :isLogin="prop.isLogin" />
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import T from './T.vue'
import { NSpace, NSkeleton, NCard, NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NLayoutSider } from 'naive-ui'; // Naive UI的信息组件
const prop = defineProps(['currentUser', 'isLogin']); // 获取 Props
const store = useStore();
const postList = computed(() => store.state.list); // 当前用户的计算属性
</script>
<style lang="">
  
</style>