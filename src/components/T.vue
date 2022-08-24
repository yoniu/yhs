<template lang="">
  <n-card>
    <n-layout has-sider>
      <n-layout-sider width="58px">
        <n-skeleton height="38px" circle />
      </n-layout-sider>
      <n-layout>
        <n-layout-content>
          <n-skeleton text :repeat="2" />
          <n-skeleton text style="width: 60%" />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-card>
</template>
<script setup>
  import { NSpace, NSkeleton, NCard, NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NLayoutSider } from 'naive-ui'; // Naive UI的信息组件
  const prop = defineProps(['currentUser', 'isLogin']); // 获取 Props
</script>
<style>
  
</style>