import React, { Component } from "react";
import { getArticleDetail } from "@api/article";
import { getCommentsById } from "@api/comment";
import Comments from '@components/comment/comment';
import AddComment from '@components/addComment/addComment'
import { message, Spin } from 'antd';
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

  toggleShowAddComment() {
    this.setState({
      isShowAddComment: true

    })
  }

  onRef(C) {
    this.childC = C
  }

  success(newComment) {
    this.state.comments.unshift(newComment);
    this.childC._getListData();
    this.childC.commentTarget && this.childC.commentTarget.click() && (this.childC.commentTarget = null)
  }


  componentDidMount() {
    let _this = this;
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
    const { comments, articleDetail } = this.state;
    return (
      <div>
        {/* 评论列表组件 */}
        <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} /><div>
          {this.state.isShowComment ? (<Comments comments={comments} onRef={this.onRef.bind(this)} id={this.state.articleDetail.id} success={this.success.bind(this)} />) : ''}
        </div>
        {/* 新增评论组件 */}
        {this.state.isShowAddComment && (<div style={this.state.styleObj}><AddComment id={this.state.articleDetail.id} success={this.success.bind(this)} toUserName={this.toUserName} /></div>)}

        {localStorage.getItem('tyrionblogUser') ? (<span onClick={() => this.toggleShowAddComment()}>发表评论</span>) : (<span></span>)}
        <Spin spinning={this.state.loading} />
      </div>
    )
  }
}
export default ArticleDetail;
