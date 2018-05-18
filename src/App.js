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

  displayNotification() {
    if (Notification.permission === 'granted') {
      var notification = new Notification("Hi there!");
      // navigator.serviceWorker.getRegistration().then(function(reg) {
      //   reg.showNotification('Hello world!');
      // });
    }
  }

  render() {
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Zomtrail</h1>
        </header>
        <SignInWith />
        <button onClick={this.displayNotification}>Notification</button>
      </div>
    );
  }
}
// <div className="g-signin2" data-onsuccess="onSignIn"></div>

export default App;
