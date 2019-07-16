module.exports = {
    getCommentByArticleIdSql: 'SELECT ID AS id, CONTENT AS content, FROM_USERNAME AS fromUserName, TO_USERNAME AS toUserName FROM COMMENT WHERE ID = ?'
}