import React, { Component } from "react";
import { getArticleDetail } from "@api/article";

class ArticleDetail extends Component {
  constructor() {
    super();
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    console.log(this.props);
    let _this =this;
    const {id} = this.props.match.params;
    getArticleDetail(id).then(data => {
      (data.code === '001') && _this.setState({content: data.articleDetail.content});
    }, err => console.log(err))
  }
  render() {
    const { content } = this.state;
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
}
export default ArticleDetail;
