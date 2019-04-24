import React, { Component } from 'react';
import Http from '../../assets/js/api'
import './login.css'

import {
  Form, Icon, Input, Button, Checkbox,message
} from 'antd';

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) this.doLogin(values);
    });
  }
  doLogin(userInfo) {
    let bizData = {
      data: userInfo,
      url: '/tyrionblog/user/userLogin'
    }
    Http.post(bizData)
    .then(data => {
      if(data.code !== '001') return message.error(data.msg);
      this.props.history.push('/main/home')
    }, err => {
      message.error('出错了，程序员小哥正在坐火箭赶来!')
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-wrapper">
      <Form onSubmit={this.handleSubmit} className="login-form center">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>保持登录</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="">去注册</a>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;