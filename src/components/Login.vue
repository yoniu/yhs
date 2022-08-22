<template>
  <div class="login-box">
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <img class="login-avatar" :src="gravatar" @click="loginAction()" />
      </template>
      {{mMessage}}
      <n-button quaternary type="primary" size="small" secondary strong v-if="prop.isLogin" @click="logOut">注销</n-button>
    </n-tooltip>
  </div>
  <n-modal v-model:show="loginBoxShow" v-if="!prop.isLogin">
    <n-card
      style="width: 300px"
      :mask-closable="false"
      :bordered="false"
      role="dialog"
      aria-modal="true"
      title="登陆"
    >
      <n-space vertical>
        <n-input v-model:value="username" type="text" placeholder="账号" />
        <n-input v-model:value="password" show-password-on="mousedown" type="password" placeholder="密码" @keyup.enter="login" />
        <n-space justify="end">
          <n-button @click="loginBoxShow = false">关闭</n-button>
          <n-button type="primary" @click="login" :loading="pressLoginButton">确认</n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { LOGIN, LOGOUT } from '../store/actionType'; // VueX 登陆事件
  import md5 from 'md5-js'; // md5JS插件
  import { NTooltip, NModal, NCard, NInput, NSpace, NButton, useMessage } from 'naive-ui'; // Naive UI的信息组件
  
  const prop = defineProps(['currentUser', 'isLogin']); // 获取 Props
  const store = useStore(); // 使用 VueX

  const loginBoxShow = ref(false); // 登陆窗口显示
  const pressLoginButton = ref(false); // 登陆按钮显示 loading
  const username = ref(''); // 登陆账号
  const password = ref(''); // 登陆密码

  const gravatar = computed(() => {
    // 头像链接
    if (prop.isLogin) {
      return `https://cdn.helingqi.com/wavatar/${md5(prop.currentUser.getEmail())}?s=&d=mm&r=g`;
    } else {
      return 'https://cdn.helingqi.com/wavatar/';
    }
  });
  const mMessage = computed(() => {
    // 头像 hover 信息
    if (prop.isLogin) {
      return `你好，${prop.currentUser.get('username')}！`;
    } else {
      return '点击登陆';
    }
  });

  function loginAction () {
    // 头像点击事件
    if (prop.isLogin) {
      showMessage('已登陆！');
      loginBoxShow.value = false;
    } else {
      loginBoxShow.value = true;
    }
  }
  async function login(){
    // 登陆事件
    if(pressLoginButton.value) return; // 如果在提交中
    pressLoginButton.value = !pressLoginButton.value; // 设置按钮状态
    if(username.value == '' || password.value == ''){ // 判断账号
      pressLoginButton.value = !pressLoginButton.value;
      return showMessage('账号密码不能为空');
    }
    await store.dispatch(LOGIN, {username: username.value, password: password.value}); // 执行 VueX
    if('err' in prop.currentUser){ // 如果登陆失败
      showMessage(prop.currentUser.err);
      pressLoginButton.value = !pressLoginButton.value;
      username.value = '';
      password.value = '';
    }else{ // 登陆成功
      showMessage('登陆成功');
      pressLoginButton.value = !pressLoginButton.value;
      loginBoxShow.value = !loginBoxShow.value;
    }
  }
  async function logOut () {
    // 退出登陆
    if (prop.isLogin) {
      await store.dispatch(LOGOUT); // 执行 VueX
      showMessage('注销成功！');
    } else {
      showMessage('未登陆！');
    }
  }

  // 信息提示
  const message = useMessage();
  function showMessage(text) {
    // 信息显示
    message.info(
      text,
      { closable: true, duration: 5000 }
    );
  }
</script>

<style scope>
.login-box {
  position: fixed;
  top: 10vh;
  right: 10vw;
  z-index: 100;
}
.login-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 5px 10px rgba(0 0 0 / 20%);
  cursor: pointer;
}
.login-button-list {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>