import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setState } from '../actions/app';

import AnnotationDisplay from './AnnotationDisplay';
import SnippetArea from './SnippetArea';
import Title from './Title';
import Error from '../components/Error';
import RulesSelector from '../components/RulesSelector';
import { getFirstAnnotation } from '../util/annotations';

const API_URL = process.env.API_URL;
const styles = {
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  rules: {
    display: 'flex',
    justifyContent: 'center',
  },
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
    const [user, snippet] = snippetKey.split('/');
    axios.get(`${API_URL}/users/${user}/snippets/${snippet}`)
      .then(({ data }) => {
        // Some old snippets don't have a snippetLanguage field, so
        // assume they are 'python3'
        if (!data.snippetLanguage) {
          data.snippetLanguage = 'python3';
        }
        data.selectedLine = getFirstAnnotation(data.annotations);
        dispatch(setState(data));
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
        <div>
          <div style={styles.title}>
            <Title />
          </div>
          <div style={styles.rules}>
            <RulesSelector />
          </div>
          <div style={styles.container}>
            <SnippetArea />
            <AnnotationDisplay />
          </div>
        </div>
      );
    }
    return (<Error snippetKey={snippetKey} />);
  }
}

AppBody.propTypes = {
  snippetKey: PropTypes.string.isRequired,
}

export default connect()(AppBody);
