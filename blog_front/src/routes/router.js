import Login from '../components/login/login';
import Register from '../components/register/register';
import About from '../components/about/about';
import Home from '../components/home/home'
import Archive from '../components/archive/archive'
export const routes = [
  {
    key: '登录',
    path: "/login",
    component: Login
  },
  {
    key: '注册',
    path: "/register",
    component: Register

  },
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
    
  }
];



