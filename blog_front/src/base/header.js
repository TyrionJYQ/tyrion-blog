import React, { Component } from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
// import { pageHeader } from "../config/pageConfig";
// const { lineHeight } = pageHeader;
class MainHeader extends Component {
  render() {
    return (
      <div>
        <div className="logo">tyrion-blog</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight:this.props.lineHeight }}
        >
          <Menu.Item key="1">
            <Link to="/main/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="2">
          <Link to="/main/categories">分类</Link>
          </Menu.Item>
          <Menu.Item key="3">
          <Link to="/main/about">关于</Link>
          </Menu.Item>
          <div style={{ float: "right" }}>
            <Button type="primary">
              <Link to="/login">登录</Link>
            </Button>
            <Button>
              <Link to="/register">注册</Link>
            </Button>
          </div>
        </Menu>
      </div>
    );
  }
}

export default MainHeader;
