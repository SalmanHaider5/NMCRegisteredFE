import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { store } from './store'
import Application from './Components'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Application className="App" />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
