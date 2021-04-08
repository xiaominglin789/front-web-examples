<template>
  <div class="com-top-bar">
    <span
      class="back-icon"
      v-if="backText"
      v-text="backText"
      @click="onRouterBack"
    ></span>
    <h3 class="title" v-if="title" v-text="title"></h3>
    <span class="other">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    backText: String,
    title: String,
  },
  methods: {
    onRouterBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.com-top-bar {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orangered;
  color: #fff;
  position: relative;
  .back-icon {
    width: 70px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .other {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  .other,
  .back-icon {
    cursor: pointer;
  }
}
</style>
