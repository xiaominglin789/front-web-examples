## nest.js + vue 支付宝沙箱支付
- 在线密钥生成器: https://miniu.alipay.com/keytool/create
  + 为你生成沙箱应用:私钥、公钥
- 支付宝沙箱: https://openhome.alipay.com/platform/appDaily.htm?tab=info
  + APPID
  + 支付宝网关
  + 
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
  - RSA2(SHA256)密钥(推荐) - "设置" 
  - 选择公钥, 填入 公钥 保存即可
4.