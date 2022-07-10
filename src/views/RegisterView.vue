<template>
  <Content>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" />
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm" />
          </div>
          <div class="error-message">{{error_message}}</div>
          <button type="submit" class="btn btn-primary btn-sm">注册</button>
        </form>
      </div>
    </div>
  </Content>
</template>

<script>
import { ref } from 'vue';
import Content from '../components/Content';
import $ from 'jquery';

export default {
  name: "RegisterView",
  components: {
    Content
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const password_confirm = ref("");
    const error_message = ref("");

    const register = ()=>{
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: "post",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value
        },
        success(resp){
          if(resp.result === 'success'){
            router.push({name: "login"});
          }else{
            error_message.value = resp.result;
          }
        }
      })
    }

    return {
      username,
      password,
      password_confirm,
      error_message,
      register
    }
  }
  
};
</script>

<style scoped>
button{
  width: 100%;
}
.error-message{
  color: red;
  font-size: 12px;
}
</style>