import React, { Component } from "react";
import { getArticleDetail } from "@api/article";
import { getCommentsById } from "@api/comment";
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
    let _this =this;
    const {id} = this.props.match.params;
    getArticleDetail(id).then(data => {
      (data.code === '001') && _this.setState({content: data.articleDetail.content});
    }, err => console.log(err));
    getCommentsById('7341633937').then(data => {
      if(data.code !== '001') return;
      this.setState({
        comments:data.comments
      })
    })
  }
  render() {
    const { content } = this.state;
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div>评论模块</div>
      </div>
    )
  }
}
export default ArticleDetail;
