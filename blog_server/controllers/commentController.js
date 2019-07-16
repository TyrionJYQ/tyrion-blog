
const { getComments } = require('../models/commentModel');
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
  }
}