import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

window.onload = () => {
  document.querySelectorAll('[data-component=codesplain]')
    .forEach((node) => {
      const snippetKey = node.getAttribute('data-snippet')
      ReactDOM.render(
        <App snippetKey={snippetKey} />,
        node
      );
    });
}
