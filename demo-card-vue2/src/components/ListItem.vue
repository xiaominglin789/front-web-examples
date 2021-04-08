<template>
  <div v-if="record" class="list-item">
    <div class="img-box">
      <img :src="record.img" />
    </div>
    <div class="infor">
      <p class="title">{{ record.title }}</p>
      <p class="remark">{{ record.remark }}</p>
      <span class="price">¥ {{ record.price }}</span>
    </div>
    <div class="add" @click="addToCard">
      <span>加入购物车</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      default: () => null,
    },
  },
  methods: {
    addToCard() {
      this.$emit("add-to-card", this.record);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  box-sizing: border-box;
  width: 100%;
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  position: relative;
  .img-box {
    width: 64px;
    min-height: 80px;
    img {
      width: 100%;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
  .infor {
    flex: 1;
    box-sizing: border-box;
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
    .remark {
      font-size: 14px;
      color: #888;
    }
    .price {
      font-size: 16px;
      color: orangered;
    }
  }
  .add {
    position: absolute;
    bottom: 8px;
    right: 10px;
    width: 100px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orangered;
    box-sizing: border-box;
    border: 1px solid orangered;
    border-radius: 4px;
  }
}
</style>
