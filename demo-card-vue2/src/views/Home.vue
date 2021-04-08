<template>
  <div class="home">
    <com-top-bar class="top-bar" title="商品">
      <template>
        <span @click="onOpenCard"
          >购物车<i v-show="totalCount">:({{ totalCount }})</i></span
        >
      </template>
    </com-top-bar>
    <ul v-if="goodList.length > 0" class="list-box">
      <list-item
        class="item-box"
        v-for="(item, index) in goodList"
        :key="index"
        :record="item"
        @add-to-card="onAddSingleToCard"
      />
    </ul>
  </div>
</template>

<script>
import ComTopBar from "../components/ComTopBar";
import ListItem from "../components/ListItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ComTopBar,
    ListItem,
  },
  computed: {
    ...mapState({
      goodList: (state) => state.goodList,
      totalCount: (state) => state.totalCount,
    }),
  },
  methods: {
    ...mapActions({
      addNewGood: "addNewGood",
      setSingleToCard: "setSingleToCard",
      initAppData: "initAppData",
    }),
    onOpenCard() {
      this.$router.push("/card");
    },
    onAddSingleToCard(record) {
      this.setSingleToCard({ record, type: "PLUS" });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  padding: 56px 0;
  .top-bar {
    position: fixed;
    top: 0;
    z-index: 999;
  }
}
</style>
