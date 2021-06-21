import { reactive, ref } from "vue";

export function useCardStore() {
  const state = reactive({
    goods: Array<{ id: number, good: object }>(),
  });

  /** 商品加入购物车 */
  const addToCard = async(id: number) => {
    if (!Object.keys(state.goods).includes(String(id))) {

    } else {

    }
  }

  /** 去支付 */
  const toPay = async() => {
    const url = "";
    if (url) {
      window.location.href = url;
    }
  }

  /** 去查询当前支付结果 */
  const toCheckPayResult = async() => {
    
  }

  return {
    state,
    addToCard,
    toPay,
    toCheckPayResult
  }
}
