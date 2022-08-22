<template>
  <n-message-provider>
    <login :currentUser="currentUser" :isLogin="isLogin" />
  </n-message-provider>
</template>

<script setup>
import {
  GET_CURRENT_USER
} from './store/actionType'
import { ref, computed, watchEffect } from 'vue';
import Login from './components/Login.vue'
import { NMessageProvider } from 'naive-ui'; // Naive UI的信息组件
import { useStore } from 'vuex';
const store = useStore();
store.dispatch(GET_CURRENT_USER); // VueX 获取当前用户
const isLogin = ref(false); // 登陆状态
const currentUser = computed(() => store.state.currentUser); // 当前用户的计算属性

watchEffect(() => {
  // 监听当前登陆用户。
  if(currentUser.value && !('err' in currentUser.value)){
    isLogin.value = true;
  }else{
    isLogin.value = false;
  }
});

</script>

<style scoped>

</style>
