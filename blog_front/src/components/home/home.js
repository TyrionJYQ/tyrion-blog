import React, { Component } from 'react';
import Http from '../../assets/js/api';
class Home extends Component {
    constructor() {
      super();
      this.state = {
        articles: []
      }
    }

    componentDidMount() {
      const bizData = {
        url: '/tyrionblog/articles'
      }
      Http.get(bizData).then(data => console.log(data))
    }

    render() {
        return (
          <p>我是首页</p>
        )
    }
}
export default Home;
