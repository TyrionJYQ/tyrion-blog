import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { Layout, Button, Row, Col, Avatar, Popconfirm } from "antd";
import Logo from '../logo/logo'
import { pageHeader, userKeyNameInStorage } from "../../config/pageConfig";
import Http from '../../assets/js/api'
import "./header.css";

const { lineHeight } = pageHeader;
const { Header } = Layout;
class MainHeader extends Component {
  constructor() {
    super();
    let user = localStorage.getItem(userKeyNameInStorage)
    this.state = {
      visible: false,
      avatorName: (user ? user[0] : ''),
      theme: 'light'
    };
  }
  setVisible(isShow) {
    this.setState({visible: isShow})
  }
  logout() {
    console.log(this.props)
    let bizData = {
      url: '/tyrionblog/user/userLogout'
    };
    Http.post(bizData).then(data => {
      (data.code === '001') && this.props.history.push('/login')
    })

  }
  render() {
    let avatorName = this.state.avatorName;
    let user = avatorName ? (
      <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
        {avatorName}
      </Avatar>
    ) : (
        <div>
          <Button type="primary" className="mr20 ">
            <Link to="/login">登录</Link>
          </Button>
          <Button type="primary">
            <Link to="/register">注册</Link>
          </Button>
        </div>
      );
    return (
      <Row>
        <Header style={{ backgroundColor: '#fff' }}>
          <Col span={3}>
            <Logo />
          </Col>
          <Col span={18} >
            <Menu
              theme={this.state.theme}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight }}
            >
              <Menu.Item key="1">
                <Link to="/main/home">首页</Link>
              </Menu.Item>


              <Menu.Item key="2">
                <Link to="/main/archive">分类</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/main/about">关于</Link>
              </Menu.Item>
            </Menu>
          </Col>

          <Col span={3} style={{ textAlign: 'right' }}>
            <Popconfirm title="退出登录?"
              visible={this.state.visible}
              onConfirm={() => this.logout()}
              onCancel={() => this.setVisible(false)}
              onMouseEnter={e => this.setVisible(true)}
              onClick = {() => this.setVisible(!this.state.visible)}
              okText="是" cancelText="否">
              {user}
            </Popconfirm>,
          </Col>
        </Header>
      </Row>
    );
  }
}

export default MainHeader;
