import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const style = {
  font: "12pt sans-serif"
}

window.onload = () => {
  document.querySelectorAll('[data-component=codesplain]')
    .forEach((node) => {
      const snippetKey = node.getAttribute('data-snippet')
      ReactDOM.render(
        <App snippetKey={snippetKey} />,
        node
      );
    });
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ipsum: ''
    }
  }
  componentDidMount() {
    axios.get('https://baconipsum.com/api/?type=meat-and-filler')
      .then(res => {
        this.setState({ipsum: res.data[0]})
      })
  }
  render() {
    const { snippetKey } = this.props;
    const { ipsum } = this.state;
    return (
      <div>
        <h1>{snippetKey}</h1>
        <p>{ipsum}</p>
      </div>
    )
  }
}
