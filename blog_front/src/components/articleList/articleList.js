import React, { Component } from 'react';
import ArticleShortCut from '../../base/articleShortcut/articleShortcut';
import Http from '../../assets/js/api';
export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
  }
  getArticles() {
    const bizData = {
      url: 'tyrionblog/articles'
    }
    Http.post(bizData).then(data => {
      if(data.code === '001') {
        console.log(this);
        this.setState({
          articles: data.articles
        })
      }
    }, err => console.log(err))
  }
  componentDidMount() {
    this.getArticles()
  }
  render() {
    console.log(this.state.articles);
    var articles = [];
    this.state.articles.forEach(article => {
      articles.push(<ArticleShortCut article={article} key={article.id}/>)
    })
    return (
      <div>
        {articles}
      </div>
    )
  }
}