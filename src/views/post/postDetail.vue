<template>
  <div class="detail">
    <div class="articaldetail">
      <div class="header">
        <div class="left">
          <van-icon name="arrow-left back" @click="$router.back()" />
          <span class="iconfont iconnew new"></span>
        </div>
        <span @click="followUserById" :class="{ active: post.has_follow }">{{
          post.has_follow ? "已关注" : "关注"
        }}</span>
      </div>
      <div class="detail">
        <div class="title">{{ post.title }}</div>
        <div class="desc">
          <span>{{ post.user.nickname }}</span> &nbsp;&nbsp;
          <span>2019-9-9</span>
        </div>
        <!-- 细节：内容是网页结构，所以需要进行解析，所以使用v-html -->
        <div class="content" v-html="post.content" v-if="post.type == 1"></div>
        <!-- 
        1.controls:是否显示播放控制面板，如果没有这个面板，那么播放器不可见
        2.src:播放的视频的路径
        3.autoplay:自动播放
        4.loop:循环播放
        5.poster:封面，视频的第一帧画面 -->
        <video :src="post.content" v-else controls></video>
        <div class="opt">
          <span
            class="like"
            :class="{ likeactive: post.has_like }"
            @click="likeCateById"
          >
            <van-icon name="good-job-o" />{{
              post.like_length ? post.like_length : "点赞"
            }}
          </span>
          <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
        </div>
      </div>
      <!-- 精彩跟帖 -->
      <div class="keeps">
        <h2>精彩跟帖</h2>
        <div class="item">
          <div class="head">
            <img src="@/assets/logo.png" alt />
            <div>
              <p>火星网友</p>
              <span>2小时前</span>
            </div>
            <span>回复</span>
          </div>
          <div class="text">文章说得很有道理</div>
        </div>
        <div class="more">更多跟帖</div>
      </div>
    </div>
    <myfooter :post="post"></myfooter>
  </div>
</template>

<script>
import myfooter from "@/components/hm_commentFooter";
import { followUser, unFollowUser } from "@/apis/user";
import { postDetail, likeCate } from "@/apis/post";
export default {
  components: {
    myfooter,
  },
  data() {
    return {
      post: {},
    };
  },
  async mounted() {
    // console.log(this.$route);
    let res = await postDetail(this.$route.params.id);
    console.log(res);
    this.post = res.data.data;
  },
  methods: {
    // 关注用户和取消关注用户
    async followUserById() {
      let res;
      // 根据当前用户的关注状态，决定是关注用户还是取消关注用户
      // true:已关注了，这次单击就是取消关注
      if (this.post.has_follow) {
        res = await unFollowUser(this.post.user.id);
      } else {
        res = await followUser(this.post.user.id);
      }
      this.post.has_follow = !this.post.has_follow;
      this.$toast.success(res.data.message);
    },
    //点赞和取消点赞文章
    async likeCateById() {
      let res = await likeCate(this.post.id);
      console.log(res);
      if (res.data.message === "点赞成功") {
        ++this.post.like_length;
      } else {
        --this.post.like_length;
      }
      this.post.has_like = !this.post.has_like;
      this.$toast.success(res.data.message);
    },
  },
};
</script>

<style lang="less" scoped>
.articaldetail {
  padding-bottom: 60px;
  .header {
    padding: 0px 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > .left {
      height: 100%;
      vertical-align: middle;
      position: relative;
      .van-icon {
        position: absolute;
        top: 15px;
        left: 0;
      }
      > span {
        margin-left: 22px;
        font-size: 50px;
      }
    }
    > span {
      padding: 5px 15px;
      background-color: #f00;
      color: #fff;
      text-align: center;
      border-radius: 15px;
      font-size: 13px;
      &.active {
        background-color: transparent;
        border: 1px solid #aaa;
        color: #000;
      }
    }
  }
  .detail {
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
    }
    .desc {
      line-height: 30px;
      color: #999;
      font-size: 13px;
    }
    .content {
      // text-indent: 2em;
      line-height: 24px;
      font-size: 15px;
      padding-bottom: 30px;
      width: 100%;
      /deep/ img {
        width: 100%;
      }
      /deep/ p {
        text-indent: 2em;
      }
    }
    video {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .opt {
    display: flex;
    justify-content: space-around;
    .like,
    .chat {
      height: 25px;
      padding: 0 15px;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
    .likeactive {
      border-color: green;
      color: green;
    }
    .w {
      color: rgb(84, 163, 5);
    }
  }
  .keeps {
    border-top: 5px solid #ddd;
    padding: 0 15px;
    > h2 {
      line-height: 50px;
      text-align: center;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
  }
}
</style>