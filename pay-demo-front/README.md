## 支付宝PC端支付接口流程 - 沙箱环境也是一样的接入流程
- 1、前端点击支付按钮，向后端发起一个ajax请求（get请求，带order_id）
- 2、后端收到order_id，根据支付宝的规则生成支付的url,返回前端
- 3、ajax收到成功的响应，从响应中取出url,并向这个url发起请求
- 4、支付宝的服务器收到请求，返回一个支付页面
- 5、买家登录账号或扫码进行支付
- 6、支付宝回调前端的success页面（访问前端的http://127.0.0.1:8080/success?xxx=xx&yy=yy）(请求中会携带本次支付结果的相关信息)
- 7、这个success页面获取请求中携带的参数，同时采用ajax的方式向后端发起get请求，携带获取的参数
- 8、后端验证支付结果，修改订单状态，返回success页面需要的data数据
- 9、success页面加载数据，展示支付结果
- 10、为了防止用户在支付之后将页面关掉，支付宝服务器会再隔一段时间向后端发送一个携带支付结果的post请求，





### 支付沙箱
- 注意: 浏览器会因为安全机制，触发支付宝的防钓鱼警告。解决办法: 关闭其他网页，只包括当前项目的web页面即可。
![图片](https://img-blog.csdn.net/20180716070329141?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3Jlc2lsaWVudA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 测试
- 买家账号: yaomux7014@sandbox.com
- 密码 111111
