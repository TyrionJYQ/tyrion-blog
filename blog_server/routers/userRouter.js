const Router = require('koa-router');
const { doUserLogin, doUserRegister } = require('../controllers/userController')

let router = new Router();

router
.post('/tyrionblog/user/userLogin', doUserLogin)
.post('/tyrionblog/user/userRegister', doUserRegister)

module.exports = router;