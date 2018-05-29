// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/medium.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './redux/store';
import App from './App.js';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'));
  registerServiceWorker();
  window.getState = store.getState;
});
