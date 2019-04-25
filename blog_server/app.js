const Koa = require("koa");
const app = new Koa();
const { port, sessionConfig, sessionKey, routeList } = require("./config");
const userRouter = require("./routers/userRouter");
const checkUsername = require('./middlewares/checkUsername');
const checkLogin = require('./middlewares/checkLogin')

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// body-parser
app.use(require("koa-bodyparser")());

// handle session start
const session = require('koa-session');
app.keys = [sessionKey]
let store = {
  storage: {},
  set: function (key, session) {
    this.storage[key] = session;
  },
  get: function (key) {
    return this.storage[key];
  },
  destroy: function (key) {
    // 通过客户都的cookie钥匙删除session数据
    delete this.storage[key];
  }
};
sessionConfig.store = store;
app.use(session(sessionConfig, app));
// handle session end


app.use(checkLogin(routeList));
// 用户名验证
app.use(checkUsername);


// 路由
app.use(userRouter.routes());

// 原本配置了/a 的get请求方式,但你用了post请求方式, 返回404,
// 以下配置可以返回405  方法不匹配
// 如果客户端使用了元·服务器不能支持的请求方式 比如copy, 返回404
// 以下配置可以返回501  方法未实现
app.use(userRouter.allowedMethods());

app.listen(port, () => console.log(`服务启动在localhost:${port}`));
