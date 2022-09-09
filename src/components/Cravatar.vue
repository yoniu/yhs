<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cravatar',
  props: {
    alt: {
      type: String,
      required: false,
      default: '头像'
    },
    emailMd5: String,
    width: {
      type: String,
      required: false,
      default: '48'
    },
    height: {
      type: String,
      required: false,
      default: '48'
    }
  },
  computed: {
    cravatar() {
      return `//cravatar.cn/avatar/${this.emailMd5}?s=${this.width}&d=mm&r=g`;
    }
  }
})
</script>

<template>
  <img :src="cravatar" :width="width" :height="height" :alt="alt" />
</template>