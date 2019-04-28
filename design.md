<center>tyrion-blog 设计文档</center>

### 功能描述

tyrion-blog 个人技术博客，需要实现以下功能

- 注册及登录
  - 注册
  - 登录
    - 用户登录
    - 游客登录
    - 访客数
- 博客文章
  - 新增文章
    - 新增文章保存到markdown格式的数据到数据库articles表中
    - 阅读文章：调接口，接口返回html字符串
  - 修改文章
    - 从数据库获取文章在markdown编辑器显示
  - 删除文章
  - 查找文章
  - 文章分类
  - 修改文章所属类别
  - 文章阅读数（点击数）
  - 文章评论



### 前端

##### 技术栈

- react

- ant-design

- less(css)


  

### 后端

- koa2
- 数据库sqlite



