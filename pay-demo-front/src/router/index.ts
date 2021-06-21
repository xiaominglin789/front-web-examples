import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/index.vue")
  },
  {
    path: "/card",
    name: "Card",
    component: () => import("../views/pay/card.vue")
  },
  {
    path: "/pay-success",
    name: "PaySuccess",
    component: () => import("../views/pay/success.vue")
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/order/index.vue"),
  },
  {
    path: "/order-detail",
    name: "OrderDetail",
    component: () => import("../views/order/orderDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;