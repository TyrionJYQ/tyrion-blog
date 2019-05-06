import React, { Component } from "react";


import {Input, Button} from 'antd';

import Http from '../../assets/js/api';
const { TextArea } = Input;
class WritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.content = ''
  }
  change(e) {
    this.content = e.target.value;
    console.log(this.content);
  }
  addArticle() {
    const content = this.content
    const bizData = {
      data: {
        username: 'JYQ',
        title: '第一篇提交文章',
        archive: 'es6',
        tags: 'js',
        content
      },
      url: '/tyrionblog/articles/newArticle'
    }
    Http.post(bizData).then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <TextArea rows={4} onChange={ e => this.change(e)}/>   
        <p><Button onClick={() => this.addArticle()}>发表文章</Button></p>
      </div>
    );
  }
}

export default WritePage;
