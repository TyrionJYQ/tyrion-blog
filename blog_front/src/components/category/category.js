import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Tabs } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/pie';
import { getCategories } from "@api/article";
const { TabPane } = Tabs;
export default class Category extends Component {
    constructor() {
        super();
        // dddd
        // this.typeIsBarChart = null;
        // this.typeIsPieChart = null;
        this.charts = {
            typeIsBar: null,
            typeIsPie: null,
            chartsData: []
        }
        this.activeKey = 'typeIsBar';

    }

    componentDidMount() {
        let _this = this;
        getCategories().then(data => {
            if (data.code !== '001') return;
            // 基于准备好的dom，初始化echarts实例
            this.charts.chartsData = data;
            this.initChart(this.activeKey);

        })

    }
    initChart(activeKey) {
        if (this.charts[activeKey]) return;
        var _this = this;
        switch (activeKey) {
            case 'typeIsBar':
                this.charts.typeIsBar = echarts.init(document.getElementById('typeIsBar'));
                this.charts.typeIsBar.setOption({
                    title: { text: '统计结果' },
                    tooltip: {},
                    xAxis: {
                        data: _this.charts.chartsData.categories
                    },
                    yAxis: {},
                    series: [{
                        name: '文章数量',
                        type: 'bar',
                        data: _this.charts.chartsData.counts
                    }]
                });
                this.charts.typeIsBar.on('click', function (params) {
                    _this.props.history.replace(`/main/category/${params.name}`)
                });
                break;
            case 'typeIsPie':
                setTimeout(() => {
                    _this.charts.typeIsPie = echarts.init(document.getElementById('typeIsPie'));
                    var data = [];
                    _this.charts.chartsData.counts.forEach((count, index) => {
                        data.push({ value: count, name: _this.charts.chartsData.categories[index] })
                    })
                    _this.charts.typeIsPie.setOption({
                        series: [{
                            name: '文章数量',
                            type: 'pie',
                             radius: '55%',
                             data

                        }]
                    });
                    _this.charts.typeIsPie.on('click', function (params) {
                        _this.props.history.replace(`/main/category/${params.name}`)
                    });
                }, 10);

                break;
                        
        }

    }
    getActiveKey(activeKey) {
        console.log(activeKey);
        switch (activeKey) {
            case 'typeIsBar':
                this.initChart(activeKey);
                break;
            case 'typeIsPie':
                this.initChart(activeKey);
                break;

        }
    }
    render() {
        return (

            <Tabs defaultActiveKey={this.activeKey} onChange={activeKey => this.getActiveKey(activeKey)}>
                <TabPane tab="柱状图" key="typeIsBar">
                    <div id="typeIsBar" style={{ width: 400, height: 400 }}>

                    </div>
                </TabPane>
                <TabPane tab="扇形图" key="typeIsPie">
                    <div id="typeIsPie" style={{ width: 400, height: 400 }}>

                    </div>
                </TabPane>
                <TabPane tab="折线图" key="3">
                    Tab 3
            </TabPane>
            </Tabs>
        )


    }
}
