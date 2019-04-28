const { addArticleSqlStatement } = require('../sql/articleSql');
const articleDB = require('../db');
module.exports = {
  addArtcile: artice => articleDB.w(addArticleSqlStatement, artice) 
}