// 一些插件可变配置项
const qiniu = require("qiniu");
module.exports = {
  // 七牛云上传配置
  QINIU_CONFIG: {
    // 个人中心密钥管理
    ACCESSKEY: "4qHZaK8ItQ9GFr9kfHM2cUsEiPl5J9PHydVcGHlt",
    SECRETKEY: "fU_stp9coHT8h0_Fi7UCL9PK9sNfd_0oUb7LK8DL",
    BUCKET: "kaoyan-blogs", //要上传的空间名
    ZONE: qiniu.zone.Zone_z1, //机房名称
    DOMAIN_NAME: "http://s290htxet.hb-bkt.clouddn.com/", //测试域名
  },
};
