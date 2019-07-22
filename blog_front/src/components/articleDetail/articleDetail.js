import React, { Component } from "react";
import { getArticleDetail } from "@api/article";
import { getCommentsById } from "@api/comment";
import Comments from '@components/comment/comment';
import AddComment from '@components/addComment/addComment'
import { Comment, Avatar, Form, Button, List, Input, message, Spin } from 'antd';
class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      articleDetail: {},
      comments: [],
      loading: true,
      isShowComment: false,
      isShowAddComment: false,
      childComment: {}
    };

  }

  toggleShowAddComment() {
    debugger;
    let isShowAddComment = !this.state.isShowAddComment;
    this.setState({
      isShowAddComment
    })
  }

  success(newComment) {
    this.state.comments.unshift(newComment);
    this.setState({
      isShowAddComment: false,
      comments: this.state.comments,
      isShowComment: false
    })
    this.setState({ isShowComment: true })
  }


  componentDidMount() {

    let _this = this;
    const { id } = this.props.match.params;
    Promise.all([getArticleDetail(id), getCommentsById(id)]).then(data => {
      message.success('Loading finished', 2.5);
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
    debugger
    const { comments, articleDetail } = this.state;
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} />

        <div>
          {this.state.isShowComment ? (<Comments comments={comments} />) : ''}
        </div>
        {this.state.isShowAddComment && (<AddComment id={this.state.articleDetail.id} success={this.success.bind(this)}></AddComment>)}

        {localStorage.getItem('tyrionblogUser') ? (<span onClick={() => this.toggleShowAddComment()}>发表评论</span>) : (<span></span>)}
        <Spin spinning={this.state.loading} />
      </div>
    )
  }
}
export default ArticleDetail;
