import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import {
    SignInUser,
    toggleClose,
    toggleOpen
 } from './../redux/actions/actions';
class SignInWith extends Component {
    render() {
      const responseGoogle = (res) => {
        let postData = {
          name: res.w3.ig,
          provider: 'google',
          email: res.w3.U3,
          provider_id: res.El,
          token: res.Zi.access_token,
          provider_pic: res.w3.Paa
        };
        console.log(postData);
        // build our user data
        // this.props.SignInUser(postData);
        // this.props.toggleClose();
      };
        return (
          <div>
            <div
              data-behavior="overlay"
              className={this.props.modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
              <GoogleLogin className="button google"
                clientId="1047569711890-stm936dqcbfevh5dmnelqeqerh74csn8.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={console.log('login failed')} >
                  <i className="fab fa-google"></i><span> SignIn with Google</span>
              </GoogleLogin>
              <p>After Signed in the user info will be log on chrome console</p>
            </div>
          </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode
    };
};
export default connect(mapStateToProps, {
    toggleClose,
    toggleOpen,
    SignInUser
})(SignInWith);
