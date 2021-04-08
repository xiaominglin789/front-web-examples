import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 商品数据源-写死了
    goodList: [
      {
        id: 1,
        img: "https://picsum.photos/64/80?random=1",
        title: "小米1",
        price: 1399,
        remark: "[6GB+128GB, 优惠599元,仅售 1399, 小米科技, 值得拥有.]",
      },
      {
        id: 2,
        img: "https://picsum.photos/64/80?random=2",
        title: "小米2",
        price: 1300,
        remark: "[6GB+128GB, 优惠599元,仅售 1300]",
      },
      {
        id: 3,
        img: "https://picsum.photos/64/80?random=3",
        title: "小米3",
        price: 1699,
        remark: "[6GB+128GB, 优惠599元,仅售 1699]",
      },
      {
        id: 4,
        img: "https://picsum.photos/64/80?random=4",
        title: "小米4",
        price: 1960,
        remark: "[6GB+128GB, 优惠599元,仅售 1960]",
      },
      {
        id: 5,
        img: "https://picsum.photos/64/80?random=5",
        title: "小米5",
        price: 1800,
        remark: "[6GB+128GB, 优惠599元,仅售 1800]",
      },
      {
        id: 6,
        img: "https://picsum.photos/64/80?random=6",
        title: "小米6",
        price: 1799,
        remark: "[6GB+128GB, 优惠599元,仅售 1799]",
      },
      {
        id: 7,
        img: "https://picsum.photos/64/80?random=7",
        title: "小米7",
        price: 1680,
        remark: "[6GB+128GB, 优惠599元,仅售 1680]",
      },
    ],
    /** 购物车列表的总价 */
    totalPrice: 0,
    /** 购物车列表的总数量 */
    totalCount: 0,
    /** cart-item数据结构
     * id: id
     * img: 图片
     * title: 标题
     * price: 单价
     * remark: 注解
     * totalPrice: 当前项的购买总价
     * totalCount: 当前项的购买数量
     */
    cartList: [],
  },
  mutations: {
    /** state数据初始化 */
    INIT_APP_DATA(state, payload) {
      const { totalPrice, totalCount, cartList } = payload;
      state.totalPrice = totalPrice;
      state.totalCount = totalCount;
      state.cartList = cartList;
    },
    /** 单次更新商品总数量 */
    SET_TO_ONE_TOTAL_COUNT(state, type) {
      switch (type) {
        case "PLUS":
          state.totalCount++;
          break;
        case "REDUCE":
          state.totalCount--;
          break;
        default:
          break;
      }
      console.log(state.totalCount);
    },
    /** 单次更新商品总价格 */
    SET_TO_ONE_TOTAL_PRICE(state, payload) {
      const { type, price } = payload;
      switch (type) {
        case "PLUS":
          state.totalPrice += price;
          break;
        case "REDUCE":
          state.totalPrice -= price;
          break;
        default:
          break;
      }
    },
    /** 商品项-自增/自减变化 */
    SET_TO_ONE_CARDLIST(state, payload) {
      const { record, type } = payload;
      const { id, img, title, price, remark } = record;
      // 是否已有数据记录
      const hasIndex = state.cartList.findIndex((item) => item.id === id);
      switch (type) {
        // 添加
        case "PLUS":
          if (hasIndex === -1) {
            // 没记录
            state.cartList.push({
              id,
              img,
              title,
              price,
              remark,
              totalPrice: price,
              totalCount: 1,
              complated: true,
            });
          } else {
            state.cartList[hasIndex].totalPrice += price;
            state.cartList[hasIndex].totalCount += 1;
          }
          break;
        // 减少
        case "REDUCE":
          if (hasIndex !== -1) {
            state.cartList[hasIndex].totalPrice -= price;
            state.cartList[hasIndex].totalCount -= 1;
            if (state.cartList[hasIndex].totalCount === 0) {
              state.cartList.splice(hasIndex, 1);
              // bug: card页面 跨行 减到0 时
              // 下行的input突然显示 0 ???
              // 暂时手动刷新 card页面
              location.href = "/card";
            }
          }
          break;
        default:
          break;
      }
    },
    /** 额外操作-更新浏览器缓存数据 */
    UPDATE_CACHE_LOCALSTORAGE(state) {
      try {
        localStorage.setItem("totalPrice", state.totalPrice);
        localStorage.setItem("totalCount", state.totalCount);
        localStorage.setItem("cartList", JSON.stringify(state.cartList));
      } catch (error) {
        console.error("写入数据失败,浏览器内存溢出 ? ", error);
      }
    },
  },
  /**
   * actions
   *   调用方式一: $store.dispatch('funcName', params)
   *   调用方式二: ...mapActions({ func: 'funcName' }); this.func(params)
   * actions -> 可以调用 -> mutations内方法 -> 操作state
   * mutations内方法的调用 -> 严格由 actions 来调用
   */
  actions: {
    /** 从localstorage数据中初始化记录 */
    initAppData({ commit }) {
      try {
        const totalPrice = Number(localStorage.getItem("totalPrice") || 0);
        const totalCount = Number(localStorage.getItem("totalCount") || 0);
        const cartList = JSON.parse(localStorage.getItem("cartList") || "[]");
        commit("INIT_APP_DATA", { totalPrice, totalCount, cartList });
      } catch (error) {
        console.error("浏览器缓存获取失败 ? ", error);
      }
    },
    /** 单个添加/减少-购物车 */
    setSingleToCard({ commit }, payload) {
      const { record, type } = payload;
      commit("SET_TO_ONE_TOTAL_COUNT", type);
      commit("SET_TO_ONE_TOTAL_PRICE", { type, price: record.price });
      commit("SET_TO_ONE_CARDLIST", { type, record });
      // 同步缓存
      commit("UPDATE_CACHE_LOCALSTORAGE");
    },
    /** 清空购物车记录 */
    clearAllCardList() {
      // 清空购物车页
      // 清空浏览器购物车记录缓存, 主动刷新一次购物车页
      try {
        localStorage.removeItem("totalPrice");
        localStorage.removeItem("totalCount");
        localStorage.removeItem("cartList");
        location.href = "/card";
      } catch (error) {
        console.error("清空当前域数据缓存失败: ", error);
      }
    },
  },
  modules: {},
});
