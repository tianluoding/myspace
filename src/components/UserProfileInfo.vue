<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3 img-field">
          <img class="img-fluid" :src="user.photo" alt />
        </div>
        <div class="col-9">
          <div class="username">{{user.username}}</div>
          <div class="fans">粉丝: {{user.followerCount}}</div>
          <button v-if="!user.is_followed" @click="followHandler(user.id)" type="button" class="btn btn-secondary btn-s">+关注</button>
          <button v-if="user.is_followed" @click="followHandler(user.id)" type="button" class="btn btn-secondary btn-s">取消关注</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
export default {
  name: "UserProfileInfo",
  props: {
    user: {
        type: Object,
        required: true
    }
  },
  setup(props, context) {
    

    const followHandler = (target_id) => {
        // props.user.is_followed = !props.user.is_followed;
        // props.user.followerCount += props.user.is_followed ? 1 : -1;
        console.log(target_id);
        context.emit("followHandler", target_id);
    };

    return {
        followHandler
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
}

.fans {
  font-size: 12px;
  color: grey;
}

button {
  padding: 2px 4px;
  font-size: 12px;
}

.img-field{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>