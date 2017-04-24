import React, { Component, PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { connect } from 'react-redux';

import markdownRendererOptions from '../util/markdown-renderer-options';

const styles = {
  container: {
    flex: '1 1 auto',
  },
};

class AnnotationDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      annotations,
      selectedLine,
    } = this.props;
    if (selectedLine === -1) {
      return (
        <div style={styles.container}>
          <h1>Annotation</h1>
        </div>
      );
    }

    const annotation = annotations[selectedLine + 1];
    return (
      <div style={styles.container}>
        <h1>Annotation</h1>
        <MarkdownRenderer
          markdown={annotation.annotation}
          options={markdownRendererOptions}
        />
      </div>
    );
  }
}

AnnotationDisplay.propTypes = {
  selectedLine: PropTypes.number,
}

AnnotationDisplay.defaultProps = {
  selectedLine: -1,
}

const mapStateToProps = (state) => ({
  annotations: state.annotations,
  selectedLine: state.selectedLine,
});

export default connect(mapStateToProps)(AnnotationDisplay);
