const { fail } = require('../controllers/apiConfig')
module.exports = async (ctx, next) => {
  console.log('进入了')
  let {username} = ctx.request.body;
  if(!username) {
    fail.msg = '用户名不能为空';
    return ctx.body = fail;
  }
  await next()
}