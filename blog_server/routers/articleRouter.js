const Router = require("koa-router");
let router = new Router();
const { addArticle, getAllArticles, getArticleDetail } = require("../controllers/articleController");

router
  .post("/tyrionblog/articles/newArticle", addArticle)
  .post("/tyrionblog/articles", getAllArticles)
  .post("/tyrionblog/articles/articleDetail", getArticleDetail)
module.exports = router;
