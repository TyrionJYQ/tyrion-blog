# **	Interface Design**

### 共通

- code 响应编码

  - 001：请求成功
  - 002: 请求失败
  - 003:未知错误

- msg 响应消息

  - 根据接口不同功能给出具体提示信息，失败时不必要给出具体信息
  - if(code === '003') msg = '出现未知的错误，程序员小哥正在坐火箭赶来!'，msg共通

- username: 所有接口对用户名进行校验，用户名为空给出提示信息:用户不存在(checkUserName.js中间件)

<!--readmore-->

### 登录

##### 请求路径 `tyrionblog/user/userLogin`

##### 请求方法: post

##### 请求参数

| 请求参数     | 数据类型   | 必填   | 描述   |
| -------- | ------ | ---- | ---- |
| username | string | 是    | 用户名  |
| passward | string | 是    | 密码   |
| capture  | string | 是    | 验证码  |

##### 响应参数

| 响应参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| code | string | 是    | 响应编码 |
| msg  | string | 是    | 响应信息 |

##### 业务说明



- 用户名是否存在
- 密码是否存在
- 根据用户名从BLOG_USER表中获取密码password
- 比较数据库密码和请求参数密码，不一致给出提示信息msg:用户名和密码不一致，请重新登录




### 登出

##### 请求路径 `tyrionblog/user/userLogout`

##### 请求方法: post

##### 请求参数

| 请求参数 | 数据类型 | 必填   | 描述   |
| ---- | ---- | ---- | ---- |
| /    | /    | /    | /    |

##### 响应参数

| 响应参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| code | string | 是    | 响应编码 |
| msg  | string | 是    | 响应信息 |

##### 业务说明



- 清空session(ctx.session= null)


### 注册



##### 请求路径 `tyrionblog/user/userRegister`

##### 请求方法: post

##### 请求参数

| 请求参数     | 数据类型   | 必填   | 描述   |
| -------- | ------ | ---- | ---- |
| username | string | 是    | 用户名  |
| passward | string | 是    | 密码   |
| v_code   | string | 是    | 验证码  |
| email    | string | 是    | 邮箱   |

##### 响应参数

| 响应参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| code | string | 是    | 响应编码 |
| msg  | string | 是    | 响应信息 |

##### 业务说明

- 对用户名和密码进行校验，用户名或密码不存在code: '002',msg: '用户名或密码不存在'
- 将注册用户存储到BLOG_USER表
  - 存储成功：code: 001,msg: '注册成功';
  - 存储失败： code: 003,msg:共通msg



### 验证码

##### 请求路径 `tyrionblog/user/v_code`

##### 请求方法: get

##### 请求参数

| 请求参数 | 数据类型 | 必填   | 描述   |
| ---- | ---- | ---- | ---- |
| /    | /    | /    | /    |

##### 响应参数

| 响应参数   | 数据类型   | 必填   | 描述        |
| ------ | ------ | ---- | --------- |
| code   | string | 是    | 响应编码      |
| msg    | string | 是    | 响应信息      |
| v_code | string | 是    | 5位随机数字字符串 |





### 新增文章



##### 请求路径 `tyrionblog/articles/newArticle`

##### 请求方法: post

##### 请求参数

| 请求参数     | 数据类型    | 必填   | 描述              |
| -------- | ------- | ---- | --------------- |
| username | string  | 是    | 用户名             |
| title    | string  | 是    | 文章标题            |
| archive  | string  | 是    | 文章归类            |
| tags     | string  | 是    | 文章标签，多个以标签以逗号分隔 |
| content  | string? | 是    | 文章正文            |

##### 响应参数

| 响应参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| code | string | 是    | 响应编码 |
| msg  | string | 是    | 响应信息 |

##### 业务说明

- 对用户名进行校验，如果不是管理员：code === '002', msg === '请用管理员账号登陆'
- 对文章title，archive，tags, time， content进行校验，如果为空，code === '002'，给出对应提示信息msg
- 生成随机十位数字字符串作为文章id.
- 将文章保存到数据库



### 获取文章



##### 请求路径 `tyrionblog/articles`

##### 请求方法: get

##### 请求参数

| 请求参数          | 数据类型   | 必填   | 描述       |
| ------------- | ------ | ---- | -------- |
| countsPerPage | number | 否    | 每页显示文章数量 |
| currentPage   | number | 否    | 第几页      |

##### 响应参数

