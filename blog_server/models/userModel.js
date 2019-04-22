const userDB = require('../db');
const { getUserByUserName, addUserSqlStatement } = require('../sql/userSql')

module.exports = {
  getUserByUserName: username => userDB.r(getUserByUserName, [username]),
  addUser: userInfo => userDB.w(addUserSqlStatement, userInfo)
}