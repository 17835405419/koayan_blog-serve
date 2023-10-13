const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const { cors, mongoConnect, bodyParser } = require("./config/config");
const router = require("./routes");

mongoConnect(); //连接数据库

app.use(bodyParser()); //处理post参数
app.use(json());
app.use(cors()); //跨域
app.use(router.routes(), router.allowedMethods()); //注册路由

module.exports = app;
