import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setState } from '../actions/app';

import AnnotationDisplay from './AnnotationDisplay';
import SnippetArea from './SnippetArea';
import Title from './Title';
import RulesSelector from './RulesSelector';
import Error from '../components/Error';
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
  wrapper: {
    margin: '15px',
    padding: '10px',
    background: '#f5f6f5',
    borderRadius: '5px',
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
  },
};

export class AppBody extends Component {
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
        <div style={styles.wrapper}>
          <div style={styles.title}>
            <Title snippetKey={snippetKey}/>
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
