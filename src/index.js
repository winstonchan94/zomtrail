// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/medium.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './App.js';
import Story from './components/story';
import Game from './components/game';
import Locations from './components/locations';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './redux/store';

function notValidPath() {
  return (
    <p>Not valid path</p>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/story" component={Story} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/location" component={Locations} />
          <Route path="**" component={notValidPath} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'));
  registerServiceWorker();
});
