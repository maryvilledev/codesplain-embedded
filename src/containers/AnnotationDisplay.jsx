import React, { Component, PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { connect } from 'react-redux';

import markdownRendererOptions from '../util/markdown-renderer-options';

const styles = {
  container: {
    flex: '1 1 auto',
    flexBasis: '50%', // "default width"
    paddingLeft: '15px',
  },
  markdownContainer: {
    background: '#fff',
    padding: '10px',
    borderRadius: '5px',
  },
};

class AnnotationDisplay extends Component {
  render() {
    const {
      annotations,
      selectedLine,
    } = this.props;
    if (selectedLine === -1) {
      return (
        <div style={styles.container}>
          <h2>Annotation</h2>
        </div>
      );
    }
    const annotation = annotations[selectedLine];
    return (
      <div style={styles.container}>
        <h2>Annotation</h2>
        <div style={styles.markdownContainer}>
          <MarkdownRenderer
            markdown={annotation.annotation}
            options={markdownRendererOptions}
          />
        </div>
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
