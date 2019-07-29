import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { Layout, Button, Row, Col, Avatar, Popconfirm } from "antd";
import { pageHeader, userKeyNameInStorage } from "@config/pageConfig";
import { doLogout } from '@api/user';
import Logo from '../logo/logo';
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
    doLogout().then(data => {
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
        <Header style={{ backgroundColor: '#fff', position: 'fixed', zIndex: 1, width: '100%' }}>
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
                <Link to="/main/archive">归档</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/main/category">分类</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/main/about">关于</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/main/write">写文章</Link>
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
