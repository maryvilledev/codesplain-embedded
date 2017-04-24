import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import { connect } from 'react-redux';

class AnnotationDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      annotations,
      selectedLine,
    } = this.props;

    const annotation = annotations[selectedLine];

    return (
      <div>
        <MarkdownRenderer
          markdown={annotation ? annotation.annotation : ''}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  annotations: state.annotations,
  selectedLine: state.selectedLine,
});

export default connect(mapStateToProps)(AnnotationDisplay);
