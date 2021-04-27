<template>
  <div class="cateManager">
    <myheader title="栏目管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </myheader>
    <div class="delCate">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
          v-for="value in cateList"
          :key="value.id"
          @click="delCate(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span
          v-for="value in unaddCateList"
          :key="value.id"
          @click="addCate(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getCateInfo } from "@/apis/category";
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
  },
  data() {
    return {
      // 已添加栏目
      cateList: [],
      // 未添加栏目
      unaddCateList: [],
    };
  },
  async mounted() {
    let res = await getCateInfo();
    console.log(res);
    this.cateList = res.data.data;
    //根据是否登录截取数据
    if (localStorage.getItem("heima_token")) {
      this.cateList.splice(0, 2);
    } else {
      this.cateList.splice(0, 1);
    }
  },
  methods: {
    delCate(value) {
      // 将当前栏目添加到“未添加栏目中”
      this.unaddCateList.push(value);
      // 将当前栏目从“已添加栏目”中删除
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });
    },
    addCate(value) {
      // 将当前栏目添加到“已添加栏目”
      this.cateList.push(value);
      // 将当前栏目从“未添加栏目中”中删除
      this.unaddCateList = this.unaddCateList.filter((v) => {
        return v.id != value.id;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cateManager {
  .delCate,
  .addCate {
    padding: 10px;
    h3 {
      line-height: 30px;
      font-weight: bold;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      span {
        width: 22%;
        border: 1px solid #ccc;
        text-align: center;
        margin: 5px;
        padding: 10px 15px;
      }
    }
  }
}
</style>