import React, { Component } from 'react';
import { connect } from 'react-redux';

const prettyLangName = {
  'python3': 'Python 3',
  'java8': 'Java 8',
};

const styles = {
  title: {
    marginBottom: 0,
  },
  language: {
    marginTop: 0,
    color: '#a6a6a6',
  },
};

class Title extends Component {
  render() {
    const { language, title } = this.props;
    return (
      <div>
        <h1 style={styles.title}>
          {title}
        </h1>
        <h3 style={styles.language}>
          {prettyLangName[language]}
        </h3>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  title: state.snippetTitle,
  language: state.snippetLanguage,
});

export default connect(mapStateToProps)(Title);
