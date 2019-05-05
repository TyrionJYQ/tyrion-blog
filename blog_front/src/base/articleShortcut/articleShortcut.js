import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class ArticleShortCut extends Component {
  render() {
    return (
      <div>{this.props.article.title}</div>
    );
  }
}

ArticleShortCut.propTypes = {
  article: PropTypes.object.isRequired
};

