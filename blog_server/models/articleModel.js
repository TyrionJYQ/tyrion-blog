const { 
  addArticleSqlStatement, 
  getArtilcesLengthSqlStatement, 
  getCurrentPageArticlsSqlStatement, 
  getArticleDetailById,
  getArticleArchivesSqlStatement,
  getArchivesSqlStatement,
  getArticlesByCategorySqlStatement } = require('../sql/articleSql');
const articleDB = require('../db');
module.exports = {
  addArtcile: artice => articleDB.w(addArticleSqlStatement, artice),
  getArticeSum: () => articleDB.r(getArtilcesLengthSqlStatement, []),
  getCurrentPageArticles: ({countsPerPage, offsets}) => {
    let realGetCurrentPageArticlsSqlStatement =  getCurrentPageArticlsSqlStatement.replace('countsPerPage', countsPerPage).replace('offsets', offsets)
    return articleDB.r(realGetCurrentPageArticlsSqlStatement, [])
  },
  getArticleById: id => articleDB.r(getArticleDetailById, [id]),
  getArticleArchives: () => articleDB.r(getArticleArchivesSqlStatement, []),
  getArchives: () =>  articleDB.r(getArchivesSqlStatement, []),
  getArticlesByCategory: category => articleDB.r(getArticlesByCategorySqlStatement, [category]),
  getArticlesCountByCategory: categoryies => {
    let promises = [];
    categoryies.forEach(category => {
      promises.push(articleDB.r('SELECT ID FROM BLOG_ARTICLES  WHERE CATEGORY = ?', [category]))
    })
    return Promise.all(promises);
  }
}