import React, { Component } from "react";
import MarkdownIt from 'markdown-it';

const mock_content = "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it."


export default class Article extends Component {

  render() {
    const wrapper = document.createElement('div')
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true})
    var result = md.render(mock_content)
    wrapper.innerHTML = result;
    return (
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    )
  }
}



