import React, { Component } from "react";
import { Button, Icon } from "antd";


export default class MyButton extends Component {
    constructor() {
        super();
    }
    
    render() {
        const {text, iconType} = this.props.buttonInfo;
        return (
            <div id="blog-btn">
                <Button onClick={() => this.props.click && this.props.click()}>
                  {text}  {<Icon type={iconType} />}
                </Button>
            </div>
        )
    }
}

