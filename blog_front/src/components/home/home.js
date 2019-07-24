import React, { Component } from "react";
import { Pagination } from "antd";
import ArticleList from "@components/articleList/articleList";
import { paginationConfig } from "@config/pageConfig";
import { getArticles as _getArticles } from "@api/article";
let { countsPerPage, currentPage } = paginationConfig;
class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.getArticles(paginationConfig)
  }

  getArticles(paginationConfig) {
    _getArticles(paginationConfig).then(
      data => {
        if (data.code === "001") {
          const { articles, counts } = data;
          this.setState({
            articles,
            counts
          });
        }
      },
      err => console.log(err)
    );
  }

  onChange(page) {
    const paginationConfig = { countsPerPage, currentPage: page };
    this.getArticles(paginationConfig);
  }

  render() {
    let {counts} = this.state; 
    return (
      <div>
        <ArticleList articles={this.state.articles}/>
        <Pagination
          showQuickJumper
          total={counts}
          hideOnSinglePage={true}
          defaultCurrent={currentPage}
          defaultPageSize={countsPerPage}
          onChange={page => this.onChange(page)}
        />
      </div>
    );
  }
}
export default Home;
