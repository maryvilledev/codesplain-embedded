import React from 'react';

const CodesplainLink = ({ snippetKey, style}) => {
  const properAddress = `https://www.codesplain.io/${snippetKey}`;
  return (
    <a href={properAddress}><h4 style={style}>{snippetKey}</h4></a>
  );
}

export default CodesplainLink;
