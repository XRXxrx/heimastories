<template>
  <div class="comment">
    <myheader title="精彩评论页">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </myheader>
    <div class="list">
      <div class="item" v-for="value in commentInfo" :key="value.id">
        <div class="head">
          <img :src="axios.defaults.baseURL + value.user.head_img" alt />
          <div>
            <p>{{ value.user.nickname }}</p>
            <span>时间</span>
          </div>
          <span @click="replayComment(value)">回复</span>
        </div>
        <mycommentItem
          v-if="value.parent"
          :parent="value.parent"
        ></mycommentItem>
        <div class="text">{{ value.content }}</div>
      </div>
    </div>
    <!-- 底部评论块 -->
    <myfooter
      :post="article"
      @refresh="refresh"
      :commentObj="temp"
      @cancel="temp = null"
    ></myfooter>
  </div>
</template>

<script>
import myfooter from "@/components/hm_commentFooter";
import mycommentItem from "@/components/hm_commentItem";
import axios from "@/utils/request";
import { commentList, postDetail } from "@/apis/post";
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
    mycommentItem,
    myfooter,
  },
  data() {
    return {
      commentInfo: [],
      axios,
      article: {},
      temp: {},
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    //封装获取数据
    async init() {
      // 获取文章的评论数据
      let res = await commentList(this.$route.params.id);
      console.log(res);
      this.commentInfo = res.data.data;
      // 获取文章详情数据
      this.article = (await postDetail(this.$route.params.id)).data.data;
      console.log(this.article);
    },
    refresh() {
      //重新获取数据
      this.init();
      // 让列表自动的滚动到顶部
      window.scrollTo(0, 0);
    },
    //回复传值，用于获取回复id
    replayComment(v) {
      this.temp = v;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 60px;
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
</style>