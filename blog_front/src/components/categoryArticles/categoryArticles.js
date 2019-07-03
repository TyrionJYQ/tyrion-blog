import React, { Component } from "react";
import ArticleShortCut from "@base/articleShortcut/articleShortcut";
import { getArticlesByDetail } from "@api/article";

export default class CategoryArticles extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    };
  }
  componentDidMount() {
   this.getArtticles();
   
  }
  getArtticles() {
    let id = this.props.match.params.id;
    getArticlesByDetail(id).then(data => {
        if (!data || data.code !== '001') return;
        this.setState({
          articles: data.articles
        });
    });
  }

  render() {
    let articles =[];
    this.state.articles.forEach(article => {
      articles.push(<ArticleShortCut article={article} key={article.id} />);
    });
    return (
      <div className="article-list">
        {articles}
       </div>
    );
  }
}
