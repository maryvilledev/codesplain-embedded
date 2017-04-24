import React, {Component, PropTypes} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppBody from './AppBody';
import appReducer from '../reducers/app';

class App extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(appReducer);
  }
  render() {
    return (
      <Provider store={this.store}>
        <AppBody {...this.props} />
      </Provider>
    );
  }
}

export default App;
