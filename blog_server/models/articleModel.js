const { addArticleSqlStatement, getArtilcesLengthSqlStatement, getCurrentPageArticlsSqlStatement } = require('../sql/articleSql');
const articleDB = require('../db');
module.exports = {
  addArtcile: artice => articleDB.w(addArticleSqlStatement, artice),
  getArticeSum: () => articleDB.r(getArtilcesLengthSqlStatement, []),
  getCurrentPageArticles: ({countsPerPage, offsets}) => {
    console.log('=============',countsPerPage,  offsets)
    let realGetCurrentPageArticlsSqlStatement =  getCurrentPageArticlsSqlStatement.replace('countsPerPage', countsPerPage).replace('offsets', offsets)
    console.log(realGetCurrentPageArticlsSqlStatement);
    return articleDB.r(realGetCurrentPageArticlsSqlStatement, [])
  }
}