import React, { Component } from 'react';
import SignInWith from './SignInWith';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/CheckBox';

const styles = theme => ({
  root: {
    color: 'white',
  },
});

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
        <FormControlLabel
          classes={{
            label: classes.root
          }}
          label="I understand and agree to the ToS"
          control={
            <CheckBox
              className='tos-checkbox'
              checked={this.state.argeed}
              iconstyle={{fill: 'white'}}
              inputstyle={{color:'white'}}
              style={{color:'white'}}
              onChange={this.handleCheckBox()}></CheckBox>
          }>
        </FormControlLabel>

        <SignInWith/>
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

export default withStyles(styles)(Login);
