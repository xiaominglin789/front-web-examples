<template>
  <div class="card">
    <!-- header -->
    <com-top-bar class="top-bar" back-text="返回" title="购物车">
      <template>
        <button v-show="cartList && cartList.length > 0" @click="clearCart">
          清空
        </button>
      </template>
    </com-top-bar>
    <!-- 列表 -->
    <div v-if="cartList && cartList.length > 0" class="goods-box">
      <h3 hidden>购物车列表</h3>
      <com-card-item
        v-for="(item, index) in cartList"
        :key="index"
        :record="item"
        @on-plus="onSinglePlus"
        @on-reduce="onSingleReduce"
      />
    </div>
    <!-- 结算 -->
    <com-settlement
      class="tool-panel"
      :totalPrice="Number(totalPrice)"
      :totalCount="Number(totalCount)"
      @on-to-pay="onWantToPay"
    />
  </div>
</template>

<script>
import ComTopBar from "../components/ComTopBar.vue";
import ComCardItem from "../components/ComCardItem";
import { mapActions, mapState } from "vuex";
import ComSettlement from "../components/ComSettlement.vue";

export default {
  components: {
    ComTopBar,
    ComCardItem,
    ComSettlement,
  },
  data() {
    return {
      currentEditArray: [],
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => {
        console.log("length ", state.cartList.length);
        return state.cartList || [];
      },
      totalCount: (state) => state.totalCount,
      totalPrice: (state) => state.totalPrice,
    }),
  },
  methods: {
    ...mapActions({
      setSingleToCard: "setSingleToCard",
      initAppData: "initAppData",
      clearAllCardList: "clearAllCardList",
    }),
    /** 单次减1 */
    onSingleReduce(record) {
      this.setSingleToCard({ record, type: "REDUCE" });
    },
    clearCart() {
      this.clearAllCardList();
    },
    onWantToPay() {
      alert("核算支付功能-未实现");
    },
    /** 单次加1 */
    onSinglePlus(record) {
      this.setSingleToCard({ record, type: "PLUS" });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  position: relative;
  padding: 56px 0 72px 0;
  .top-bar {
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .tool-panel {
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
