<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <myipt
          placeholder="请输入手机号"
          v-model.trim="user.username"
          :rules="/^1[35789]\d{9}$/"
          message="请输入11位手机号"
        ></myipt>
        <myipt
          type="password"
          placeholder="密码"
          v-model.trim="user.password"
          :rules="/^.{3,16}$/"
          message="请输入3到16位密码"
        ></myipt>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register2" class="">去注册</a>
      </p>
      <mybtn type="success" @click="getbtn">
        <span>登录</span>
      </mybtn>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/apis/user";
import myipt from "@/components/hm_ipt";
import mybtn from "@/components/hm_btn";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    mybtn,
    myipt,
  },
  methods: {
    getbtn(e) {
      // console.log(this.user);
      if (
        /^1[35789]\d{9}$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.passord)
      ) {
        userLogin(this.user)
          .then((res) => {
            console.log(res);
            if (res.data.message === "登录成功") {
              this.$toast.fail({
                message: res.data.message,
                position: "bottom",
              });
            } else {
              this.$toast.fail({
                message: res.data.message,
                position: "bottom",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail({
          message: "请输入合法格式",
          position: "bottom",
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