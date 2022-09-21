<script lang="ts" setup>
  import { reactive } from 'vue'

  import { NForm, NSpace, NInput, NButton, useMessage } from 'naive-ui'

  import type { LoginForm } from '../config/interface'
  import { Status } from '../config/enum'

  import { useUserStore } from '../stores/user'

  const message = useMessage()
  const userStore = useUserStore()

  const loginForm = reactive<LoginForm>({
    username: '',
    password: '',
    buttonStatus: Status.success
  })

  const handleLogin = async () => {
    // if(userStore.loginStatus.status == Status.success) return useMessage().error('您已登陆！')
    if(loginForm.buttonStatus == Status.waiting) return message.error('登录中...')
    if(loginForm.username == '' || loginForm.password == '') return message.error('表单信息不能为空！')
    loginForm.buttonStatus = Status.waiting
    await userStore.Login(loginForm.username, loginForm.password)
    if(userStore.loginStatus.status == Status.success) {
      loginForm.buttonStatus = Status.success
      message.success('登陆成功！')
      return window.location.reload()
    } else {
      loginForm.buttonStatus = Status.success
      return message.error(userStore.loginStatus.message as string)
    }
  }
  
</script>

<template>
  <div class="login">
    <n-form :model="loginForm">
      <n-space vertical>
        <n-input
          v-model:value="loginForm.username"
          placeholder="账号"
          @keydown.enter.prevent
        />
        <n-input
          v-model:value="loginForm.password"
          type="password"
          placeholder="密码"
          @keydown.enter.prevent
        />
        <div style="display: flex; justify-content: flex-end">
          <n-button
            style="width: 100%"
            :disabled="loginForm.buttonStatus != Status.success"
            type="primary"
            @click="handleLogin()"
          >登陆</n-button>
        </div>
      </n-space>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
  .login {
    max-width: 150px;
    width: 100%;
  }
</style>