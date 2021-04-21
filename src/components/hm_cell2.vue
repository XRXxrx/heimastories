<template>
  <div class="cell">
    <div class="left">{{ title }}</div>
    <div class="right">
      <span>{{ desc }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String],
      required: true,
    },
    desc: {
      type: [String],
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  color: #000;
  padding: 0 10px;
  box-sizing: border-box;
  .right {
    font-size: 12px;
    color: #999;
    span {
      margin-right: 5px;
    }
  }
}
</style>