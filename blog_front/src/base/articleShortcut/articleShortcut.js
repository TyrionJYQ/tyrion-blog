import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Button, Icon, Divider} from 'antd';
import {getFormatDate} from '../../assets/js/utils'
import './articleShortcut.css'
export default class ArticleShortCut extends Component {
  render() {
    let { content, title, time} = this.props.article;
    time = getFormatDate({date:time, pattern:'yyyy-MM-dd'});
    let index = content.indexOf('readmore');
    // 文章截取标志
    (index > -1) && (content = content.slice(0, index));
    return (
      <div className="article-short">
        <div >
          <h1 className="text-center">{title}</h1>
          <div className="text-center">
            <Icon type="calendar" style={{marginRight: 10}}/> 
            <span style={{color: '#999'}}>发表于{time}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} style={{marginTop: 40}}></div>
        </div>
        <div className="text-center mb60 mt40">
          <Button className="hover-btn">Read More <Icon type="double-right" /></Button>
        </div>
        <Divider style={ {width: 60, minWidth: 40, textAlign: 'center'}} className="h-center"></Divider>
      </div>
    );
  }
}

ArticleShortCut.propTypes = {
  article: PropTypes.object.isRequired
};

