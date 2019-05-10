const { 
  addArticleSqlStatement, 
  getArtilcesLengthSqlStatement, 
  getCurrentPageArticlsSqlStatement, 
  getArticleDetailById } = require('../sql/articleSql');
const articleDB = require('../db');
module.exports = {
  addArtcile: artice => articleDB.w(addArticleSqlStatement, artice),
  getArticeSum: () => articleDB.r(getArtilcesLengthSqlStatement, []),
  getCurrentPageArticles: ({countsPerPage, offsets}) => {
    let realGetCurrentPageArticlsSqlStatement =  getCurrentPageArticlsSqlStatement.replace('countsPerPage', countsPerPage).replace('offsets', offsets)
    return articleDB.r(realGetCurrentPageArticlsSqlStatement, [])
  },
  getArticleById: id => articleDB.r(getArticleDetailById, [id])
}