| 响应参数     | 数据类型   | 必填   | 描述    |
| -------- | ------ | ---- | ----- |
| code     | string | 是    | 响应编码  |
| msg      | string | 是    | 响应信息  |
| articles | array  | 是    | 请求的文章 |
| pages    | number | 是    | 总页数   |
| counts   | number | 是    | 文章总数  |

##### 业务说明

- 获取博客文章
- 根据请求参数对字段进行筛选



### 获取文章详情



##### 请求路径 `tyrionblog/articles`/articleDetail

##### 请求方法: post

##### 请求参数

| 请求参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| id   | number | 是    | 文章id |

##### 响应参数

| 响应参数          | 数据类型   | 必填   | 描述   |
| ------------- | ------ | ---- | ---- |
| code          | string | 是    | 响应编码 |
| msg           | string | 是    | 响应信息 |
| articleDetail | object | 否    | 文章详情 |

##### 业务说明

- 根据id从数据库查找文章
  - 文章不存在, code = '002', msg = '文章不存在'，
  - 文章存在， code = '001', msg = '文章存在'， articleDetail = {id,tags,title, archive, time, content}



### 获取文章分类



##### 请求路径 `tyrionblog/articles`/categories

##### 请求方法: get

##### 请求参数

| 请求参数 | 数据类型 | 必填   | 描述   |
| ---- | ---- | ---- | ---- |
| /    | /    | /    | /    |

##### 响应参数

| 响应参数       | 数据类型   | 必填   | 描述   |
| ---------- | ------ | ---- | ---- |
| code       | string | 是    | 响应编码 |
| msg        | string | 是    | 响应信息 |
| categories | array  | 是    | 所有归档 |

##### 业务说明

- 从数据库文章表中获取所有category,过滤相同category并返回，如果为空，则返回数组。






### 获取文章归档



##### 请求路径 `tyrionblog/articles`/archives

##### 请求方法: get

##### 请求参数

| 请求参数 | 数据类型 | 必填   | 描述   |
| ---- | ---- | ---- | ---- |
| /    | /    | /    | /    |

##### 响应参数

| 响应参数     | 数据类型   | 必填   | 描述   |
| -------- | ------ | ---- | ---- |
| code     | string | 是    | 响应编码 |
| msg      | string | 是    | 响应信息 |
| articles | array  | 是    | 所有归档 |

##### 业务说明

从文章表中获取所有文章articles = [...,{id, time, title},...]

前台假分页处理





### 根据文章category获取



##### 请求路径 `tyrionblog/articles`/categories/category

##### 请求方法: post

##### 请求参数

| 请求参数     | 数据类型   | 必填   | 描述     |
| -------- | ------ | ---- | ------ |
| category | string | 是    | 文章所属分类 |

##### 响应参数

| 响应参数     | 数据类型   | 必填   | 描述   |
| -------- | ------ | ---- | ---- |
| code     | string | 是    | 响应编码 |
| msg      | string | 是    | 响应信息 |
| articles | array  | 是    | 所有归档 |

##### 业务说明

- 从数据库文章表中获取所有category,过滤相同category并返回，如果为空，则返回数组。

- 暂不做分页处理，直接返回所有文章

- articles: {id,  tags, title, category, time, content}




### 获取文章评论



##### 请求路径 `tyrionblog/comment`/id

##### 请求方法: post

##### 请求参数

| 请求参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| id   | string | 是    | 文章id |

##### 响应参数

| 响应参数     | 数据类型   | 必填   | 描述     |
| -------- | ------ | ---- | ------ |
| code     | string | 是    | 响应编码   |
| msg      | string | 是    | 响应信息   |
| comments | array  | 是    | 文章所有评论 |

##### 业务说明

- 根据文章id获取文章下的所有评论

  ​

  ​


### 新增文章评论



##### 请求路径 `tyrionblog/comment`/newComment

##### 请求方法: post

##### 请求参数

| 请求参数         | 数据类型   | 必填   | 描述                            |
| ------------ | ------ | ---- | ----------------------------- |
| id           | string | 是    | 文章id                          |
| toUserName   | string | 否    | 被评论人用户名                       |
| fromUserName | string | 是    | 评论人用户名                        |
| content      | string | 是    | 评论内容                          |
| time         | number | 是    | 评论时间                          |
| contentId    | 评论id   | 是    | 评论id: 文章id + 评论人 + Date.now() |

##### 响应参数

| 响应参数 | 数据类型   | 必填   | 描述   |
| ---- | ------ | ---- | ---- |
| code | string | 是    | 响应编码 |
| msg  | string | 是    | 响应信息 |

##### 业务说明

文章新增评论

