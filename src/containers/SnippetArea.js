import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Editor from '../components/Editor';

class SnippetArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { snippet, title, language } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h3>A {language} snippet</h3>
        <Editor
          snippet={snippet}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snippet:  state.snippet,
  title:    state.snippetTitle,
  language: state.snippetLanguage,
});

export default connect(mapStateToProps)(SnippetArea);
