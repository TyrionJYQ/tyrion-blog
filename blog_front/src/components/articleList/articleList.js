import React, { Component } from 'react';
import { Pagination, Spin, Icon } from 'antd';
import ArticleShortCut from '../../base/articleShortcut/articleShortcut';
import Http from '../../assets/js/api';
import { paginationConfig } from '../../config/pageConfig';
import './articleList.css'

let {countsPerPage, currentPage} = paginationConfig;
export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      articles: [],
      counts: 50,
      countsPerPage,
      currentPage
    }
  }

  componentDidMount() {
    this.getArticles(paginationConfig)
  }
  toggle(loading) {
    this.setState({loading})
  }
  getArticles(paginationConfig) {
    // this.setState({loading: true})
    this.toggle(true)
    const {countsPerPage, currentPage} = paginationConfig;
    const bizData = {
      url: 'tyrionblog/articles',
      data: {
        countsPerPage,
        currentPage
      }
    }
    Http.post(bizData).then(data => {
      this.toggle(false)
      if(data.code === '001') {
        const {articles, counts} = data;
        this.setState({
          articles,
          counts
        })
      }
    }, err => {
      this.toggle(false)
      console.log(err)
    }
    )
  }
  
  onChange(page) {
    console.log(page);
    const paginationConfig ={countsPerPage, currentPage: page};
    this.getArticles(paginationConfig);
  }
  
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#000'}} spin />;
    let articles = [],{counts} = this.state;
    this.state.articles.forEach(article => {
      articles.push(<ArticleShortCut article={article} key={article.id}/>)
    });
    return (
      <div className="article-list">
        <Spin spinning={this.state.loading} delay={500} indicator={antIcon}></Spin>
        {articles}
        <Pagination
          showQuickJumper
          total={counts}
          hideOnSinglePage={true}
          defaultCurrent={currentPage}
          defaultPageSize={countsPerPage}
          onChange={ page => this.onChange(page)}/>
      </div>
    )
  }
}