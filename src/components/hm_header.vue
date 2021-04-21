<template>
  <div class="myheader">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String],
    },
  },
};
</script>

<style lang="less" scoped>
.myheader {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    font-size: 20px;
    color: red;
  }
}
</style>