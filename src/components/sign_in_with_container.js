import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    signInUser,
    toggleClose,
    toggleOpen
} from './../redux/actions/actions';
import SignInWith from './SignInWith';

const mapDispatchToProps = dispatch => {
  return {
    setUser: userData => dispatch(signInUser(userData)),
  };
};

export default connect(null, mapDispatchToProps)(SignInWith);
