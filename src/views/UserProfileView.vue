<template>
  <Content>
    <div class="row">
      <div class="col-3 img-field">
        <UserProfileInfo :user="user" @followHandler="followHandler()"></UserProfileInfo>
        <UserProfileWrite v-if="is_me" @post_a_post="post_a_post"></UserProfileWrite>
      </div>
      <div class="col-9">
        <UserProfilePosts :posts="posts" :user="user"></UserProfilePosts>
      </div>
    </div>
  </Content>
</template>

<script>
import { reactive, ref } from "vue";
import Content from "../components/Content";
import UserProfileInfo from "../components/UserProfileInfo";
import UserProfilePosts from "../components/UserProfilePosts";
import UserProfileWrite from "../components/UserProfileWrite";
import { useRoute } from "vue-router";
import $ from "jquery";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "UserProfileView",
  components: {
    Content,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.userId);
    const user = reactive({});
    const posts = reactive({});

    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type: "get",
      data: {
        user_id: userId
      },
      headers: {
        Authorization: "Bearer " + store.state.user.access
      },
      success(resp) {
        console.log(resp);
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount = resp.followerCount;
        user.is_followed = resp.is_followed;
      }
    });

    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/post/",
      type: "get",
      data: {
        user_id: userId
      },
      headers: {
        Authorization: "Bearer " + store.state.user.access
      },
      success(resp) {
        posts.posts = resp;
      }
    });

    const post_a_post = content => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access
        },
        data: {
          content: content
        },
        success(resp) {
          if (resp.result === "success") {
            posts.count++;
            posts.posts.unshift({
              id: posts.count,
              userId: user.id,
              content: content
            });
          }
        }
      });
    };

    const followHandler = (target_id) => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.access
        },
        data: {
          target_id: target_id
        },
        success(resp) {
          if (resp.result === "success") {
            user.is_followed = !user.is_followed;
            user.followerCount += user.is_followed ? 1 : -1;
          }
        }
      });
    };

    const is_me = computed(() => userId === store.state.user.id);

    return {
      user,
      followHandler,
      posts,
      post_a_post,
      is_me
    };
  }
};
</script>

<style scoped>
.img-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>