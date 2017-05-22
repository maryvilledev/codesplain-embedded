import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setSelectedLine } from '../actions/app';

import Editor from '../components/Editor';

const styles = {
  container: {
    flex: '1 1 auto',
    flexBasis: '50%', // "default width"
    marginTop: '30px',
  },
};

export class SnippetArea extends Component {
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
      language,
      annotations,
      AST,
      filters,
      openLine
    } = this.props;
    const markedLines = Object.keys(annotations).map(key => Number(key));

    return (
      <div style={styles.container}>
        <Editor
          snippet={snippet}
          markedLines={markedLines}
          onGutterClick={this.handleGutterClick}
          language={language}
          AST={AST}
          filters={filters}
          openLine={openLine}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snippet:  state.snippet,
  language: state.snippetLanguage,
  annotations: state.annotations,
  AST: state.AST,
  filters: state.filters,
  openLine: state.selectedLine
});

export default connect(mapStateToProps)(SnippetArea);
