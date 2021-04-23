<template>
  <div class="edit">
    <myheader title="编辑个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </myheader>
    <div class="imgarea">
      <img :src="userinfos.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell
      title="昵称"
      :desc="userinfos.nickname"
      @click.native="showNicknameDialog"
    ></mycell>
    <van-dialog
      v-model="nickshow"
      title="编辑昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field
        v-model="nickname"
        required
        label="昵称"
        placeholder="请输入昵称"
    /></van-dialog>
    <mycell
      title="密码"
      desc="***********"
      @click.native="
        passshow = !passshow;
        oldpassword = newpassword = '';
      "
    ></mycell>
    <van-dialog
      v-model="passshow"
      title="编辑密码"
      show-cancel-button
      @confirm="editPassword"
      :beforeClose="beforeClose"
    >
      <van-field
        v-model="oldpassword"
        required
        label="原密码"
        placeholder="请输入原密码"
      />
      <van-field
        v-model="newpassword"
        required
        label="新密码"
        placeholder="请输入新密码"
      />
    </van-dialog>
    <mycell
      title="性别"
      :desc="userinfos.gender === 1 ? '男' : '女'"
      @click.native="gendershow = !gendershow"
    ></mycell>
    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "@/utils/request";
import { getUserInfo, updateUserInfo } from "@/apis/user";
import { userFile } from "@/apis/fileupload";
import myheader from "@/components/hm_header";
import mycell from "@/components/hm_cell";
export default {
  components: {
    myheader,
    mycell,
  },
  data() {
    return {
      userinfos: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      // 昵称所 对应的变量,不能与userinfos里的昵称名一样，否则会跟随变化，点击取消也会被修改
      nickname: "",
      oldpassword: "",
      newpassword: "",
      actions: [{ name: "男" }, { name: "女" }],
    };
  },
  mounted() {
    // 用户信息的动态渲染
    getUserInfo(this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.userinfos = res.data.data;
        this.userinfos.head_img =
          axios.defaults.baseURL + this.userinfos.head_img;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // 当用户选择好文件之后，就会立刻触发这个方法，在这个方法中可以实现文件的上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // file.file就是用户所选择的文件对象
      console.log(file);
      console.log(file.file);
      let fd = new FormData();
      // 使用fd收集图片资源
      fd.append("file", file.file);
      //   上传文件
      userFile(fd)
        .then((res) => {
          console.log(res);
          if (res.data.message === "文件上传成功") {
            // console.log(res.data.data.url);
            // 所谓页面的刷新，就是将img的src属性的值动态的修改
            this.userinfos.head_img =
              axios.defaults.baseURL + res.data.data.url;
            // 编辑用户头像信息
            // 存储在数据表中的头像信息，只有目录+文件名称，并没有基准路径
            // 实现用户头像的编辑
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                console.log(res);
                if (res.data.message === "修改成功") {
                  this.$toast.success(res.data.message);
                  // console.log(res.data.data.head_img);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //编辑昵称弹窗
    showNicknameDialog() {
      this.nickshow = !this.nickshow;
      this.nickname = this.userinfos.nickname;
    },
    //点击确定按钮,修改昵称
    editNickname() {
      updateUserInfo(this.$route.params.id, {
        nickname: this.nickname,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message === "修改成功") {
            this.$toast.success(res.data.message);
            // console.log(res.data.data.head_img);
            //在vue中，单文件开发为响应式开发，数据变化，视图也会发生变化
            this.userinfos.nickname = this.nickname;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击确定按钮,修改密码
    async editPassword() {
      //判断原密码是否输入正确
      if (this.oldpassword === this.userinfos.password) {
        //验证新密码是否符合校验规则
        if (/^.{3,16}$/.test(this.newpassword)) {
          //编辑密码
          let res = await updateUserInfo(this.$route.params.id, {
            password: this.newpassword,
          });
          console.log(res);
          if (this.oldpassword === this.newpassword) {
            this.$toast.success("新密码不能与原密码相同");
          } else {
            this.userinfos.password = this.newpassword;
            this.$toast.success(res.data.message);
          }
        } else {
          this.$toast.fail("请输入3到16位密码");
        }
      } else {
        this.$toast.fail("原密码错误");
      }
    },
    //如果错误，阻止拟态框的关闭
    beforeClose(action, done) {
      //只给确定按钮添加阻止方法x
      // console.log(action);
      if (action === "confirm") {
        //如果原密码错误或者新密码格式错误，阻止弹出框的关闭
        if (
          this.oldpassword !== this.userinfos.password ||
          !/^.{3,16}$/.test(this.newpassword) ||
          this.oldpassword === this.newpassword
        ) {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    //编辑性别
    async onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false;
      // Toast(item.name);
      let gender = item.name === "男" ? 1 : 0;
      let res = await updateUserInfo(this.$route.params.id, {
        gender,
      });
      console.log(res);
      this.$toast.success(res.data.message);
      this.userinfos.gender = gender;
    },
  },
};
</script>

<style lang="less" scoped>
.edit {
  padding: 0 10px;
  .imgarea {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;
    img {
      width: 120 * 100vw/360;
      height: 120 * 100vw/360;
      display: block;
    }
    /deep/ .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    /deep/ .van-uploader__upload {
      width: 120px;
      height: 120px;
      opacity: 0;
    }
  }
}
</style>