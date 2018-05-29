import React, { Component } from 'react';

class EventModal extends Component {

  handleCloseModal() {
    document.getElementById('event-modal')
      .style.display = 'none';
  }

  render() {
    return (
    <div id="event-modal" className="event-modal modal">
      <div className="event-modal-content">
        <h4>Zombie Ambush!</h4>
        <img className='event-pic' src='/pic/Random-Zombies.png'></img>
        <p>How'd we miss them? Quick! RUN AWAY!</p>
        <div className='resources-gain'>
          <table><tbody>
            <tr>
              <td><i className="fas fa-dollar-sign"></i></td>
              <td>-12</td>
            </tr>
            <tr>
              <td><i className="far fa-smile"></i></td>
              <td>-20</td>
            </tr>
            <tr>
              <td><i className="fas fa-clock"></i></td>
              <td>-5</td>
            </tr>
            <tr>
              <td><i className="far fa-heart"></i></td>
              <td>+5</td>
            </tr>
          </tbody></table>
        </div>
        <div className='continue-buttons'>
          <button
            onClick={this.handleCloseModal}
            className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            OK
          </button>
        </div>
      </div>
    </div>
    );
  }
}

export default EventModal;
