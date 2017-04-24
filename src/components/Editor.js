import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';

import highlight from '../lib/highlight';

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

    this.handleGutterClick = this.handleGutterClick.bind(this);
  }

  componentDidMount() {
    const codeMirror = this.codeMirror.getCodeMirror();
    codeMirror.on('gutterClick', this.handleGutterClick);
  }

  componentDidUpdate() {
    const {
      markedLines,
      AST,
      filters,
      snippet,
      language
    } = this.props;

    const codeMirror = this.codeMirror.getCodeMirror();

    pushValueToCodeMirror(snippet, codeMirror);

    markedLines.forEach((lineNumber) => {
      codeMirror.setGutterMarker(Number(lineNumber), 'annotations', makeMarker());
    });
    highlight(codeMirror, AST, filters, language);
  }

  handleGutterClick(instance, lineNumber) {
    const { onGutterClick } = this.props;
    const lineText = instance.getLine(lineNumber);
    onGutterClick(lineNumber, lineText);
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
