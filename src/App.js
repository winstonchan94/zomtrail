import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import SignInWith from './components/SignInWith';
// import Geolocation from './components/geolocation';
import Gmap from './components/gmap';

class App extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      currentUser: null,
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Zomtrail</h1>
        </header>
        <Gmap />
      </div>
    );
  }
}

// <SignInWith />

export default App;
