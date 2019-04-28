const Router = require("koa-router");
let router = new Router();
const { addArticle, getAllArticles } = require("../controllers/articleController");

router
  .post("/tyrionblog/articles/newArticle", addArticle)
  .get("/tyrionblog/articles", getAllArticles);
module.exports = router;
