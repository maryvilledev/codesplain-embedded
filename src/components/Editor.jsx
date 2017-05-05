import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';

import highlight, {styleAll, styleLine} from '../util/highlight';

const codeMirrorOptions = {
  lineNumbers: true,
  lineWrapping: true,
  gutters: ['annotations', 'CodeMirror-linenumbers'],
  readOnly: true,
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
    this.emphasizeLine = this.emphasizeLine.bind(this);
    this.deEmphasize = this.deEmphasize.bind(this);
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
      language,
      openLine
    } = this.props;

    const codeMirror = this.codeMirror.getCodeMirror();

    pushValueToCodeMirror(snippet, codeMirror);
    this.deEmphasize(codeMirror);
    if (openLine !== undefined) { //Can't just say openLine because javascript
                                  //thinks 0 is falsey
      this.emphasizeLine(codeMirror, openLine)
    }
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

  emphasizeLine(codeMirror, line) {
    // Fade out the background
    const backgroundCSS = 'opacity: 0.5; font-weight: normal;';
    styleAll(codeMirror, backgroundCSS);

    // Bold the passed-in line
    const foregroundCSS = 'font-weight: bold; opacity: 1.0;';
    styleLine(codeMirror, line, foregroundCSS);
  }
  deEmphasize(codeMirror) {
    const css = 'font-weight: normal; opacity: 1.0;';
    styleAll(codeMirror, css);
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
