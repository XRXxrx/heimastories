<template>
  <div class="mystar">
    <myheader title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </myheader>
    <van-swipe-cell v-for="(value, index) in userstar" :key="value.id">
      <mypost :post="value"></mypost>
      <template #right>
        <van-button
          square
          text="取消收藏"
          type="danger"
          class="delete-button"
          style="height: 100%"
          @click="changeStar(value.id, index)"
        ></van-button>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { shouCang } from "@/apis/post";
import { mystarinfo } from "@/apis/user";
import myheader from "@/components/hm_header";
import mypost from "@/components/hm_post";
export default {
  components: {
    myheader,
    mypost,
  },
  data() {
    return {
      userstar: [],
    };
  },
  async mounted() {
    let res = await mystarinfo();
    console.log(res);
    this.userstar = res.data.data;
  },
  methods: {
    async changeStar(id, index) {
      let res = await shouCang(id);
      console.log(res);
      this.userstar.splice(index, 1);
    },
  },
};
</script>

<style>
</style>