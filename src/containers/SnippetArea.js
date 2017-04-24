import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setSelectedLine } from '../actions/app';

import Editor from '../components/Editor';

class SnippetArea extends Component {
  constructor(props) {
    super(props);
    this.handleGutterClick = this.handleGutterClick.bind(this);
  }

  handleGutterClick(line) {
    const { dispatch } = this.props;
    dispatch(setSelectedLine(line));
  }

  render() {
    const {
      snippet,
      title,
      language,
      annotations,
    } = this.props;
    const markedLines = Object.keys(annotations).map(key => Number(key));

    return (
      <div>
        <h1>{title}</h1>
        <h3>A {language} snippet</h3>
        <Editor
          snippet={snippet}
          markedLines={markedLines}
          onGutterClick={this.handleGutterClick}
          language={language}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snippet:  state.snippet,
  title:    state.snippetTitle,
  language: state.snippetLanguage,
  annotations: state.annotations,
});

export default connect(mapStateToProps)(SnippetArea);
