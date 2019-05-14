import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Timeline, Icon, Pagination } from "antd";
import { getArticlesArchives } from "@api/article";
import { getFormatDate } from "@assets/js/utils";
import "./archive.css";

let countsPerPage = 2,currentPage = 1;  // 分页配置
class Archive extends Component {
  constructor() {
    super();
    this.archives = [];
    this.state = {
      currentArchives: [],
      counts: 0,
      countsPerPage,
      currentPage
    };
  }
  onChange(page) {
    this.getCurrentArchives(page);
  }
  setArchivesYear(currentArchives) {
    currentArchives.forEach(
      archive =>
        (archive.time = getFormatDate({
          date: new Date(archive.time),
          pattern: "yyyy-MM-dd"
        }))
    );
    let pushYears = [];
    currentArchives.forEach((archive, index) => {
      let year = archive.time.slice(0, 4);
      if (pushYears.findIndex(pushYear => pushYear.year === year) === -1) {
        pushYears.push({ index, year });
      }
    });
    pushYears.forEach((pushYear, i) => {
      i === 0
        ? currentArchives.splice(pushYear.index, 0, pushYear.year)
        : currentArchives.splice(pushYear.index + 1, 0, pushYear.year);
    });
    return currentArchives;
  }

  getCurrentArchives(currentPage) {
    let currentArchives,archives = this.archives.slice();
    if (currentPage === 1) {
      currentArchives = archives.splice(0, countsPerPage);
    } else {
      var spliceStartIndex = countsPerPage * (currentPage - 1)  ;
      currentArchives = archives.splice(spliceStartIndex, countsPerPage);
    }
    currentArchives = this.setArchivesYear(currentArchives);
    this.setState({ currentArchives });
  }

  componentDidMount() {
    getArticlesArchives().then(
      data => {
        if (data.code === "001") {
          let { archives } = data;
          if (data.length === 0) return;
          this.archives = archives;
          this.getCurrentArchives(currentPage);
          this.setState({ archives, counts: archives.length });
        }
      },
      err => console.log(err)
    );
  }

  render() {
    let { currentArchives, counts } = this.state;
    console.log(currentArchives);
    return (
      <div id="archive">
        <Timeline pending="Recording..." reverse={this.state.reverse}>
          {currentArchives.map((archive, index) =>
            archive.id ? (
              <Timeline.Item key={index} className="article">
                <Link to={`/main/article/${archive.id}`}>{`${archive.time.slice(
                  5
                )}   ${archive.title}`}</Link>
              </Timeline.Item>
            ) : (
              <Timeline.Item
                key={index}
                className="year"
                dot={<Icon type="calendar" style={{ fontSize: "16px" }} />}
              >
                {archive}
              </Timeline.Item>
            )
          )}
        </Timeline>
        <Pagination
          showQuickJumper
          total={counts}
          hideOnSinglePage={true}
          defaultCurrent={currentPage}
          defaultPageSize={countsPerPage}
          onChange={page => this.onChange(page)}
        />
      </div>
    );
  }
}
export default Archive;
