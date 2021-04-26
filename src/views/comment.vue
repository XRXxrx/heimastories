<template>
  <div class="comment">
    <myheader title="精彩评论页">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </myheader>
    <div class="item" v-for="value in commentInfo" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span>回复</span>
      </div>
      <div class="text">{{ value.content }}</div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/request";
import { commentList } from "@/apis/post";
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
  },
  data() {
    return {
      commentInfo: [],
      axios,
    };
  },
  async mounted() {
    let res = await commentList(this.$route.params.id);
    console.log(res);
    this.commentInfo = res.data.data;
  },
};
</script>

<style lang="less" scoped>
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