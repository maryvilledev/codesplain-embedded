import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';

const codeMirrorOptions = {
  lineNumbers: true,
  lineWrapping: true,
};

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CodeMirror
        options={codeMirrorOptions}
        value={this.props.snippet}
      />
    );
  }
}

export default Editor;
