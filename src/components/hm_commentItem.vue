<template>
  <div class="commentItem">
    <commentItem
      v-if="parent.parent"
      :parent="parent.parent"
      @replay="handlerComment"
    ></commentItem>
    <div class="top">
      <div class="left">
        <span>{{ parent.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="handlerComment(parent)">回复</span>
    </div>
    <div class="bottom">{{ parent.content }}</div>
  </div>
</template>

<script>
export default {
  //这个属性的值看可以当组件使用
  name: "commentItem",
  props: {
    parent: {
      type: [Object],
    },
  },
  methods: {
    //先子传父，再在父组件中接收子组件传过去的回复对象，然后复用父传子的方法，从传过去的数据中获取回复id
    handlerComment(v) {
      this.$emit("replay", v);
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>