<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <hminput
          placeholder="请输入手机号"
          v-model="user.username"
          :rules="/^1[35789]\d{9}$/"
          message="请输入11位手机号"
        ></hminput>
        <hminput
          placeholder="请输入昵称"
          v-model="user.nickname"
          :rules="/^[A-Za-z]{3,20}$/"
          message="请输入3到20位英文字母昵称"
        ></hminput>
        <hminput
          placeholder="请输入密码"
          v-model="user.password"
          :rules="/^.{3,16}$/"
          message="请输入合法3到16位密码"
        ></hminput>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class="">去登录</a>
      </p>
      <hmbutton type="primary" @click="getregister">
        <span>注册</span>
      </hmbutton>
    </div>
  </div>
</template>

<script>
import { userRegister } from "@/apis/user";
import hmbutton from "@/components/hm_button";
import hminput from "@/components/hm_input";
export default {
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        password: "",
      },
    };
  },
  components: {
    hmbutton,
    hminput,
  },
  methods: {
    getregister(e) {
      if (
        /^1[35789]\d{9}$/.test(this.user.username) &&
        /^[A-Za-z]{3,20}$/.test(this.user.nickname) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userRegister(this.user)
          .then((res) => {
            console.log(res);
            if (res.data.message === "注册成功") {
              this.$toast.success({
                message: res.data.message,
                position: "bottom",
              });
              this.$router.push({ name: "login" });
            } else {
              this.$toast.success({
                message: res.data.message,
                position: "bottom",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$toast.success({
              message: "请输入正确的格式",
              position: "bottom",
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>