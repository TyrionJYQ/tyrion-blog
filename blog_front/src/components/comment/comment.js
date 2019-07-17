import React, { Component } from 'react';
import { Comment, Tooltip, List, Avatar, Badge } from 'antd';
import moment from 'moment';
import { CHINESE } from '@config/moment'
moment.locale('zh-cn', CHINESE)
export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }

    }

    componentDidMount() {
        this.getListData();
    }


    getListData() {
        const data = this.props.comments.map(comment => {
            let author = comment.toUserName ? (<span title={`${comment.fromUserName}回复${comment.toUserName}`}>{comment.fromUserName}@{comment.toUserName}</span>) : comment.fromUserName
            return (
                {
                    actions: [<span>Reply to</span>],
                    author,
                    avatar: <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="small">
                        {comment.fromUserName}
                    </Avatar>,
                    content: (
                        <p>{comment.content}</p>
                    ),
                    datetime: (
                        <Tooltip
                            title={moment(comment.time).format('LLL')}
                        >
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
        return (
            <List
                className="comment-list"
                header={<div><Badge count={this.state.data.length} style={{ backgroundColor: '#52c41a' }} title={'文章评论数'} /><span>文章评论</span></div>}
                itemLayout="horizontal"
                dataSource={this.state.data}
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
