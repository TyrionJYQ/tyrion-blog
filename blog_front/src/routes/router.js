import About from '../components/about/about';
import Home from '../components/home/home';
import Archive from '../components/archive/archive';
import Article from '../base/article/article'
export const routes = [
  {
    key: '首页',
    path: '/main/home',
    component: Home 
  },
  {
    key: '分类',
    path: '/main/archive',
    component: Archive
  },
  
  {
    key: '关于',
    path: "/main/about",
    component: About
    
  },
  {
    key: '文章测试',
    path: "/main/article",
    component: Article

  }
];



