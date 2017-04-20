import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

const codeMirrorOptions = {
  lineNumbers: true,
  lineWrapping: true,
  gutters: ['annotations', 'CodeMirror-linenumbers'],
};

const makeMarker = () => {
  const marker = document.createElement('div');
  marker.style.color = '#822';
  marker.innerHTML = '●';
  return marker;
};

const pushValueToCodeMirror = (value, codeMirror) => {
  if (codeMirror.getValue() === '' && value !== '') {
    codeMirror.setValue(value);
  }
};

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const {
      markedLines,
      openLine,
      AST,
      filters,
      snippet,
    } = this.props;

    const codeMirror = this.codeMirror.getCodeMirror();

    pushValueToCodeMirror(snippet, codeMirror);

    markedLines.forEach((lineNumber) => {
      codeMirror.setGutterMarker(Number(lineNumber), 'annotations', makeMarker());
    });
  }

  render() {
    return (
      <CodeMirror
        options={codeMirrorOptions}
        value={this.props.snippet}
        ref={cm => this.codeMirror = cm}
      />
    );
  }
}

export default Editor;
