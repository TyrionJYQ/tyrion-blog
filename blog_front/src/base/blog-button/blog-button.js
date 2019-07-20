import React, { Component } from "react";
import { Button, Icon } from "antd";
import "./blog-button.css";

export default class MyButton extends Component {
    constructor() {
        super();
    }
    
    render() {
        const {text, iconType} = this.props.buttonInfo;
        return (
            <div id="my-button">
                <Button id="blog-btn" onClick={() => this.props.click && this.props.click()}>
                  {text}  {<Icon type={iconType} />}
                </Button>
            </div>
        )
    }
}

