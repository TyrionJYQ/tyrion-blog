import About from '../components/about/about';
import Home from '../components/home/home';
import Archive from '../components/archive/archive';
import WritePage from '../components/writepage/writepage';
import ArticleDetail from '../components/articleDetail/articleDetail';

export const routes = [
  {
    key: '首页',
    path: '/main/home',
    component: Home 
  },
  {
    key: '归档',
    path: '/main/archive',
    component: Archive
  },
  
  {
    key: '关于',
    path: "/main/about",
    component: About
  },
  {
    key: 'markdown测试',
    path: "/main/write",
    component: WritePage
  },
  {
    key: '文章详情',
    path: "/main/article/:id",
    component: ArticleDetail
  }
];



