import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { getCategories } from "@api/article";
export default class Category extends Component {
    constructor() {
        super();
        // dddd

    }

    componentDidMount() {
        let _this = this;
        getCategories().then(data => {
            if (data.code !== '001') return;
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                title: { text: '统计结果' },
                tooltip: {},
                xAxis: {
                    data: data.categories
                },
                yAxis: {},
                series: [{
                    name: '文章数量',
                    type: 'bar',
                    data: data.counts
                }]
            });
            myChart.on('click', function (params) {
                _this.props.history.replace(`/main/category/${params.name}`)
            });
        })

    }
    render() {
        return (
            <div id="main" style={{ width: 400, height: 400 }}>
            </div>
        )

    }
}
