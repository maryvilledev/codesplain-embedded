import React from 'react';

const CodesplainLink = ({ snippetKey }) => {
  const properAddress = `https://www.codesplain.io/${snippetKey}`;
  return (
    <a href={properAddress}>{snippetKey}</a>
  );
}

export default CodesplainLink;
