import React, { Component } from "react";
import ArticleShortCut from "@base/articleShortcut/articleShortcut";
import "./articleList.css";

export default class ArticleList extends Component {
  render() {
    let articles =[];
    this.props.articles.forEach(article => {
      articles.push(<ArticleShortCut article={article} key={article.id} />);
    });
    return (
      <div className="article-list">
        {articles}
       </div>
    );
  }
}
