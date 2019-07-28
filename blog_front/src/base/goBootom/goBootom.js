import React, { Component } from "react";
import { Icon } from 'antd';
import './goBootom.css'
export default class GoBootom extends Component {
    constructor() {
        super();
        this.state = {
            isShowIcon: true
        }
        this.BASE_HEIGHT = 1000;
    }
    hasScrollbar() {
        let isShowIcon = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
        let pos = window.pageYOffset ||document.documentElement.scrollTop;
        isShowIcon = (document.body.scrollHeight - pos) > this.BASE_HEIGHT
        this.setState({
            isShowIcon
        })
    }

    goBootom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.hasScrollbar(), false);
        window.addEventListener('scroll', () => this.hasScrollbar(), false)
    }

    render() {
        let content = this.state.isShowIcon ? <div className="ant-back-top blog-back-top" onClick={() => this.goBootom()}>
            <div className="ant-back-top-content">
                <div className="ant-back-top-icon"></div>
            </div>
        </div> :
            <span style={{ display: 'none' }}></span>

        return (
            content
            
        )

    }
}