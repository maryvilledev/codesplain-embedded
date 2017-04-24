import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setState } from '../actions/app';

import AnnotationDisplay from './AnnotationDisplay';
import SnippetArea from './SnippetArea';

class AppBody extends Component {
  componentDidMount() {
    const { dispatch, snippetKey } = this.props;
    axios.get("../snippet.json")
      .then((res) => {
        dispatch(setState(res.data));
      });
  }
  render() {
    return (
      <div>
        <SnippetArea />
        <AnnotationDisplay />
      </div>

    );
  }
}

AppBody.propTypes = {
  snippetKey: PropTypes.string.required,
}

export default connect()(AppBody);
