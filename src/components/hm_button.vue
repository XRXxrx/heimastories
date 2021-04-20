<template>
  <div
    class="btn"
    @click="userlogin"
    :class="{
      success: type === 'success',
      danger: type === 'danger',
      primary: type === 'primary',
    }"
  >
    <!-- 使用匿名插槽自定义内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: [String],
    },
  },
  methods: {
    userlogin(e) {
      //告诉父组件你点击了此按钮
      this.$emit("getlogin", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 314 * 100vw/360;
  height: 50px;
  border-radius: 25px;
  background-color: rgb(173, 174, 172);
  line-height: 50px;
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  margin: 0 auto;
}
.success {
  border-color: skyblue;
  background-color: skyblue;
  color: #fff;
}
.danger {
  border-color: red;
  background-color: red;
  color: #fff;
}
.primary {
  border-color: green;
  background-color: green;
  color: #fff;
}
</style>