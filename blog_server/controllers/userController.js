const { getUserByUserName, addUser } = require('../models/userModel');
const { success, fail, unknown } = require('./apiConfig')
module.exports = {
  doUserLogin: async (ctx, next) => {
    try {
      let { username, password } = ctx.request.body;
      if (!username || !password) {
        fail.msg = '用户名或密码不能为空';
        return ctx.body = fail;
      }
      let users = await getUserByUserName(username);
      if (users.length === 0) {
        fail.msg = '用户名或密码错误，请重新输入';
        return ctx.body = fail;
      }
      let user = users[0];
      if (user.password === password) {
        success.msg = '登录成功'
        return ctx.body = success;
      }
    } catch (e) {
      console.log(e)
    }
  },

  doUserRegister: async(ctx, next) => {
    try {
      let { username, password } = ctx.request.body;
      if (!username || !password) {
        fail.msg = '用户名或密码不能为空';
        return ctx.body = fail;
      }
      let users = await getUserByUserName(username);
      if(users.length > 0) {
        fail.msg = '用户名已存在';
        return ctx.body = fail;
      } 
      let result = await addUser([username, password]);
      if(result.code !== 'OK') {
        return ctx.body = unknown;
      }
    } catch (e) {
      console.log(e)
    }
  }
}