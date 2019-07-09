// const  {baseSuccess, baseFail, baseUnknown} = require('./apiConfig');
const { addArtcile, getArticeSum, getCurrentPageArticles, getArticleById, getArticleArchives, getArchives, getArticlesByCategory, getArticlesCountByCategory } = require('../models/articleModel');
const { getRandom } = require('../common/js/utils');
const { getResponseObj } = require('../common/js/utils');
const md = require('markdown-it')(
  {
    html: true,
    linkify: true,
    typographer: true
  }
);
function _getBase() {
  return {
    success: JSON.parse(JSON.stringify(baseSuccess)),
    fail: JSON.parse(JSON.stringify(baseFail)),
    unknown: JSON.parse(JSON.stringify(baseUnknown))
  }
}
module.exports = {
  addArticle: async ctx => {
    const { success, fail, unknown } = getResponseObj();
    let { title, category, tags, content } = ctx.request.body;
    // 判断是否是管理员账号
    if (!title) {
      fail.msg = '文章标题不能为空'
    };
    if (!category) {
      fail.msg += '文章所属类别不能为空'
    }
    if (!tags) {
      fail.msg += '文章至少需要一个标签'
    }
    if (!content) {
      fail.msg += '文章内容不能为空'
    }
    if (!title || !category || !tags || !content) {
      return ctx.body = fail;
    }
    // 插入到数据库
    let id = getRandom(10);
    let result = await addArtcile([id, title, category, tags, content, Date.now()]);
    if (result.code !== 'OK') {
      return ctx.body = unknown;
    }
    success.msg = '文章保存成功';
    ctx.body = success;
  },

  getAllArticles: async ctx => {
    const { success, fail, unknown } = getResponseObj();
    let { countsPerPage = 5, currentPage = 1 } = ctx.request.body;
    let ids = await getArticeSum();
    let counts = ids.length;
    let offsets = (currentPage - 1) * countsPerPage
    let articles = await getCurrentPageArticles({ countsPerPage, offsets })
    articles.forEach(article => article.content = md.render(article.content));
    console.log(articles);
    let pages = Math.ceil(counts / countsPerPage)
    successObj = Object.assign({}, success, { msg: '文章获取成功', counts, pages, articles })
    ctx.body = successObj;
  },

  getArticleDetail: async ctx => {
    const { success, fail, unknown } = getResponseObj();
    let { id } = ctx.request.body;
    fail.msg = '文章不存在';
    if (!id || id.length !== 10) return ctx.body = fail;
    let results = await getArticleById(id);
    if (results.erroMsg) {
      unknown.msg = results.erroMsg;
      return ctx.body = unknown;
    }
    if (results.length === 0) return ctx.body = fail;
    results[0].content = md.render(results[0].content)
    success.articleDetail = results[0];
    ctx.body = success;
  },

  getCategories: async ctx => {
    const { success, fail, unknown } = getResponseObj();
    let results = await getArticleArchives();
    if (results.erroMsg) {
      unknown.msg = results.erroMsg;
      return ctx.body = unknown;
    }
    success.msg = '获取文章归档成功';
    if (results.length === 0) {
      success.categories = [];
      success.counts = [];
    } else {
      success.categories = results.map(result => result.category);
      // 获取每个category下文章数目
      success.counts= await getArticlesCountByCategory(success.categories).then(datas => {
        return datas.map(data => data.length);
      });
    };
    ctx.body = success; 
  },

  getArticlesArchvies: async ctx => {
    const { success, fail, unknown } = getResponseObj();
    let results = await getArchives();
    if (results.erroMsg) {
      return ctx.body = unknown;
    }
    success.archives = results;
    ctx.body = success;
  },

  getArticlesByCategory: async ctx => {
    const { success, fail, unknown } = getResponseObj();
    let { category } = ctx.request.body;
    if (!category) {
      fail.msg = '分类不能为空';
      return ctx.body = fail;
    }
    let results = await getArticlesByCategory(category);
    if (results.erroMsg) {
      unknown.msg = results.erroMsg;
      return ctx.body = unknown;
    }
    results.forEach(article => article.content = md.render(article.content));
    success.msg = '获取文章成功!';
    success.articles = results;
    ctx.body = success;
    
  }
}