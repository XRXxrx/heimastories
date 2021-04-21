<template>
  <div
    class="mybtn"
    @click="btn"
    :class="{
      success: type === 'success',
      danger: type === 'danger',
      primary: type === 'primary',
    }"
  >
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
    btn(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.mybtn {
  width: 314 * 100vw/360;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  background-color: rgb(173, 174, 172);
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 20px;
}
.success {
  border-color: green;
  background-color: green;
  color: #fff;
}
.danger {
  border-color: red;
  background-color: red;
  color: #fff;
}
.primary {
  border-color: blue;
  background-color: blue;
  color: #fff;
}
</style>