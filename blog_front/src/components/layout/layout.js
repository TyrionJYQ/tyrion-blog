import React, { Component } from 'react';
import { Layout } from 'antd';
import MainHeader from '../../base/header'
import { routes } from '../../routes/router'
import { Route } from 'react-router-dom'
import { pageHeader } from '../../config/pageConfig'
const { Header, Content, Footer } = Layout;

class BlogLayout extends Component {
  constructor() {
    super();
    this.state = {
      minHeight: 300
    }
  }
  initHeight() {
    let minHeight, {lineHeight} = pageHeader;
    minHeight = document.body.offsetHeight - parseFloat(lineHeight) - 61;
    this.setState({
      minHeight
    })
    
  }
  componentDidMount() {
    this.initHeight();
    window.addEventListener('resize', () => {
      this.initHeight()
    }, false)
  }


  render() {
    return (
      <Layout className="layout">
        <Header>
          <MainHeader />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: this.state.minHeight}}>
            {
              routes.map(({ path, key, component, ...props }) => (
                <Route key={key}
                  exact
                  path={path}
                  component={component}
                  {...props}
                />
              ))
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}
export default BlogLayout;
