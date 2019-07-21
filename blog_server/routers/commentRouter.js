const Router = require("koa-router");
let router = new Router();
let {getCommentsByArticleId, addArticeComment} = require('../controllers/commentController');

router.post('/tyrionblog/comment/id', getCommentsByArticleId)
.post('/tyrionblog/comment/newComment', addArticeComment)
  
 
module.exports = router;
