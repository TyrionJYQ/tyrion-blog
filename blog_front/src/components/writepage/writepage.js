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
    this.archive = ''
    this.tags = ''
    this.title = ''
  }
  change(e) {
    this.content = e.target.value;
    console.log(this.content);
  }
  setTitle(e) {
    this.title = e.target.value
  }
  setArchive(e) {
    this.archive = e.target.value
  }
  setTags(e) {
    this.tags = e.target.value
  }
  addArticle() {
    const content = this.content
    const title = this.title
    const archive = this.archive
    const tags = this.tags
    const bizData = {
      data: {
        username: 'JYQ',
        title,
        archive,
        tags,
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
        <Input placeholder="请输入文章标题" onChange = { e => this.setTitle(e) } addonAfter="文章标题"/>
        <Input placeholder="请输入文章类别" onChange = { e => this.setArchive(e)} addonAfter="文章类别"/>
        <Input placeholder="请输入文章标签" onChange = { e => this.setTags(e)} addonAfter="文章标签"/>
        <p><Button onClick={() => this.addArticle()}>发表文章</Button></p>
      </div>
    );
  }
}

export default WritePage;
