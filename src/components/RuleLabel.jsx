import React, { PropTypes } from 'react';

const styles = {
  countSpan: {
    color: '#666666',
    display: 'block',
    float: 'right',
  },
  label: {
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '10pt',
    lineHeight: 1,
    marginTop: '5px',
    marginRight: '5px',
    maxWidth: '200px',
    padding: '5px',
    width: '100%',
  },
};

const RuleLabel = ({ color, count, onClick, rule, selected, value }) => {
  const backgroundColor = selected ? color : 'transparent';
  const borderColor = selected ? 'transparent' : '#e6e6e6';

  return (
    <div
      onClick={() => onClick(value)}
      style={{ ...styles.label, backgroundColor, borderColor }}
    >
      {rule}
      <span style={styles.countSpan}>{`(${count})`}</span>
    </div>
  );
};

RuleLabel.propTypes = {
  color: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  rule: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default RuleLabel;
