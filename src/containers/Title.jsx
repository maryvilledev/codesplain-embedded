import React, { Component } from 'react';
import { connect } from 'react-redux';

const prettyLangName = {
  'python3': 'Python 3',
  'java8': 'Java 8',
};

const styles = {
  title: {
    marginBottom: 0,
    backgroundColor: '#99ccff',
    color: 'black',
    textAlign: 'center',
    padding: '5px',
    border: '1px solid #0099ff',
    borderRadius: '5px',
    margin: 'auto'
  },
  language: {
    marginTop: 0,
    color: '#a6a6a6',
  },
  link: {
    textDecoration: 'none',
  }
};

class Title extends Component {
  render() {
    const { language, title, link } = this.props;
    return (
      <div>
        <a href={link} style={styles.link} target="_blank" rel="noopener noreferrer">
          <h1 style={styles.title}>
            {title}
          </h1>
        </a>
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
