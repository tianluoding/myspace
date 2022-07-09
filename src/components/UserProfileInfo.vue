<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img class="img-fluid" src="https://picsum.photos/360/460?random=1" alt />
        </div>
        <div class="col-9">
          <div class="username">{{fullName}}</div>
          <div class="fans">粉丝: {{user.followerCount}}</div>
          <button v-if="!user.is_followed" @click="followHandler" type="button" class="btn btn-secondary btn-s">+关注</button>
          <button v-if="user.is_followed" @click="followHandler" type="button" class="btn btn-secondary btn-s">取消关注</button>
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
    let fullName = computed(()=>
        props.user.lastname + ' ' + props.user.firstname
    );

    const followHandler = () => {
        // props.user.is_followed = !props.user.is_followed;
        // props.user.followerCount += props.user.is_followed ? 1 : -1;
        context.emit("followHandler");
    };

    return {
        fullName,
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
</style>