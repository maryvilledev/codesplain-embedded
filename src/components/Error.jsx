import React, { PropTypes } from 'react';

const style = {
  backgroundColor: '#FF8080',
  textAlign: 'center',
  padding: '10px',
  paddingBottom: '20px',
  borderRadius: '50px',
}

const Error = ({ snippetKey }) => (
  <div style={style}><h1>Codesplain Error</h1>Could not load {snippetKey}.</div>
)

export default Error;
