function _checkLogin(ctx) {
  return ctx.session.user
}
module.exports = routeList => {
  return async (ctx, next) => {
    let isLogin = true
    routeList.forEach(route => {
      if (route instanceof RegExp) {
        if (route.test(ctx.url) && !_checkLogin(ctx)) isLogin = false;
      }
      if (route === ctx.url && !_checkLogin(ctx)) isLogin = false;
    })
    if (!isLogin) return ctx.body = { code: '002', msg: '您还没有登录' };
    await next()
  }
}