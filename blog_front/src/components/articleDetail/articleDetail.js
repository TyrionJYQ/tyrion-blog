import React, { Component } from "react";
import { getArticleDetail } from "@api/article";
import { getCommentsById } from "@api/comment";
import Comments from '@components/comment/comment';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      comments: []
    };
  }
  componentDidMount() {
    console.log(this.props);
    let _this = this;
    const {id} = this.props.match.params;
    getArticleDetail(id).then(data => {
      (data.code === '001') && _this.setState({content: data.articleDetail.content});
    }, err => console.log(err));
    getCommentsById(id).then(data => {
      if(data.code !== '001') return;
      _this.setState({
        comments:data.comments
      })
    })
  }
  render() {
    const { content, comments} = this.state;
    let comment = comments.length > 0 ? <Comments comments = {comments}></Comments> : '暂无评论'
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div>
          {comment}
        </div>
      </div>
    )
  }
}
export default ArticleDetail;
