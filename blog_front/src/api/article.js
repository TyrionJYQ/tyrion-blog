import Http from "@assets/js/http";
import {articleModule} from '@config/requestUrlConfig';

const {getArticlesUrl, getArticleDetailUrl,getArticlesArchivesUrl} = articleModule;


const getArticles = paginationConfig => {
    const {countsPerPage, currentPage} = paginationConfig;
    const bizData = {
      url: getArticlesUrl,
      data: {
        countsPerPage,
        currentPage
      }
    };
    return Http.post(bizData);
}

const getArticleDetail = id => {
  const bizData = {
    url: getArticleDetailUrl,
    data: {id}
  }
  return Http.post(bizData);
}

const getArticlesArchives = () => Http.get({url: getArticlesArchivesUrl})

export {
    getArticles,
    getArticleDetail,
    getArticlesArchives
}
