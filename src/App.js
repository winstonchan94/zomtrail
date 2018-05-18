import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SignInWith from './components/SignInWith';

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
        <SignInWith />
      </div>
    );
  }
}
// <div className="g-signin2" data-onsuccess="onSignIn"></div>

export default App;
