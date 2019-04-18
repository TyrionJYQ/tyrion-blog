const Koa = require("koa");
const app = new Koa();
const { port } = require("./config");
const db = require("./db");
const userRouter = require('./routers/userRouter')
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




// 路由
app.use(userRouter.routes());


// 原本配置了/a 的get请求方式,但你用了post请求方式, 返回404, 
// 以下配置可以返回405  方法不匹配
// 如果客户端使用了元·服务器不能支持的请求方式 比如copy, 返回404
// 以下配置可以返回501  方法未实现
app.use(userRouter.allowedMethods());

app.listen(port, () => console.log(`服务启动在localhost:${port}`));
