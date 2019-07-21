const commentDB = require('../db');
const {getCommentByArticleIdSql, addCommentSql}  = require('../sql/commentSql')


module.exports = {
  getComments: id => commentDB.r(getCommentByArticleIdSql, [id]),
  addComment: ({id, toUserName, fromUserName, content, time}) => commentDB.w(addCommentSql,[id, toUserName, fromUserName, content, time])
}