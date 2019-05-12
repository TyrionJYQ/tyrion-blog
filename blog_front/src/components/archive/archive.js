import React, { Component } from 'react';
import { Timeline } from 'antd';
import {getArticlesArchives} from '@api/article';
import {getFormatDate} from '@assets/js/utils';



class Archive extends Component {
  constructor() {
    super();
    this.state = {
      archives: []
    }
  }

  componentDidMount() {
    getArticlesArchives().then(data => {
      if(data.code === '001') {
        let {archives} = data;
        if(data.length === 0) return;
        archives.forEach((archive, index, array) => {
          //{ date: time, pattern: "yyyy-MM-dd" }
          archive.time = getFormatDate({date:archive.time,pattern: "yyyy-MM-dd"});
          let year = archive.time.slice(0, 4);
          if(array.findIndex(archive => archive === year) === -1) {
            array.splice(index, 0, year);
          }
        });
        console.log('====================>', archives)

        this.setState({archives})
      }
    }, err => console.log(err));
  }
  
  render() {
    let {archives} = this.state;
    let contents = archives.map(archive => {
      <Timeline.Item>{archive}</Timeline.Item>
    })
    return (
      <Timeline pending="Recording..." reverse={this.state.reverse}>
        {contents}
      </Timeline>

    )
  }
}
export default Archive;
