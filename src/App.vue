<template>
  <n-message-provider>
    <login :currentUser="currentUser" :isLogin="isLogin" :sortList="sortList" />
    <n-space vertical id="main">
      <Write v-if="isLogin" :currentUser="currentUser" :isLogin="isLogin" />
      <List :currentUser="currentUser" :isLogin="isLogin" />
    </n-space>
  </n-message-provider>
</template>

<script setup>
import {
  GET_CURRENT_USER,
  GET_BLOG_SORT
} from './store/actionType'
import { ref, computed, watchEffect } from 'vue';
import Login from './components/Login.vue'
import List from './components/List.vue'
import Write from './components/Write.vue'
import { NMessageProvider, NSpace } from 'naive-ui'; // Naive UI的信息组件
import { useStore } from 'vuex';
const store = useStore();
store.dispatch(GET_CURRENT_USER); // VueX 获取当前用户
store.dispatch(GET_BLOG_SORT); // VueX 获取当前用户
const isLogin = ref(false); // 登陆状态
const currentUser = computed(() => store.state.currentUser); // 当前用户的计算属性
const sortList = computed(() => store.state.sort); // 分类列表的计算属性

watchEffect(() => {
  // 分类列表
  if(sortList.value) return
});
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
#main {
  width: 90%;
  min-width: 300px;
  max-width: 640px;
  margin: 0 auto;
}
</style>
