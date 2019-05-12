module.exports = {
  addArticleSqlStatement: 'INSERT INTO BLOG_ARTICLES(ID,TITLE, CATEGORY, TAGS, CONTENT, TIME) VALUES(?, ?, ?, ?, ?, ?)',
  getArtilcesLengthSqlStatement: 'SElECT ID FROM BLOG_ARTICLES',
  getCurrentPageArticlsSqlStatement: 'SELECT ID AS id, TAGS AS tags, TITLE AS title, CATEGORY AS category, TIME AS time, CONTENT AS content  FROM BLOG_ARTICLES LIMIT countsPerPage OFFSET offsets',
  getArticleDetailById: 'SELECT ID AS id, TAGS AS tags, TITLE AS title, CATEGORY AS category, TIME AS time, CONTENT AS content FROM BLOG_ARTICLES WHERE ID = ?',
  getArticleArchivesSqlStatement: 'SELECT DISTINCT CATEGORY AS category FROM BLOG_ARTICLES',
  getArchivesSqlStatement: 'SELECT ID AS id,TITLE AS title, TIME AS time FROM BLOG_ARTICLES ORDER BY TIME DESC'
}