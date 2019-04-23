import React, { Component } from "react";
import {Menu } from 'antd';
import {Link} from 'react-router-dom';
import {pageHeader} from '../config/pageConfig'
const {lineHeight} = pageHeader;
class MainHeader extends Component {
  render() {
    return (
      <div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
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
      </div>
    );
  }
}

export default MainHeader;
