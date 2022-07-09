<template>
  <Content>
    <div class="card" v-for="user in users" :key="user.id" @click="openUserProfile(user.id)">
      <div class="card-body">
        <div class="row">
          <div class="col-1">
            <img class="img-fluid" :src="user.photo" alt />
          </div>
          <div class="col-11">
            <div class="username">{{user.username}}</div>
            <div class="follower-count">{{user.followerCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
import Content from '../components/Content'
import $ from 'jquery'
import { ref } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';

export default {
  name: "UserListView",
  components: {
    Content
  },
  setup() {
    const store = useStore();
    let users = ref([]);

    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
      type: "get",
      success(resp) {
        users.value = resp;
      }
    });

    const openUserProfile = (userId)=>{
      if(store.state.user.is_login){
        router.push({
          name: "userprofile", 
          params:{
          userId: userId
          }
        });
      }else{
        router.push({
          name: "login"
        });
      }
    }
    return{
      users,
      openUserProfile
    }
  }
};
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
  height: 50%;
}

.follower-count {
  font-size: 12px;
  color: gray;
  height: 50%;
}

.card {
  margin-bottom: 20px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 10px lightgrey;
  transform: 500ms;
}
</style>