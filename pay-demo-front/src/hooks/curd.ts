import { reactive, ref } from "vue";

export function useCardStore() {
  const state = reactive({
    /** map(id, num) => 选择的id,数量 */
    selectGoods: new Map<number, number>()
  });

  /** 商品加入购物车 */
  const addToCard = async(id: number) => {
    if (_existenceById(id)) {
      // 没有记录,添加新纪录
    } else {
      // 有记录增加数量
    }
  }

  /** 根据id查看是否存在记录 */
  const _existenceById = (id: number) => {
    let ids = state.selectGoods.keys();
    console.log("已有ids:", ids, " 传入 id: ", id);
    return [...ids].includes(id);
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
