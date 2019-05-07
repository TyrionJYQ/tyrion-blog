import React, { Component } from 'react';
import { Layout, BackTop} from 'antd';
import MainHeader from '@base/header/header';
import MainFooter from '@base/footer/footer'
import { routes } from '../../routes/router'
import { Route } from 'react-router-dom'
import { pageHeader, footHeight, contentMarginTop } from '../../config/pageConfig'

const { Content } = Layout;

class BlogLayout extends Component {
  constructor() {
    super();
    this.state = {
      minHeight: 300
    }
  }
  initHeight() {
    let minHeight, { lineHeight } = pageHeader;
    minHeight = document.body.offsetHeight - parseFloat(lineHeight) - parseFloat(footHeight) - 2 - contentMarginTop;
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
    const {minHeight} = this.state
    return (
      <Layout className="layout">
        <BackTop />
        <MainHeader history={this.props.history}/>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight, marginTop: contentMarginTop}}>
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
        <MainFooter />

      </Layout>
    )
  }
}
export default BlogLayout;
