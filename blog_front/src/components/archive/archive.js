import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Timeline, Icon } from 'antd';
import {getArticlesArchives} from '@api/article';
import {getFormatDate} from '@assets/js/utils';
import './archive.css';


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
        archives.forEach(archive => archive.time = getFormatDate({date:new Date(archive.time),pattern: "yyyy-MM-dd"}));
        let pushYears = []; 
        archives.forEach((archive, index, array) => {
          let year = archive.time.slice(0, 4);
          if(pushYears.findIndex(pushYear => pushYear.year === year) === -1) {
            pushYears.push({index,year})
          }
        });
        pushYears.forEach((pushYear,i) => {
          i === 0 ? archives.splice(pushYear.index, 0, pushYear.year) : archives.splice((pushYear.index+1), 0, pushYear.year)
        })
        this.setState({archives})
      }
    }, err => console.log(err));
  }
  
  render() {
    let {archives} = this.state;
    return (
      <div id="archive">
        <Timeline pending="Recording..." reverse={this.state.reverse}>
          {
            archives.map((archive,index) => archive.id ? 
              <Timeline.Item key={index} className="article">
                <Link to={`/main/article/${archive.id}`}>{`${archive.time.slice(5)}   ${archive.title}`}</Link>
              </Timeline.Item>
              : <Timeline.Item 
                  key={index} 
                  className="year" 
                  dot={<Icon type="calendar" 
                  style={{ fontSize: '16px' }} />}>
                  {archive}
                </Timeline.Item>

            )
          }
        </Timeline>
      </div>

    )
  }
}
export default Archive;
