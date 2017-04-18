import React, {Component, PropTypes} from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const mockReducer = (state={}, action) => state

class App extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(mockReducer);
  }
  render() {
    return (
      <Provider store={this.store}>
        <div>Ello govna?</div>
      </Provider>
    );
  }
}

App.propTypes = {
  snippetKey: PropTypes.string.required,
}

export default App
