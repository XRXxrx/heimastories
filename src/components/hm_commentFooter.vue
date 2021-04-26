<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus = !isFocus" />
      <span class="comment">
        <i
          class="iconfont iconpinglun-"
          @click="$router.push({ path: `/comment/${post.id}` })"
        ></i>
        <em>{{ post.comment_length }}</em>
      </span>
      <i
        class="iconfont iconshoucang"
        :class="{ shoucang: post.has_star }"
        @click="changeshoucang"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea
        ref="commtext"
        rows="5"
        @blur="isFocus = false"
        v-model.trim="content"
      ></textarea>
      <div>
        <span @click="sendComment">发 送</span>
        <span @click="isFocus = !isFocus">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { publishComment } from "@/apis/post";
import { shouCang } from "@/apis/post";
export default {
  props: {
    post: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {
      isFocus: false,
      content: "",
    };
  },
  methods: {
    // 收藏文章
    async changeshoucang() {
      let res = await shouCang(this.post.id);
      console.log(res);
      this.post.has_star = !this.post.has_star;
      this.$toast.success(res.data.message);
    },
    // 发表评论
    async sendComment() {
      if (this.content.length === 0) {
        this.$toast.fail("请输入评论内容");
        return;
      }
      //  准备参数
      let data = {
        content: this.content,
      };
      // 发起评论请求
      let res = await publishComment(this.post.id, data);
      console.log(res);
      // 给提示
      this.$toast.fail(res.data.message);
      // 隐藏输入框
      this.isFocus = false;
      // 清空之前输入的内容
      this.content = "";
      // 页面内容的刷新-子组件要告诉父组件进行列表数据的刷新
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .inputcomment {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea {
      flex: 3;
      background-color: #eee;
      border: none;
      border-radius: 10px;
      padding: 10px;
    }
    div {
      padding: 20px;
    }
    span {
      display: block;
      flex: 1;
      height: 24px;
      line-height: 24px;
      padding: 0 10px;
      background-color: #f00;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      font-size: 13px;
    }
  }
  .addcomment {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 20px;
    display: flex;
    text-align: center;
    position: absolute;
    background-color: #fff;
    bottom: 0;
    left: 0;
    > input {
      flex: 4;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      border: none;
      background-color: #eee;
      padding-left: 20px;
      font-size: 14px;
    }
    i {
      font-size: 20px;
    }
    > span {
      flex: 1;
      position: relative;
      > em {
        position: absolute;
        right: 0;
        top: -5px;
        font-size: 10px;
        background-color: #f00;
        color: #fff;
        border-radius: 5px;
        padding: 3px 5px;
      }
    }
    > i {
      flex: 1;
    }
  }
  .shoucang {
    color: red;
  }
}
</style>