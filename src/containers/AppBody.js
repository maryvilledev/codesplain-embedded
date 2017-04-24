import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setState } from '../actions/app';

import SnippetArea from './SnippetArea';
import AnnotationDisplay from './AnnotationDisplay';

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },
};

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
      <div style={styles.container}>
        <SnippetArea />
        <AnnotationDisplay />
      </div>

    );
  }
}

AppBody.propTypes = {
  snippetKey: PropTypes.string.isRequired,
}

export default connect()(AppBody);
