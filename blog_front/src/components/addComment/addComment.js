import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { addNewComment } from '@api/comment'
const { TextArea } = Input;

export default class AddComment extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      value: '',
    };
  }
  
  componentDidMount() {
    this.props.getAddComponent && this.props.getAddComponent(this);
  }
  
  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onSubmit() {
    if (!this.state.value.trim()) {
      return;
    }

    this.setState({
      submitting: true,
    });
    let _this = this;
    let commentInfo = {
      id: this.props.id,
      toUserName: this.props.toUserName,
      fromUserName: localStorage.getItem('tyrionblogUser'),
      content: this.state.value,
      time: Date.now(),
      commentId: `${this.props.id}${localStorage.getItem('tyrionblogUser')}${Date.now()}`
    }
    addNewComment(commentInfo).then(data => {
      if (data.code === '001') {
        _this.setState({
          submitting: false,
          value: ''
        })
        _this.props.success(commentInfo);
      }
    }, err => console.log(err))

  }
  render() {
    return (
      <div >
        <Form.Item>
          <TextArea rows={4}
            onChange={e => this.handleChange(e)}
            value={this.state.value}
            onPressEnter={() => this.onSubmit()}
            placeholder="shift+enter换行,按下enter发送评论" />
        </Form.Item>
      </div>
    )
  }
}