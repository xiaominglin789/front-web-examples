<template>
  <div class="page">
    <!-- 导航 -->
    <div class="nav">
      <router-link to="/"><img alt="Vue logo" src="../../assets/logo.png" /></router-link>
      <ul>
        <li @click="onRouteToHistory">历史订单</li>
        <li @click="onRouteToCard">购物车</li>
      </ul>
    </div>
    <!-- 展示 -->
    <div class="container">
      <ul class="goods">
        <li class="good-item" v-for="(good,index) in goods" :key="index">
          <img :src="good.entryImg" alt="logo">
          <div>
            <h3 class="good-title">{{ good.title }}</h3>
            <p class="good-remard">{{ good.remark }}</p>
            <p class="good-prices">
              <span class="good-real-price">￥{{ good.realPrice }}</span>
              <span class="good-preset-price">￥{{ good.presetPrice }}</span>
            </p>
            <button @click="onPresetAddToCard()">猫咪想吃</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const goods = [
      {
        id: 1,
        entryImg: "https://picsum.photos/200/200?random=1",
        title: "蛋挞毛垫",
        remark: "甜甜软软",
        realPrice:"9.9",
        presetPrice: "19.9"
      },
      {
        id: 2,
        entryImg: "https://picsum.photos/200/200?random=2",
        title: "蛋挞毛垫2号",
        remark: "甜甜软软",
        realPrice:"8.9",
        presetPrice: "18.9"
      },
      {
        id: 3,
        entryImg: "https://picsum.photos/200/200?random=3",
        title: "蛋挞毛垫3号",
        remark: "甜甜软软",
        realPrice:"9.9",
        presetPrice: "19.9"
      },
      {
        id: 4,
        entryImg: "https://picsum.photos/200/200?random=4",
        title: "蛋挞毛垫4号",
        remark: "甜甜软软",
        realPrice:"8.9",
        presetPrice: "18.9"
      }，
      {
        id: 5,
        entryImg: "https://picsum.photos/200/200?random=5",
        title: "蛋挞毛垫5号",
        remark: "甜甜软软",
        realPrice:"9.9",
        presetPrice: "19.9"
      },
      {
        id: 6,
        entryImg: "https://picsum.photos/200/200?random=6",
        title: "蛋挞毛垫6号",
        remark: "甜甜软软",
        realPrice:"8.9",
        presetPrice: "18.9"
      },
      {
        id: 7,
        entryImg: "https://picsum.photos/200/200?random=7",
        title: "蛋挞毛垫7号",
        remark: "甜甜软软",
        realPrice:"9.9",
        presetPrice: "19.9"
      },
      {
        id: 8,
        entryImg: "https://picsum.photos/200/200?random=8",
        title: "蛋挞毛垫8号",
        remark: "甜甜软软",
        realPrice:"8.9",
        presetPrice: "18.9"
      }
    ];
    
    const onRouteToHistory = () => {
      router.push({ path: "/order" });
    }
    const onRouteToCard = () => {
      router.push({ path: "/card" });
    }
    const onPresetAddToCard = () => {
      // 预置加入购物车
    }
    
    return {
      onRouteToHistory,
      onRouteToCard,
      onPresetAddToCard,
      goods
    }
  }
})
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 1px 1px #eee;
  img {
    height: 60px;
  }
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    li {
      margin-left: 16px;
      cursor: pointer;
    }
  }
}
.container {
  width: 100%;
  .goods {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style: none;
    box-sizing: border-box;
    .good-item {
      width: 50%;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding: 20px;
      img {
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        padding: 10px;
      }
      .good-title {}
      .good-prices {
        .good-real-price {}
        .good-preset-price {
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
