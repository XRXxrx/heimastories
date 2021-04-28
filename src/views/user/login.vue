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
          v-model.trim="user.username"
          placeholder="请输入手机号码"
          :rules="/^1[35789]\d{9}$|^[A-Za-z]{3,20}$/"
          message="请输入11位手机号"
        ></hminput>
        <hminput
          type="password "
          v-model.trim="user.password"
          placeholder="请输入手机密码"
          :rules="/^.{3,16}$/"
          message="请输入合法3到16位密码"
        ></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <!-- <div class="button">登录按钮</div> -->
      <hmbutton @click="getlogin" type="success">
        <span>登录</span>
      </hmbutton>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/apis/user";
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
            // console.log(res.data.message === "登录成功");
            if (res.data.message === "登录成功") {
              this.$toast.success({
                message: res.data.message,
                position: "bottom",
              });
              localStorage.setItem("heima_token", res.data.data.token);
              localStorage.setItem("userid", res.data.data.user.id);
              //获取跳转对象中传递过来的路由
              let url = this.$route.params.url;
              // console.log(url);
              // 如果之前传递的回跳的路径，那么进行回跳
              if (location.href.split("=")[1]) {
                location.href = decodeURIComponent(location.href.split("=")[1]);
              } else if (url) {
                //如果有传递过来的路由，就跳转到当前路由
                this.$router.push({ path: url });
              } else {
                // 否则跳转到个人中心页// 跳转到个人中心页
                this.$router.push({
                  path: `/personal/${res.data.data.user.id}`,
                });
              }
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