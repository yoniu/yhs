<template>
  <n-space vertical>
    <n-input
      type="textarea"
      placeholder="基本的 Textarea"
    />
  </n-space>
</template>
<script setup>
import { NSpace, NInput } from 'naive-ui'; // Naive UI的信息组件
const prop = defineProps(['currentUser', 'isLogin']); // 获取 Props
</script>
<style>
  
</style>