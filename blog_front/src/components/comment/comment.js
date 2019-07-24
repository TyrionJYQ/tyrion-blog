import React, { Component } from 'react';
import { Comment, Tooltip, List, Avatar, Badge, Popover, Icon } from 'antd';
import moment from 'moment';
import { CHINESE } from '@config/moment';
import MyButton from '@base/blog-button/blog-button';
import AddComment from '@components/addComment/addComment';
import "./comment.css";
// 点击回复文本，计算元素位置， 添加ping

moment.locale('zh-cn', CHINESE)
export default class Comments extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      color: 'rgb(253, 227, 207)',
      buttonInfo: {
        text: '更多评论',
        iconType: 'down'
      },
      visible: true
    }
    this.isShowMoreComments = false;
    this.commentTarget = ''

  }

  componentDidMount() {
    this._getListData(this.isShowMoreComments, this.state.buttonInfo);
    this.props.onRef(this);
  }
  commentClick(e) {
    this.commentTarget = e.target;
  }

  toggleShowMore() {
    this.isShowMoreComments = !this.isShowMoreComments;
    let buttonInfo;
    if (this.isShowMoreComments) {
      buttonInfo = { text: '收起评论', iconType: 'up' }
    } else {
      buttonInfo = { text: '更多评论', iconType: 'down' }
    }
    this._getListData(this.isShowMoreComments, buttonInfo);
  }
  _getListData(isShowMoreComments, buttonInfo) {
    if (typeof isShowMoreComments !== 'boolean') {
      isShowMoreComments = this.isShowMoreComments;
      buttonInfo = this.state.buttonInfo;
    }
    let comments = !isShowMoreComments ? this.props.comments.concat().splice(0, 1) : this.props.comments.concat(),
      { id, success } = this.props;
    const data = comments.map(comment => {
      let author = comment.toUserName ? (<span title={`${comment.fromUserName}回复${comment.toUserName}`} >
        <span className="color-black font-bold" >{comment.fromUserName}</span> 回复 <span className="color-black font-bold">{comment.toUserName}</span></span>) : <span className="color-black font-bold">{comment.fromUserName}</span>
      return (
        {
          actions: [<Popover content={<AddComment toUserName={comment.fromUserName}
            id={id}
            success={success} />}
            trigger="click"
            placement="topLeft">
            <span onClick={e => this.commentClick(e)}>回复</span>

          </Popover >],
          author,
          avatar: <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle', color: 'rgb(245, 106, 0)' }} size="small">
            {comment.fromUserName}
          </Avatar>,
          content: (
            <div style={{position: 'relative'}}>
              <span className="triangle-up"></span>
              <p className="comment-content">{comment.content}</p>
            </div>
          ),
          datetime: (
            <Tooltip
              title={moment(comment.time).format('LLL')}>
              <span>
                {moment(new Date(comment.time), 'dddd, MMMM Do YYYY, h:mm:ss ').fromNow()}
              </span>
            </Tooltip>
          ),
        }
      )
    });
    // 按钮文本和展示的data放在同一个setState方法中，以减少reRender的次数
    this.setState({ data, buttonInfo });
  }
  render() {
    const { buttonInfo } = this.state
    const loadMore = this.props.comments.length > 3 ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >

        <MyButton click={this.toggleShowMore.bind(this)} buttonInfo={buttonInfo}></MyButton>
      </div>
    ) : null
    return (
      <div>
        <List
          className="comment-list"
          style={{ 'backgroundColor': '#f5f5f5', 'padding': '10px', 'borderRadius': '8px' }}
          header={<div><Badge count={this.props.comments.length} style={{ backgroundColor: '#52c41a' }} title={'文章评论数'} /><span style={{ 'margin': '0 0 0 12px' }}>评论</span></div>}
          itemLayout="horizontal"
          dataSource={this.state.data}
          loadMore={loadMore}
          renderItem={item => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>
    )
  }
}
