// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/medium.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './redux/store';

function test() {
  return (
    <p>Not valid path</p>
  );
}

ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="**" component={test} />
        </Switch>
      </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
