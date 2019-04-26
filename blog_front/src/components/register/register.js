import React from 'react';
import {
  Form, Input, Tooltip, Icon,  Row, Col,  Button, message
} from 'antd';
import Http from '../../assets/js/api'
import './register.css';


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    v_code: ''
  };

  componentDidMount() {
    this.getV_code()
  }

  getV_code() {
    let bizData = {
      url: 'tyrionblog/user/v_code'
    }
    Http.get(bizData).then(data => this.setState({v_code: data.v_code}), err => console.log(err))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.doRegister(values);
      }
    });
  }
  doRegister = userInfo => {
    let bizData = {
      data: userInfo,
      url: '/tyrionblog/user/userRegister'
    }
    Http.post(bizData)
    .then(data => {
      if(data.code !== '001') return message.error(data.msg);
      this.props.history.push('/login')
    }, err => {
      message.error('出错了，程序员小哥正在坐火箭赶来!')
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="form-wrapper">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="width60 center-l40">
        <Form.Item
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '不是正确格式的邮箱账号',
            }, {
              required: true, message: '请输入邮箱账号',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请输入密码确认',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              用户名&nbsp;
              <Tooltip title="您在本网站的昵称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="验证码"
          extra="确认您不是机器人"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('v_code', {
                rules: [{ required: true, message: '请输入右侧数字验证码' }],
              })(
                <Input />
              )}
            </Col>
            <Col span={12}>
              <Button onClick={() => this.getV_code() }>{this.state.v_code}</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">注册</Button>
        </Form.Item>
      </Form>
      </div>
    );
  }        
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;