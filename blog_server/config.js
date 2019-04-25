module.exports = {
  port: "9999",
  dbConfig: {
    database: "./database/blog.db"
  },
  sessionConfig: {
    key: 'koa:sess', // cookie名称 
    maxAge: 86400000, // 过期时间(毫秒)
    autoCommit: true,
    overwrite: true,
    httpOnly: false, // true客户端无法访问cookie
    signed: true,   // 数据签名
    rolling: false, // 顺延cookie的有效期
    renew: false
  },
  sessionKey: 'tyrion blog',
  routeList: [ // 需要进行登录校验的路由(正则或者字符串)
  ],
};
