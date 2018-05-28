// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/medium.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App.js';
import Story from './components/story';
import Game from './components/game';
import Locations from './components/locations';
import PicturePage from './components/picture';

import registerServiceWorker from './registerServiceWorker';
import { store, history } from './redux/store';
import App from './App.js';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>

        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/story" component={Story} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/location" component={Locations} />
          <Route exact path="/picture" component={PicturePage} />
          <Route path="**" component={notValidPath} />
        </Switch>

        <App />
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'));
  registerServiceWorker();
});
