<template>
  <n-space vertical>
    <Write v-if="prop.isLogin" :currentUser="prop.currentUser" :isLogin="prop.isLogin" />
    <List :currentUser="prop.currentUser" :isLogin="prop.isLogin" />
  </n-space>
</template>
<script setup>
import List from './List.vue'
import Write from './Write.vue'
import { NSpace } from 'naive-ui'
const prop = defineProps(['currentUser', 'isLogin']); // 获取 Props
</script>