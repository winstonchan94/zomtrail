import React, { Component } from 'react';
import Gmap from './gmap';
import EventModal from './eventModal';
import TakePhotoModal from './takePhotoModal';
import DropdownMenu from './dropdownMenu';
import TutorialModal from './tutorialModal';
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
import locationData from '../../locationData';
import axios from 'axios';

const cookies = new Cookies();

var recognition;
if (window.hasOwnProperty('webkitSpeechRecognition')) {
  recognition = new window.webkitSpeechRecognition();
}
var recognizing = false;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathId: this.props.match.params.pathId,
      path: null,
      userId: this.props.match.params.userId,
      user: null,
    };

  }

  loadMaterialDesignLite() {
    let elements = document.querySelectorAll('.mdl-button, .mdl-tooltip, .dir-textfield');
    window.componentHandler.upgradeElements(elements);
  }

  componentDidUpdate() {
    this.loadMaterialDesignLite();

    let shownTutorial = cookies.get('shownTutorial');
    if (shownTutorial) {
      let elements = document.querySelectorAll('.tutorial-modal');
      elements.forEach((el) => {
        el.style.display = "none";
      });
    }
  }

  componentDidMount() {
    this.loadMaterialDesignLite();

    axios({
      method: 'GET',
      url: `/api/paths/${this.state.pathId}`
    }).then(res => this.setState({ path: res.data[0] }));

    axios({
      method: 'GET',
      url: `/api/users/${this.state.userId}`
    }).then(res => this.setState({ user: res.data }));
  }

  update() {
    return (e) => {
      let editPath = this.state.path;
      editPath.steps[editPath.steps.length - 1].direction = e.target.value;
      this.setState({
        path: editPath
      });
    };
  }


  handleCheckIn() {
    return () => {

    };
  }

  startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      if (recognizing) {
        recognition.stop();
      } else {
        recognition.start();
        let dir = document.getElementById('direction');
        dir.focus();

        recognition.onresult = (e) => {
          let text = '';
          for (let i = 0; i < e.results.length; i++) {
            if (e.results[i].isFinal) {
              text += e.results[i][0].transcript + ".";
            }
          }
          dir.value = text;
          document.getElementById('dir-textfield').classList.add('is-dirty');
        };
      }

      recognition.onstart = function(e) {
        recognizing = true;
      };

      recognition.onerror = function(e) {
        recognizing = false;
        recognition.stop();
      };

      recognition.onend = function () {
        recognizing = false;
      };
    }
  }

  renderSpeechToTextButton() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      return (
        <div></div>
      );
      // return (
      //   <div>
      //     <img onClick={this.startDictation} src="//i.imgur.com/cHidSVu.gif" />
      //   </div>
      // );
    } else {
      return ( <div></div> );
    }
  }

  handleOpenMenu() {
    let dropdown = document.getElementById('drop-down-menu');
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }

  handleEvent() {
    document.getElementById('event-modal')
      .style.display = 'block';
  }

  handleTakePhoto() {
    document.getElementById('photo-modal')
      .style.display = 'block';
  }

  render() {
    let gameplayTutorialText = "This is the gameplay screen.  All resources except Days increase your score-- and its game over if they hit 0! Actions recover them, but have cooldowns. Lastly, remember to click the event button when it shows up to progress in the game!";

    let directionTutorialText = "Enter the directions to the next waypoint here. Remember that it is the apocalypse and so there are no street signs! Using street names will invalidate your entry!";


    if (!this.state.path || !this.state.user) {
      return (<div>loading</div>);
    } else {
      return (
        <div className='game-div'>
          <EventModal />
          <TakePhotoModal pathId={this.state.pathId} userId={this.state.userId}/>
          <Gmap />
          <div className='gameplay-screen'>
            <TutorialModal name='gameplay' text={gameplayTutorialText}/>/>
            <div className='gameplay-top'>
              <DropdownMenu userId={this.state.userId} pathId={this.state.pathId}/>
              <h1 className='gameplay-score'>Score: {this.state.user.score}</h1>
            </div>
            <div className='gameplay-mid'>
              <button className='event-button'
                onClick={this.handleEvent}>Event</button>
              <button className='event-button'
                onClick={this.handleTakePhoto}>Take Photo</button>
            </div>
            <div className='gameplay-bottom'>
              <div className='resources'>
                <div className='resource'
                  id='resource-money'>
                  <i className="fas fa-dollar-sign"></i>
                  <span className='resource-amount'>100</span>
                </div>
                <span htmlFor="resource-money" className="mdl-tooltip mdl-tooltip--large mdl-tooltip--right">Money</span>
                <div className='resource'
                  id='resource-morale'>
                  <i className="far fa-smile"></i>
                  <span className='resource-amount'>100</span>
                </div>
                <span htmlFor="resource-morale" className="mdl-tooltip mdl-tooltip--large mdl-tooltip--left">Morale</span>
              </div>
              <div className='resources'>
                <div className='resource'
                  id='resource-health'>
                  <i className="far fa-heart"></i>
                  <span className='resource-amount'>100</span>
                </div>
                <span htmlFor="resource-health" className="mdl-tooltip mdl-tooltip--large mdl-tooltip--right">Health</span>
                <div className='resource'
                  id='resource-Day'>
                  <i className="fas fa-clock"></i>
                  <span className='resource-amount'>Day 1</span>
                </div>
                <span htmlFor="resource-Day" className="mdl-tooltip mdl-tooltip--large mdl-tooltip--left">Day</span>
              </div>
              <div className='action-buttons'>
                <button className='action-button'>Scavenge</button>
                <button className='action-button'>Rest</button>
                <button className='action-button'>Run</button>
              </div>
            </div>
          </div>
          <form
            className='directions'
            id='directions-1'
            onSubmit={this.handleCheckIn}>
            <TutorialModal name='direction' text={directionTutorialText}/>
            <div className="dir-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
              id="dir-textfield">
              <textarea
                onChange={this.update()}
                className="dir-textarea mdl-textfield__input"
                type="text" rows= "6" id="direction" />
              <label
                className="dir-label mdl-textfield__label"
                htmlFor="direction">Directions
              </label>
            </div>
            <div className='summit-action-buttons'>
              <input
                type='submit'
                value='Submit'
                className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              </input>
            </div>
          </form>
          {this.renderSpeechToTextButton()}
        </div>
      );
    }
  }
}
  // <button className="action-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
  //   Scavenge
  // </button>
  // <button className="action-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">
  //   Rest
  // </button>

export default withRouter(Game);
