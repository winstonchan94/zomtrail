import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class TutorialModal extends Component {
  constructor(props) {
    super(props);

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(e) {
    e.preventDefault();
    document.getElementById(`${this.props.name}-tutorial-modal`).style.display = "none";
    cookies.set('shownTutorial', true);
  }

  render() {
    let { name, text } = this.props;

    return (
    <div id={`${name}-tutorial-modal`} className={`${name}-tutorial-modal tutorial-modal modal`}>
      <div className="modal-content">
        <p>{text}</p>
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

export default TutorialModal;
