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
      // 当用户单击按钮的时候是子组件进行响应的，那么我们需要告诉父组件需要进行单击响应处理：子传父
      // 父组件监听子组件所发出事件的时候，优先以子组件发出的事件为准
      this.$emit("click", e);
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