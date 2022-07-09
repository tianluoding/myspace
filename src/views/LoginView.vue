<template>
  <Content>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" />
          </div>
          <div class="error-message">{{error_message}}</div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </Content>
</template>

<script>
import { ref } from "vue";
import Content from "../components/Content";
import { useStore } from "vuex";
import router from "@/router";

export default {
  name: "LoginView",
  components: {
    Content
  },
  setup() {
    const store = useStore();
    let username = ref("");
    let password = ref("");
    let error_message = ref("");

    const login = () => {
      error_message.value = "";
      store.dispatch(
        "login", {
          username: username.value,
          password: password.value,
          success() {
            // console.log("login success");
            router.push({name: "userlist"});
          },
          error() {
            // console.log("error");
            error_message.value = "用户名或密码错误";
          }
        }
      )
    }

    return {
      username,
      password,
      error_message,
      login
    };
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