const Router = require('koa-router');
let router = new Router();
const { addArticle, getArticles} = require('../controllers/articleController');

router
.post('/tyrionblog/articles/newArticle', addArticle)
.get('/tyrionblog/articles', getArticles)
module.exports = router;