import React, { Component } from 'react';
import {getArticlesArchives} from '@api/article';
class Archive extends Component {
  constructor() {
    super();
    this.state = {
      archives: []
    }
  }

  componentDidMount() {
    getArticlesArchives().then(data => {
      if(data.code === '001') {
        this.setState({archives:data.archives})
      }
    }, err => console.log(err))
  }
  
  render() {
    return (
      <p>{this.state.archives}</p>
    )
  }
}
export default Archive;
