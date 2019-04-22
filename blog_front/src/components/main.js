import React, { Component } from 'react';
import { Layout} from 'antd';
import MainHeader from '../base/header'
import { pageHeader } from "../config/pageConfig";
const { Header, Content, Footer } = Layout;
let { lineHeight } = pageHeader;
let minHeight = 400
class Main extends Component {
    constructor() {
        super();
       
        this.state = {
            minHeight
        }
    }
    setContentHeight() {
        minHeight = document.body.offsetHeight - parseFloat(lineHeight) - 69;
        this.setState({minHeight})
    }
    componentDidMount() {
        this.setContentHeight()
        window.addEventListener('resize', () => {
           this.setContentHeight()
        })
    }
    render() {
         
        return (
            <Layout className="layout">
            <Header>
              <MainHeader lineHeight={lineHeight}/>
            </Header>
            <Content style={{ padding: '0 50px' }}>
               <div style={{ background: '#fff', padding: 24, minHeight: this.state.minHeight }}></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        )
    }
}

export default Main;
