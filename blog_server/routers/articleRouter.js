const Router = require("koa-router");
let router = new Router();
const { addArticle, getAllArticles, getArticleDetail, getCategories, getArticlesArchvies } = require("../controllers/articleController");
const articleRouterBase = '/tyrionblog/articles'
router
  .post(`${articleRouterBase}/newArticle`, addArticle)
  .post(`${articleRouterBase}`, getAllArticles)
  .post(`${articleRouterBase}/articleDetail`, getArticleDetail)
  .get(`${articleRouterBase}/categories`, getCategories)
  .get(`${articleRouterBase}/archives`, getArticlesArchvies)
module.exports = router;
