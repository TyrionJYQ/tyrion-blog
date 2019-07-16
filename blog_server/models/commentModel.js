const commentDB = require('../db');
const {getCommentByArticleIdSql}  = require('../sql/commentSql')


module.exports = {
  getComments: id => commentDB.r(getCommentByArticleIdSql, [id])
}