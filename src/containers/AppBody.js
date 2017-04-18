import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AppBody extends Component {
  componentDidMount() {
    const { dispatch, snippetKey } = this.props;
    axios.get("../public/snippet.json")
      .then((res) => {
        console.log(res.data.snippetTitle)
      });
  }
  render() {
    return null;
  }
}

AppBody.propTypes = {
  snippetKey: PropTypes.string.required,
}

export default connect()(AppBody);
