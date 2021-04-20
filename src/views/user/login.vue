<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- :value='user.username'：父传子：数据影响元素 -->
        <!-- @getvalue='getvalue'：子传父：元素影响数据 -->
        <!-- <hminput :value="user.username" @getvalue="getvalue"></hminput> -->
        <!-- <hminput @getvalue="getvalue"></hminput>
        <hminput @getvalue="getpwd"></hminput> -->
        <!-- v-model:双向数据绑定：数据影响元素 + 元素影响数据
        1.为子组件的value属性赋值
        2.监听子组件所发出的input事件 -->
        <!-- 为子组件赋值优先赋值给子组件的props属性，如果没有props属性，那么就会添加到组件的根元素 -->
        <hminput
          v-model="user.username"
          placeholder="请输入用户名/手机号码"
          :rules="/^1[35789]\d{9}$|^[A-Za-z]{3,20}$/"
        ></hminput>
        <hminput
          type="password "
          v-model="user.password"
          placeholder="请输入手机密码"
          :rules="/^.{3,16}$/"
        ></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- <div class="button">登录按钮</div> -->
    </div>
    <hmbutton @getlogin="getlogin" type="success">
      <span>登录</span>
    </hmbutton>
  </div>
</template>

<script>
import { userLogin } from "@/apis/login";
import hmbutton from "@/components/hm_button";
import hminput from "@/components/hm_input";
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
    hmbutton,
    hminput,
  },
  methods: {
    getlogin(e) {
      //   console.log("324");
      //   console.log(this.user);
      if (
        /^1[35789]\d{9}$|^[A-Za-z]{3,20}$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
      }
    },
    // getvalue(data) {
    //   console.log(data);
    //   this.user.username = data;
    // },
    // getpwd(data) {
    //   this.user.password = data;
    // },
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