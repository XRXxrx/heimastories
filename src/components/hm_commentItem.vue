<template>
  <div class="commentItem">
    <!-- 单击递归组件内的回复评论按钮，本质目的也是让底部评论块评论内容输入框出现
之前的功能实现过程中，已经实现了评论块回复按钮的单击操作，在递归组件中，我们只需要让递归组件本身也能监听它自己所发出的事件即可 -->
    <!-- @replay="handlerComment"监听下一级组件（递归组件）所发出的事件 -->
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