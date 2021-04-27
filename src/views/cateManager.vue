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
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
        <span>时尚</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/hm_header";
export default {
  components: {
    myheader,
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