const userDB = 
module.exports = {
    getUserByUserName: 'SELECT USERNAME AS username, PASSWORD AS password FROM BLOG_USER WHERE USERNAME = ?', 
    addUserSqlStatement: 'INSERT INTO BLOG_USER1 (USERNAME, PASSWORD, EMAIL) VALUES (?, ?, ?) '
  }