import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import RuleLabel from './RuleLabel';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

const makeListItems = (filters) => (
  Object.keys(filters)
    .map((filterName) => {
      const {
        color,
        count,
        prettyTokenName,
      } = filters[filterName];
      return (
        <RuleLabel
          key={filterName}
          rule={prettyTokenName}
          count={count}
          color={color}
        />
      )
    })
)

const RulesSelector = ({ filters }) => {
  const listItems = makeListItems(filters);
  return (
    <div style={styles.container}>
      {listItems}
    </div>
  );
}

RulesSelector.propTypes = {
  filters: PropTypes.shape({
    color: PropTypes.string,
    count: PropTypes.number,
    prettyTokenName: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const {
    filters,
  } = state;
  return {
    filters,
  };
};

export default connect(mapStateToProps)(RulesSelector);
