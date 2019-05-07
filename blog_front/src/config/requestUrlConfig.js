// 用户模块
const userUrlBase = '/tyrionblog/user/'
const userModule = {  
   loginUrl: `${userUrlBase}userLogin`,
   registerUrl: `${userUrlBase}userRegister`,
   logoutUrl: `${userUrlBase}userLogout`
}

// 文章模块
const articleUrlBase = 'tyrionblog/articles'
const articleModule = {
    getArticlesUrl: `${articleUrlBase}`
}
export  {
  userModule,
  articleModule
};
