import React, { Component } from "react";
import { Layout } from 'antd';
import {footHeight} from '../../config/pageConfig';
const { Footer } = Layout;
 class MainFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center', height: footHeight, lineHeight: '32px'}}>
       Copyright©2019  tyrion-blog All Rights Reserved
     </Footer>
    )
  }
}
export default MainFooter;

