import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import SignInWith from './components/SignInWith';
// import Geolocation from './components/geolocation';

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
        <h1 className="App-title">Welcome to Zomtrail</h1>
        <p>Terms of Service</p>
        <SignInWith />
      </div>
    );
  }
}

export default App;
