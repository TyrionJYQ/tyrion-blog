const  {success, fail, unknown} = require('./apiConfig');
const { addArtcile} = require('../models/articleModel');
const { getRandom } = require('../common/js/utils');
module.exports = {
  addArticle: async (ctx, next) => {
   let {title, archive, tags, time, content} = ctx.request.body;
    // 判断是否是管理员账号
    if(!title) {
      fail.msg = '文章标题不能为空'
    };
    if(!archive) {
      fail.msg += '文章所属类别不能为空'
    }
    if(!tags) {
      fail.msg += '文章至少需要一个标签'
    }
    if(!content) {
      fail.msg += '文章内容不能为空'
    }
    if(!title || !archive || !tags || !content) {
      return ctx.body = fail;
    }
    // 插入到数据库
    let id = getRandom(10);
    let result = await addArtcile([id, title, archive, tags, content, Date.now()]);
    if (result.code !== 'OK') {
      return ctx.body = unknown;
    }
    success.msg = '文章保存成功';
    ctx.body = success;
  },

  getArticles: async (ctx, next) => {
    let {archive, tags, startTime, endTime, countsPerPage, curentPage } = ctx.request.body;
    

  }
}