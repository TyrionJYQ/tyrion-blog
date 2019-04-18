const Router = require('koa-router');
const userController = require('../controllers/userController')

let router = new Router();

router.get('/', userController.getUserByUserName);

module.exports = router;