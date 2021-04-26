<template>
  <div class="myfollow">
    <myheader title="我的关注">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </myheader>
    <div class="list">
      <div class="box" v-for="(value, index) in userfollow" :key="value.id">
        <img :src="value.head_img" alt="" />
        <div class="center">
          <p>{{ value.nickname }}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancelFollow(value.id, index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import { myfollow, unFollowUser } from "@/apis/user";
import axios from "@/utils/request";
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
  },
  data() {
    return {
      userfollow: [],
    };
  },
  async mounted() {
    let res = await myfollow();
    console.log(res);
    this.userfollow = res.data.data;
    this.userfollow = res.data.data.map((v) => {
      v.head_img = axios.defaults.baseURL + v.head_img;
      return v;
    });
    //错误
    // this.userfollow.head_img =
    //   axios.defaults.baseURL + this.userfollow.head_img;
  },
  methods: {
    // 取消关注的刷新，主要是将数组中对应的数据删除
    async cancelFollow(id, index) {
      let res = await unFollowUser(id);
      this.userfollow.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>