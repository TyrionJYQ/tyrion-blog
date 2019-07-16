const Router = require("koa-router");
let router = new Router();
let {getCommentsByArticleId} = require('../controllers/commentController');

router.post('/tyrionblog/comment/id', getCommentsByArticleId);
  
 
module.exports = router;
