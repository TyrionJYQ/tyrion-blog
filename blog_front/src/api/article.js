import Http from "@assets/js/http";
import {articleModule} from '@config/requestUrlConfig';

const {getArticlesUrl} = articleModule;

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


export {
    getArticles
}
