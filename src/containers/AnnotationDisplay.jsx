import React, { Component, PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { connect } from 'react-redux';

import { setSelectedLine } from '../actions/app';
import {
  getAnnotatedLines,
  getNextAnnotation,
  getPreviousAnnotation,
  hasNextAnnotation,
  hasPreviousAnnotation,
} from '../util/annotations';
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
  buttonContainer: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
  },
};

class AnnotationDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPreceedingAnnotation: false,
      hasProceedingAnnotation: false,
    };
    this.getNextAnnotation = this.getNextAnnotation.bind(this);
    this.getPreviousAnnotation = this.getPreviousAnnotation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      annotations,
      selectedLine,
    } = nextProps;
    const nextAnnotatedLines = getAnnotatedLines(annotations);
    this.setState({
      hasProceedingAnnotation: hasNextAnnotation(nextAnnotatedLines, selectedLine),
      hasPreceedingAnnotation: hasPreviousAnnotation(nextAnnotatedLines, selectedLine),
    });
  }

  getPreviousAnnotation() {
    const {
      annotations,
      dispatch,
      selectedLine,
    } = this.props;
    // Get the annotated lines
    const previous = getPreviousAnnotation(annotations, selectedLine);
    if (!previous) {
      return;
    }
    dispatch(setSelectedLine(previous.lineNumber));
  }

  getNextAnnotation() {
    const {
      annotations,
      dispatch,
      selectedLine,
    } = this.props;
    // Get the annotated lines
    const next = getNextAnnotation(annotations, selectedLine);
    if (!next) {
      return;
    }
    dispatch(setSelectedLine(next.lineNumber));
  }

  render() {
    const {
      hasPreceedingAnnotation,
      hasProceedingAnnotation,
    } = this.state;
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
        <div style={styles.buttonContainer}>
          <button
            disabled={hasPreceedingAnnotation}
            onClick={this.getPreviousAnnotation}
            type="button"
          >
            Previous
          </button>
          <button
            disabled={hasProceedingAnnotation}
            onClick={this.getNextAnnotation}
            type="button"
          >
            Next
          </button>
        </div>
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
