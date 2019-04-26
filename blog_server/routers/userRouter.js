const Router = require('koa-router');
const { doUserLogin, doUserRegister, getCaptcha, doUserLogout } = require('../controllers/userController')

let router = new Router();

router
.post('/tyrionblog/user/userLogin', doUserLogin)
.post('/tyrionblog/user/userRegister', doUserRegister)
.post('/tyrionblog/user/userLogout', doUserLogout)
.get('/tyrionblog/user/v_code', getCaptcha)

module.exports = router;