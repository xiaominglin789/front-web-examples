<template>
  <div v-if="record" class="com-card-item">
    <div class="img-box">
      <img :src="record.img" />
    </div>
    <div class="infor">
      <p class="title">{{ record.title }}</p>
      <p class="remark">{{ record.remark }}</p>
      <span class="price">¥ {{ record.price }}</span>
      <span class="current-total">单品总价: {{ record.totalPrice }}</span>
    </div>
    <!-- 删除/添加按钮 -->
    <div class="btns">
      <div :class="['btn-reduce', isMin ? 'cancel' : '']" @click="onReduce">
        -
      </div>
      <input type="text" v-model="inputValue" />
      <div class="btn-plus" @click="onPlus">+</div>
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
  data() {
    return {
      inputValue: 1,
    };
  },
  computed: {
    isMin: function () {
      return this.inputValue <= 1 ? true : false;
    },
  },
  mounted() {
    if (this.record.totalCount) {
      this.inputValue = this.record.totalCount;
    }
  },
  methods: {
    /** 减1 */
    onReduce() {
      if (this.inputValue >= 1) {
        this.inputValue--;
        this.$emit("on-reduce", this.record);
      }
    },
    /** 加1 */
    onPlus() {
      this.inputValue++;
      this.$emit("on-plus", this.record);
    },
  },
};
</script>

<style lang="scss" scoped>
.com-card-item {
  box-sizing: border-box;
  width: 100%;
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  position: relative;
  .check-box {
    display: inline-block;
    padding-right: 8px;
  }
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
    .current-total {
      font-size: 14px;
      color: #999;
    }
  }
  .btns {
    position: absolute;
    bottom: 6px;
    right: 10px;
    width: 120px;
    height: 27px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: orangered;
    box-sizing: border-box;
    border-radius: 4px;
    input {
      width: 36px;
      height: 27px;
      display: inline-block;
      text-align: center;
    }
    .cancel {
      opacity: 0.5;
    }
    .btn-reduce,
    .btn-plus {
      box-sizing: border-box;
      color: #555;
      width: 27px;
      height: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #999;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
