import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
const axios = require('axios');
import {
    SignInUser,
    toggleClose,
    toggleOpen
} from './../redux/actions/actions';

class SignInWith extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.logout = this.logout.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  redirect() {
    this.props.history.push(`/story`);
  }
  logout () {
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('Successfully signed out');
    });

    document.getElementById('signin-button').style.display = 'block';
    document.getElementById('logout-div').style.display = 'none';
  }

  renderButton() {
    window.gapi.signin2.render('signin-button', {
      scope: 'email',
      width: 180,
      height: 36,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.responseGoogle,
      onfailure: () => {console.log('login failed');}
    });
  }

  responseGoogle(googleUser) {
    let postData = {
      name: googleUser.w3.ig,
      provider: 'google',
      email: googleUser.w3.U3,
      provider_id: googleUser.El,
      token: googleUser.Zi.access_token,
      provider_pic: googleUser.w3.Paa
    };
    console.log(postData);
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

    const idToken = googleUser.getAuthResponse().id_token;
    let thing = this.props.history;
    let user = null;
    let userId = null;
    if (postData.email.length > 0) {
      axios({
        method: 'GET',
        url: `/api/usersByEmail/${postData.email}`
      }).then(function(res) {
        if (res.data[0]) {
          user = res.data[0];
          userId = res.data[0]._id;
        }
       })
      .then(function() {
        if (!user) {
          axios({
            method: "POST",
            url: '/api/users',
            data: {user: { name: postData.name, email: postData.email, score: 0, currentPathId: -1 } }
          }).then(function(res){ user = res.data; userId = res.data._id; });
        }
      });
      setTimeout(() => {
        if (userId) {
          this.props.history.push(`/${userId}/story`);
        }
      }, 1000);
    }
  }

  componentDidMount() {
    this.renderButton();

    document.getElementById('signin-button')
      .style.display = 'none';
  }

  render() {
    return (
      <div className='google-auth' id='google-auth'>
        <div
          className='signin-button'
          id="signin-button">
        </div>
      </div>
    );
  }
}

// <div
//   className='logout-div' id='logout-div'>
//   <p id='greeting'></p>
//   <button
//     className='logout-button'
//     id='logout-button'
//     onClick={this.logout}
//     >Logout</button>
//   <button
//     className='enter-game-button'
//     onClick={() => this.props.history.push('/game')}
//     >Enter Game</button>
// </div>

// const mapStateToProps = state => {
//
// };
// export default connect(mapStateToProps, {
//     toggleClose,
//     toggleOpen,
//     SignInUser
// })(SignInWith);

export default withRouter(SignInWith);
