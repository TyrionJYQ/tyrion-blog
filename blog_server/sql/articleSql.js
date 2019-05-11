module.exports = {
  addArticleSqlStatement: 'INSERT INTO BLOG_ARTICLES(ID,TITLE, ARCHIVE, TAGS, CONTENT, TIME) VALUES(?, ?, ?, ?, ?, ?)',
  getArtilcesLengthSqlStatement: 'SElECT ID FROM BLOG_ARTICLES',
  getCurrentPageArticlsSqlStatement: 'SELECT ID AS id, TAGS AS tags, TITLE AS title, ARCHIVE AS archive, TIME AS time, CONTENT AS content  FROM BLOG_ARTICLES LIMIT countsPerPage OFFSET offsets',
  getArticleDetailById: 'SELECT ID AS id, TAGS AS tags, TITLE AS title, ARCHIVE AS archive, TIME AS time, CONTENT AS content FROM BLOG_ARTICLES WHERE ID = ?',
  getArticleArchivesSqlStatement: 'SELECT DISTINCT ARCHIVE AS archive FROM BLOG_ARTICLES'
}