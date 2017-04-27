import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setState } from '../actions/app';

import AnnotationDisplay from './AnnotationDisplay';
import RulesSelector from '../components/RulesSelector';
import SnippetArea from './SnippetArea';
import Error from '../components/Error';

const API_URL = process.env.API_URL;
const styles = {
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },
};

class AppBody extends Component {
  constructor() {
    super();
    this.state = {error: false};
  }
  componentDidMount() {
    const { dispatch, snippetKey } = this.props;
    const [user, snippet] = snippetKey.split("/");
    axios.get(`${API_URL}/users/${user}/snippets/${snippet}`)
      .then((res) => {
        // Some old snippets don't have a snippetLanguage field, so
        // assume they are 'python3'
        if (!res.data.snippetLanguage) { res.data.snippetLanguage = 'python3'; }
        dispatch(setState(res.data));
      })
      .catch(() => {
        this.setState({error: true})
      });
  }
  render() {
    const { snippetKey } = this.props;
    const { error } = this.state;
    if (!error) {
      return (
        <div style={styles.container}>
          <RulesSelector />
          <SnippetArea />
          <AnnotationDisplay />
        </div>
      );
    } else {
      return <Error snippetKey={snippetKey} />
    }
  }
}

AppBody.propTypes = {
  snippetKey: PropTypes.string.isRequired,
}

export default connect()(AppBody);
