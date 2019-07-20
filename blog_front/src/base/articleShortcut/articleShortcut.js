import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon, Divider, Tag } from "antd";
import { getFormatDate } from "@assets/js/utils";
import { articleConfig } from "@config/pageConfig";
import MyButton from '@base/blog-button/blog-button'
import "./articleShortcut.css";

const { articleArchiveTagColor } = articleConfig;
class ArticleShortCut extends Component {
  constructor() {
    super()
    this.buttonInfo = 
      {text: '阅读更多', iconType: 'double-right'}
    
  }
  render() {
    let { content, title, time, id, category } = this.props.article;
    time = getFormatDate({ date: time, pattern: "yyyy-MM-dd" });
    let index = content.indexOf("<!--readmore-->");
    // 文章截取标志
    index > -1 && (content = content.slice(0, index));
    return (
      <div className="article-short">
        <div>
          <h1 className="text-center">{title}</h1>
          <div className="text-center">
            <Icon type="calendar" style={{ marginRight: 10 }} />
            <span style={{ color: "#999" }}>发表于{time}</span>
            <Divider type="vertical" />
            <Tag color={articleArchiveTagColor}>{category}</Tag>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ marginTop: 40 }}
          />
        </div>
        <div className="text-center mb60 mt40">
          <Link to={`/main/article/${id}`}>
            <MyButton buttonInfo = {this.buttonInfo}></MyButton>
          </Link>
        </div>
        <Divider
          style={{ width: 60, minWidth: 40, textAlign: "center" }}
          className="h-center"
        />
      </div>
    );
  }
}
export default withRouter(ArticleShortCut);
ArticleShortCut.propTypes = {
  article: PropTypes.object.isRequired
};
