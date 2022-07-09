<template>
  <Content>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo :user="user" @followHandler="followHandler"></UserProfileInfo>
        <UserProfileWrite @post_a_post="post_a_post"></UserProfileWrite>
      </div>
      <div class="col-9">
        <UserProfilePosts :posts="posts"></UserProfilePosts>
      </div>
    </div>
  </Content>
</template>

<script>
import { reactive, ref } from 'vue';
import Content from '../components/Content'
import UserProfileInfo from '../components/UserProfileInfo'
import UserProfilePosts from '../components/UserProfilePosts'
import UserProfileWrite from '../components/UserProfileWrite'


export default {
  name: "UserProfileView",
  components: {
    Content,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileWrite
},
  setup(){
    const user = reactive({
      id: 1,
      username: "tianluoding",
      lastname: "Tian",
      firstname: "Luoding",
      followerCount: 0,
      is_followed: false,
    });

    const posts = reactive({
      count: 3,
      posts: [
        {
          id: 1,
          userId:1,
          content: "哈哈哈",
        },
        {
          id: 2,
          userId:1,
          content: "哈哈哈11",
        },
        {
          id: 3,
          userId:1,
          content: "哈哈哈222",
        }
      ]
    })

    const post_a_post = (content) => {
      posts.count++;
      posts.posts.unshift({
        id: posts.count,
        userId: user.id,
        content: content,
      });
    }

    const followHandler = () => {
      user.is_followed = !user.is_followed;
      user.followerCount += user.is_followed ? 1 : -1;
    };

    return{
      user,
      followHandler,
      posts,
      post_a_post
    }
  }
};
</script>

<style scoped>
</style>