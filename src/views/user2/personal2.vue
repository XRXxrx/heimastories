<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender === 1,
                iconxingbienv: userinfo.gender === 0,
              }"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell2 title="我的关注" desc="关注的用户"></mycell2>
    <mycell2 title="我的跟帖" desc="跟帖/回复"></mycell2>
    <mycell2 title="我的收藏" desc="文章/视频"></mycell2>
    <mycell2 title="设置"></mycell2>
    <mybutton type="danger" style="margin-top: 20px">退出</mybutton>
  </div>
</template>

<script>
import axios from "../../utils/request2";
import { getUserInfo } from "@/apis/user2";
import mycell2 from "@/components/hm_cell2";
import mybutton from "@/components/hm_button";
export default {
  components: {
    mycell2,
    mybutton,
  },
  data() {
    return {
      userinfo: {},
    };
  },
  mounted() {
    let id = this.$route.params.id;
    getUserInfo(id)
      .then((res) => {
        console.log(res);
        this.userinfo = res.data.data;
        this.userinfo.head_img =
          axios.defaults.baseURL + this.userinfo.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>