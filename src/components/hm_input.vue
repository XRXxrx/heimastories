<template>
  <input
    type="text"
    class="hminput"
    @input="sendvalue"
    :[key]="{ success: flag, error: !flag }"
    @blur="inptbulr"
  />
</template>

<script>
export default {
  //   props: ["value"],
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
    sendvalue(e) {
      let value = e.target.value;
      if (this.rules) {
        this.key = "class";
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      //   console.log(value);
      if (value === "") {
        this.key = "";
      }
      //   this.$emit("getvalue", e.target.value);
      this.$emit("input", value);
    },
    inptbulr(e) {
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
.hminput {
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