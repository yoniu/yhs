<template>
  <n-tooltip placement="top" trigger="hover">
    <template #trigger>
      <n-tag closable @close="handleClose">
        {{prop.name}}
      </n-tag>
    </template>
    {{prop.description}}
  </n-tooltip>
</template>
<script setup>
  import { NTag, NTooltip } from 'naive-ui';
  const prop = defineProps(['id', 'name', 'description']); // 获取 Props
  function handleClose () {
    alert(prop.id);
  }
</script>