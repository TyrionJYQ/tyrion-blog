import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { Layout, Button, Row, Col, Avatar } from "antd";
import { pageHeader, userKeyNameInStorage } from "../../config/pageConfig";
import "./header.css";

const { lineHeight } = pageHeader;
const { Header } = Layout;
class MainHeader extends Component {
  constructor() {
    super();
    let user = localStorage.getItem(userKeyNameInStorage)
    this.state = {
      avatorName: (user ? user[0] : '')
    };
  }
  render() {
    let avatorName = this.state.avatorName;
    let temp = avatorName ? (
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
        <Header>
          <Col span={6}>
            <div className="logo" />
          </Col>
          <Col span={12}>
            <Menu
              theme="dark"
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

          <Col span={6} className="">
            {temp}
          </Col>
        </Header>
      </Row>
    );
  }
}

export default MainHeader;
