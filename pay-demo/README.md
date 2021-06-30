## nest.js + vue 支付宝沙箱支付
- 在线密钥生成器: https://miniu.alipay.com/keytool/create
  + 为你生成沙箱应用:私钥、公钥
- 支付宝沙箱: https://openhome.alipay.com/platform/appDaily.htm?tab=info
  + APPID
  + 支付宝网关
  - 应用私钥
  - 应用公钥
- node-沙箱-sdk 文档: https://www.yuque.com/chenqiu/alipay-node-sdk/config-sdk
  + `yarn add alipay-sdk`





<!--truncate-->





### 接入支付宝沙箱配置步骤:
1.注册开放平台账号 支付宝开放平台： https://open.alipay.com/
2.生成密钥
  - 下载 RSA密钥工具 或 在线生成
  - 生成秘钥
  - 切换到生成秘钥 tab，秘钥格式选择"PKCS1（非JAVA适用）"
  - 下载生成的公钥和私钥文件
3.打开开放平台-沙箱应用
  - RSA2(SHA256) - PKCS1(非JAVA适用) - "设置" 
  - 应用私钥 - 有用的配置
  - 应用公钥 - 有用的配置





### 坑：
[node alipay-sdk](https://www.yuque.com/chenqiu/alipay-node-sdk/guide)
- 1.支付成功后-支付宝收银台 =/=> 无法跳转到绑到的`notifyUrl`地址去？ 坑爹的官方文档(node版本)都没有说明:
`returnUrl` => 才是前端完成支付后跳转的地址参数
`notifyUrl` => 通知的地址, 暂时不知晓何用

formData.addField('returnUrl', 'http://localhost:3000/pay-success');

- 2.支付宝沙箱-查询支付情况:
-i alipay_trade_query_response






### 数据ORM - TypeOrm
- 1.order_good订单商品关系表 => ManyToMany 多对多关系 => 第三张关系表
    - 订单商品关系表: 同一个商品的购买数据需要记录
    - 想要给这个关系表添加额外的字段,只能选择手动维护这张表
    - 有点纠结要不要这样处理。
- 2.方案二: 同一个商品数据的购买数量通过添加相同的关系记录来标识， 如:
    - xxxxx001 - 1
    - xxxxx001 - 1
    - xxxxx001 - 1
    - 代表 xxxxx001订单-id为1的商品购买数量为:3
    - 但是在写入的时候，会有点不合理。需要遍历执行写入操作,如果一个订单购买的同一件商品购买了100份,那么非常影响数据库的性能。 
- 3.对比， 涉及到业务处理的, 应该手动维护关系表才是能准确的控制业务的正确性
