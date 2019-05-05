import React, { Component } from 'react';
import ArticleList from '../articleList/articleList'

class Home extends Component {
    constructor() {
      super();
      this.state = {
        articles: []
      }
    }

    componentDidMount() {
     
    }

    render() {
        return (
          <ArticleList/>
        )
    }
}
export default Home;
