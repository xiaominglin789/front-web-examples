## 购物车功能的实现
> 依赖技术栈:
- vue2
- vuex3
- vue-router3



## bug
1.购物车页面
没有限制能最小减到 0 时，产生视图bug:
>> card页面 跨行 减到0 时, 下行的input突然显示 0.
页面的数据已经刷新过了的,可是却影响了显示。
减到0, 购物车数据没问题。




### 安装依赖与启动
- 默认端口：8080
```bash
cd demo-card-vue2
# 
npm install

#
npm run serve
```
