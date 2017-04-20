import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

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
        options={codeMirrorOption s}
        value={this.props.snippet}
      />
    );
  }
}

export default Editor;
