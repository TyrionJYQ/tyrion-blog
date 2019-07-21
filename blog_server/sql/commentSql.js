module.exports = {
    getCommentByArticleIdSql: 'SELECT ID AS id, CONTENT AS content, FROM_USERNAME AS fromUserName, TO_USERNAME AS toUserName, TIME AS time FROM COMMENT WHERE ID = ?',
    addCommentSql: 'INSERT INTO COMMENT (ID, TO_USERNAME, FROM_USERNAME, CONTENT, TIME, COMMENT_ID) VALUES (?, ?,?, ?,?, 7)'
}