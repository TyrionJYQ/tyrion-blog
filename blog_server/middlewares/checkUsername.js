const { getResponseObj } = require('../common/js/utils');
const { unCheckRouteList } = require('../config')
module.exports = async (ctx, next) => {
  const {fail} = getResponseObj();
  let isPass = unCheckRouteList.find(route => route === ctx.url);
  if (!isPass) {
    let { username } = ctx.request.body;
    if (!username) {
      fail.msg = '用户名不能为空';
      return ctx.body = fail;
    }
  }
  await next();
}