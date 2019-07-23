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
      childComment: {},
      styleObj: {}
    };
    this.toUserName = null;
  }
  _getElementPosition(e) {
    var x = 0, y = 0;
    while (e != null) {
      x += e.offsetLeft;
      y += e.offsetTop;
      e = e.offsetParent;
    }
    return { x: x, y: y };
  }
  toggleShowAddComment(toUserName, e, styleObj) {
    toUserName && (this.toUserName = toUserName);
    let isShowAddComment = true
     if (!toUserName) return this.setState({
      isShowAddComment,
      styleObj: {}
    })
    let top = this._getElementPosition(e.target).y;
     let left = this._getElementPosition(e.target).x;
    styleObj = {
      position: 'absolute',
      top,
      left
    }
    console.log(toUserName,styleObj)
    
   
    this.setState({
      isShowAddComment,
      styleObj
    })

  }

  onRef(C) {
    this.childC = C
  }

  success(newComment) {
    this.state.comments.unshift(newComment);
    this.childC._getListData();
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
    // debugger
    const { comments, articleDetail } = this.state;
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: articleDetail.content }} /><div>
          {this.state.isShowComment ? (<Comments comments={comments} onRef={this.onRef.bind(this)} id={this.state.articleDetail.id} success={this.success.bind(this)}/>) : ''}
        </div>
        {this.state.isShowAddComment && (<div style= {this.state.styleObj}><AddComment id={this.state.articleDetail.id} success={this.success.bind(this)} toUserName = {this.toUserName}/></div>)}

        {localStorage.getItem('tyrionblogUser') ? (<span onClick={() => this.toggleShowAddComment()}>发表评论</span>) : (<span></span>)}
        <Spin spinning={this.state.loading} />
      </div>
    )
  }
}
export default ArticleDetail;
