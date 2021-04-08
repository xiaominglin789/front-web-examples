<template>
  <div class="settlement">
    <!-- 结算 -->
    <div class="info">
      <span v-show="totalPrice">合计: {{ totalPrice }} </span>
    </div>
    <button @click="onToPay">
      去核算<i v-show="totalCount">({{ totalCount }})</i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: Number,
    totalPrice: Number,
  },
  methods: {
    onToPay() {
      // 交给父类处理
      this.$emit("on-to-pay");
    },
  },
};
</script>

<style lang="scss" scoped>
.settlement {
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 8px 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -1px 2px 1px #eee;
  button {
    width: 100px;
    background-color: orangered;
    color: #fff;
    outline: none;
    border-radius: 24px;
  }
}
</style>
