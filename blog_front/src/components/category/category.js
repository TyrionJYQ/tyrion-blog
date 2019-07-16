import React, { Component } from "react";
import { Tabs } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import { getCategories } from "@api/article";
const { TabPane } = Tabs;
export default class Category extends Component {
  constructor() {
    super();
    this.charts = {
      typeIsBar: null,
      typeIsPie: null,
      typeIsLine: null,
      chartsData: []
    }
    this.activeKey = 'typeIsBar';

  }

  componentDidMount() {
    getCategories().then(data => {
      if (data.code !== '001') return;
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
        console.log(_this.charts.chartsData.categories)
        setTimeout(() => {
          _this.charts.typeIsPie = echarts.init(document.getElementById('typeIsPie'));
          var data = [];
          _this.charts.chartsData.counts.forEach((count, index) => {
            data.push({ value: count, name: _this.charts.chartsData.categories[index] })
          })
          console.log(data);
          _this.charts.typeIsPie.setOption({
            title: {
              text: '统计结果',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            legend: {
              orient: 'vertical',
              left: 'left',
              data: _this.charts.chartsData.categories

            },

            series: [{
              name: '文章数量',
              type: 'pie',
              radius: '55%',
              data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }

            }]
          });
          _this.charts.typeIsPie.on('click', function (params) {
            _this.props.history.replace(`/main/category/${params.name}`)
          });
        }, 10);

        break;
      case 'typeIsLine':
        setTimeout(() => {
          _this.charts.typeIsLine = echarts.init(document.getElementById('typeIsLine'));
          const option = {
            title: {
              text: '统计结果',
              x: 'center'
            },
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['文章统计']

            },
            xAxis: {
              type: 'category',
              data: _this.charts.chartsData.categories
            },
            yAxis: {
              type: 'value'
            },
            series: {
              name: '文章统计',
              type: 'line',
              data: _this.charts.chartsData.counts
            }

          }
          _this.charts.typeIsLine.setOption(option);
          _this.charts.typeIsLine.on('click', function (params) {
            _this.props.history.replace(`/main/category/${params.name}`)
          });
        }, 10);
        break;
      default:
        break;

    }

  }
  getActiveKey(activeKey) {
    this.initChart(activeKey);

  }
  render() {
    return (
      <Tabs defaultActiveKey={this.activeKey} onChange={activeKey => this.getActiveKey(activeKey)}>
        <TabPane tab="柱状图" key="typeIsBar">
          <div id="typeIsBar" style={{ width: 400, height: 400 }}> </div>
        </TabPane>
        <TabPane tab="扇形图" key="typeIsPie">
          <div id="typeIsPie" style={{ width: 400, height: 400 }}> </div>
        </TabPane>
        <TabPane tab="折线图" key="typeIsLine">
          <div id="typeIsLine" style={{ width: 400, height: 400 }}></div>
        </TabPane>
      </Tabs>
    )
  }
}
