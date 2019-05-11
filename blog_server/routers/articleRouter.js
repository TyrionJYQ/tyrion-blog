const Router = require("koa-router");
let router = new Router();
const { addArticle, getAllArticles, getArticleDetail, getArchives } = require("../controllers/articleController");
const articleRouterBase = '/tyrionblog/articles'
router
  .post(`${articleRouterBase}/newArticle`, addArticle)
  .post(`${articleRouterBase}`, getAllArticles)
  .post(`${articleRouterBase}/articleDetail`, getArticleDetail)
  .get(`${articleRouterBase}/archives`, getArchives)
module.exports = router;
