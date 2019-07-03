import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {getCategories} from "@api/article";
export default class Category extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        getCategories().then(data => {
            if(data.code !== '001') {
                // 弹窗
                return;
            }
            this.setState({
                categories: data.categories
            })
        })
    }
    render() {
       
        return (
            <ul>
                {this.state.categories.map(category => 
                    <Link to={`/main/category/${category}`} key={category}>
                        <li key={category}  >{category}</li>
                    </Link>
                    )}
            </ul>
        )
        
    }
}
