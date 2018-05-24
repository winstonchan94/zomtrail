import React, { Component } from 'react';
import Gmap from './gmap';
const axios = require('axios');

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('hello');
    axios({
      method: 'POST',
      url: '/api/paths',
      data: this.state
    }).then(res => console.log(res));
  }

  render() {
    return (
      <div className='story-div'>
        <Gmap />
        <div className='gameplay-screen'>
          <h1>GamePlay</h1>
          <h1>Screen</h1>
          <div className='action-buttons'>
            <button className="action-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
              Scavenge
            </button>
            <button className="action-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
              Rest
            </button>
          </div>
        </div>
        <form className='directions' action="#">
          <div className="dir-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea
              className="dir-textarea mdl-textfield__input"
              value={this.state.directions}
              onChange={this.update('path')}
              type="text" rows= "4" id="sample1" />
            <label
              className="dir-label mdl-textfield__label"
              htmlFor="sample1">Directions
            </label>
          </div>
        </form>
        <div className='summit-action-buttons'>
          <button onClick={this.handleSubmit} className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
