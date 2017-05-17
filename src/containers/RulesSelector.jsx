import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import RuleLabel from '../components/RuleLabel';
import { toggleRule } from '../actions/app';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

const makeListItems = (dispatchToggleRule, filters) => (
  Object.keys(filters)
    .map((filterName) => {
      const {
        color,
        count,
        prettyTokenName,
        selected,
      } = filters[filterName];
      return (
        <RuleLabel
          color={color}
          count={count}
          key={filterName}
          onClick={dispatchToggleRule}
          rule={prettyTokenName}
          selected={selected}
          value={filterName}
        />
      )
    })
)

const RulesSelector = ({ dispatchToggleRule, filters }) => {
  const listItems = makeListItems(dispatchToggleRule, filters);
  return (
    <div style={styles.container}>
      {listItems}
    </div>
  );
}

RulesSelector.propTypes = {
  dispatchToggleRule: PropTypes.func.isRequired,
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchToggleRule: (rule) => { dispatch(toggleRule(rule)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesSelector);
