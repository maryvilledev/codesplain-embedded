import React, { Component } from 'react';
import { connect } from 'react-redux';
import CodesplainLink from '../components/CodesplainLink'

const prettyLangName = {
  'python3': 'Python 3',
  'java8': 'Java 8',
};

const styles = {
  root: {
    textAlign: 'center'
  },
  title: {
    marginBottom: 0,
  },
  language: {
    marginTop: 0,
    color: '#a6a6a6',
    marginBottom: 0,
  },
  link: {
    marginTop:0
  }
};

export class Title extends Component {
  render() {
    const { language, title, snippetKey } = this.props;
    return (
      <div style={styles.root}>
        <h1 style={styles.title}>
          {title}
        </h1>
        <h3 style={styles.language}>
          {prettyLangName[language]}
        </h3>
        <CodesplainLink snippetKey={snippetKey} style={styles.link}/>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  title: state.snippetTitle,
  language: state.snippetLanguage,
});

export default connect(mapStateToProps)(Title);
