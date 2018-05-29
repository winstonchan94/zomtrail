import React, { Component } from 'react';
import SignInWithContainer from './sign_in_with_container';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreed: false,
    };
  }

  handleCheckBox() {
    return (e) => {
      if (e.target.checked) {
        document.getElementById('signin-button')
          .style.display = 'flex';
      } else {
        document.getElementById('signin-button')
          .style.display = 'none';
      }
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className='login-div'>
        <h2 className='login-title'>Welcome to Zomtrail</h2>
        <a className='login-tos-text' >Terms of Use
        </a>
        <div className='tos-checkbox-div'>
          <label className="tos-label mdl-checkbox mdl-js-checkbox"
            htmlFor="checkbox1">
            <input
              className="tos-checkbox mdl-checkbox__input"
              type="checkbox" id="checkbox1"
              onChange={this.handleCheckBox()}
              />
            <span className="mdl-checkbox__label">I understand and agree to the ToS</span>
          </label>
        </div>

        <SignInWithContainer/>
      </div>
    );
  }
}
// <div className='tos-checkbox'>
//   <label className="mdl-checkbox mdl-js-checkbox" htmlFor = "checkbox1">
//     <input type="checkbox" id="checkbox1"
//       className="mdl-checkbox__input"
//       labelstyle={{color: 'white'}}
//       iconstyle={{fill: 'white'}}
//       inputstyle={{color:'white'}}
//       style={{color:'white'}}
//       onChange={this.handleCheckBox()}/>
//     <span className="mdl-checkbox__label">I understand and agree to the ToS</span>
//   </label>
// </div>

export default Login;
