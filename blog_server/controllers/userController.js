const { getUserByUserName } = require('../models/userModel');
const userDB = require('../db');
module.exports = {
    getUserByUserName: async (ctx, next) => {
        console.log('========', getUserByUserName)
        let user = await userDB.r(getUserByUserName,['JYQ'])
         console.log(user);
         ctx.body = user;
    }
}