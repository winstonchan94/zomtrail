import React, { Component } from 'react';
import Gmap from './gmap';

class Path extends Component {
  render() {
    return (
      <div className='story-div'>
        <Gmap />
        <form className='directions' action="#">
          <div className="dir-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea
              className="dir-textarea mdl-textfield__input"
              type="text" rows= "3" id="sample1" />
            <label
              className="mdl-textfield__label"
              htmlFor="sample1">Directions
            </label>
          </div>
        </form>
        <div className='action-buttons'>
          <button className="button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Summit
          </button>
        </div>
      </div>
    );
  }
}

export default Path;
