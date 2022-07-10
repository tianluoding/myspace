<template>
  <div class="card">
    <div class="card-body">
      <div v-for="post in posts.posts" :key="post.id">
        <div class="card single-post">
          <div class="card-body">
            {{post.content}}
            <button v-if="is_me"
              @click="delete_a_post(post.id)"
              type="button"
              class="btn btn-danger btn-sm"
            >删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "UserProfilePosts",
  props: {
    posts: {
      type: Object,
      required: true
    },
    user: {
        type: Object,
        required: true
    }
  },
  setup(props) {
    const store = useStore();
    const is_me = computed(() => props.user.id === store.state.user.id);
    const delete_a_post = postId => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "delete",
        headers: {
          Authorization: "Bearer " + store.state.user.access
        },
        data: {
          post_id: postId
        },
        success(resp) {
          console.log(resp);
          if (resp.result === "success") {
            props.posts.count--;
            props.posts.posts = props.posts.posts.filter(
              post => post.id !== postId
            );
          }
        }
      });
    };

    return {
      delete_a_post,
      is_me
    };
  }
};
</script>

<style scoped>
.single-post {
  margin-bottom: 1rem;
}

button {
  float: right;
}
</style>