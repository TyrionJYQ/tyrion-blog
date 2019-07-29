import React, { Component } from "react";
import { getArticleDetail } from "@api/article";
import { getCommentsById } from "@api/comment";
import Comments from '@components/comment/comment';
import AddComment from '@components/addComment/addComment'
import { message, Spin, Button } from 'antd';
import './articleDetail.css'
class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      articleDetail: {},
      comments: [],
      loading: true,
      isShowComment: false,
      isShowAddComment: false,
      childComment: {},
      styleObj: {}
    };
    this.toUserName = null;
  }

  onRef(C) {
    this.childC = C
  }
  // 获取新增评论组件
  getAddComponent(C) {
    this.childComonentNamedAddComponent = C
  }
  success(newComment) {
    this.state.comments.unshift(newComment);
    this.childC._getListData();
    this.childC.commentTarget && this.childC.commentTarget.click() && (this.childC.commentTarget = null)
  }

  _getArticleContentMinHeight() {
    let minHeight = document.body.offsetHeight - 66 -30 - 64
    this.setState({
      styleObj: {
        minHeight
      }
    })
  }

  componentDidMount() {
    let _this = this;
    this._getArticleContentMinHeight();
    const { id } = this.props.match.params;
    Promise.all([getArticleDetail(id), getCommentsById(id)]).then(data => {
      _this.setState({
        loading: false,
        comments: data[1],
        articleDetail: data[0],
        isShowComment: true
      })

    }, err => {
      message.error('出错了，程序员正在坐火箭赶来');
    });
  }
  render() {
    const { comments, articleDetail, isShowAddComment } = this.state;
    const ISLOGIN = localStorage.getItem('tyrionblogUser');
    const button = ISLOGIN ?
      <Button type="primary" onClick={() => this.childComonentNamedAddComponent.onSubmit()}>回复</Button> :
      <Button type="primary" onClick={() => this.props.history.push('/login')}>登录后评论</Button>;
    return (
      <div className="article-detail">
        {/* 评论列表组件 */}

        <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} style={this.state.styleObj}/>
        <div className='comment-wrapper'>
          <div>
            {this.state.isShowComment ?
              <Comments comments={comments}
                onRef={this.onRef.bind(this)}
                id={this.state.articleDetail.id}
                success={this.success.bind(this)} /> :
              <span>加载中...</span>}
          </div>
          {/* 新增评论组件 */}
          <div className="comment">
            <AddComment id={this.state.articleDetail.id}
              success={this.success.bind(this)}
              toUserName={this.toUserName}
              getAddComponent={this.getAddComponent.bind(this)} />
          </div>

          {/* 操作按钮*/}
          {button}
        </div>

        <Spin spinning={this.state.loading} />
      </div>
    )
  }
}
export default ArticleDetail;
