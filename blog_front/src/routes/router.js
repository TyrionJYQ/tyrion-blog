import About from '@components/about/about';
import Home from '@components/home/home';
import Archive from '@components/archive/archive';
import WritePage from '@components/writepage/writepage';
import ArticleDetail from '@components/articleDetail/articleDetail';
import Category from '@components/category/category';
import CategoryArticles from '@components/categoryArticles/categoryArticles';

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
    key: '分类',
    path: "/main/category",
    component: Category
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
  },
  {
    key: '分类文章',
    path: "/main/category/:id",
    component: CategoryArticles
  }
];



