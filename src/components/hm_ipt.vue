<template>
  <input
    type="text"
    class="ipt"
    @input="sendinfo"
    @blur="getstates"
    :[key]="{ success: flag, error: !flag }"
  />
</template>

<script>
export default {
  props: {
    rules: {
      type: [RegExp],
    },
    message: {
      type: [String],
    },
  },
  data() {
    return {
      flag: "",
      key: "",
    };
  },
  methods: {
    sendinfo(e) {
      let value = e.target.value;
      if (this.rules) {
        this.key = "class";
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      if (value === "") {
        this.key = "";
      }
      this.$emit("input", value);
    },
    getstates(e) {
      let value = e.target.value;
      if (this.rules) {
        if (!this.rules.test(value)) {
          this.$toast.fail({
            message: this.message,
            position: "bottom",
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ipt {
  width: 314 * 100vw/360;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 20px;
  color: #888;
  line-height: 50px;
}
.success {
  border-bottom: 2px solid green;
}
.error {
  border-bottom: 2px solid red;
}
</style>