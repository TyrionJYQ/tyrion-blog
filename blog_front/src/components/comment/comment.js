import React, { Component } from 'react';
import { Comment, Tooltip, List, Avatar, Badge, Button, } from 'antd';
import moment from 'moment';
import { CHINESE } from '@config/moment';
import MyButton from '@base/blog-button/blog-button';
moment.locale('zh-cn', CHINESE)
export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            color: 'rgb(253, 227, 207)',
            isShowMoreComments: false,
            buttonInfo: {
                text: '更多评论',
                iconType: 'down'
                // text: this.state.isShowMoreComments ? '更多评论' : '收起评论'
            }
        }

    }

    componentDidMount() {
        this._getListData();
    }

    toggleShowMore() {
        this.state.isShowMoreComments = !this.state.isShowMoreComments
        this.state.isShowMoreComments && this.setState({
            buttonInfo: { text: '收起评论', iconType: 'up' }
        });
        !this.state.isShowMoreComments && this.setState({
            buttonInfo: { text: '更多评论', iconType: 'down' }
        });


        this._getListData();

    }

    _getListData() {

        let comments = !this.state.isShowMoreComments ? this.props.comments.concat().splice(0, 1) : this.props.comments.concat();
        const data = comments.map(comment => {
            let author = comment.toUserName ? (<span title={`${comment.fromUserName}回复${comment.toUserName}`} >
                <span className="color-black font-bold">{comment.fromUserName}</span> 回复 <span className="color-black font-bold">{comment.toUserName}</span></span>) : <span className="color-black font-bold">{comment.fromUserName}</span>
            return (
                {
                    actions: [<span>Reply to</span>],
                    author,
                    avatar: <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle', color: 'rgb(245, 106, 0)' }} size="small">
                        {comment.fromUserName}
                    </Avatar>,
                    content: (
                        <p>{comment.content}</p>
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

        this.setState({ data });
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
            <List
                className="comment-list"
                style={{ 'backgroundColor': '#f5f5f5', 'padding': '10px', 'borderRadius': '8px' }}
                header={<div><Badge count={this.props.comments.length} style={{ backgroundColor: '#52c41a' }} title={'文章评论数'} /><span style={{ 'margin': '0 0 0 12px' }}>文章评论</span></div>}
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
        )
    }
}
