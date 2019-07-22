
const { getComments, addComment } = require('../models/commentModel');
const { getRandom } = require('../common/js/utils');
const { getResponseObj } = require('../common/js/utils');

module.exports = {
  getCommentsByArticleId: async ctx => {
    let { success, fail, unknown } = getResponseObj();
    console.log('进入来')
    try {
      let { id } = ctx.request.body,
        result = await getComments(id);
        success.code = '001';
        success.msg = 'ok';
        success.comments = result.length > 0 ? result : [];
        ctx.body = success;

    } catch (e) {
      fail.code = '002';
      fail.msg = e;
      ctx.body = fail;
    }
  },
  addArticeComment: async ctx => {
    console.log('进来了')
    let { success, fail, unknown } = getResponseObj();
    let {id, toUserName = null, fromUserName, content, time,commentId} = ctx.request.body
    console.log(id, toUserName = null, fromUserName, content, time, commentId);
    let result  = await(addComment({id, toUserName, fromUserName, content, time, commentId}));
    console.log(result);
     if (result.code !== 'OK') {
      return ctx.body = unknown;
    }
    success.msg = '新增评论成功';
    ctx.body = success;
  }
}