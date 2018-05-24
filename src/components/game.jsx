import React, { Component } from 'react';
import Gmap from './gmap';
import { withRouter } from "react-router-dom";
import locationData from '../../locationData';
import axios from 'axios';

class Game extends Component {
  constructor(props) {
    super(props);

    let pointA = {
      latitude: locationData[30].latitude,
      longitude: locationData[30].longitude,
    };
    let pointB = {
      latitude: locationData[31].latitude,
      longitude: locationData[31].longitude,
    };
    let pointC = {
      latitude: locationData[32].latitude,
      longitude: locationData[32].longitude,
    };

    let step1 = {
      start_point: pointA,
      end_point: pointB,
      direction: '',
    };
    let step2 = {
      start_point: pointB,
      end_point: pointC,
      direction: '',
    };
    let steps = [step1, step2];

    let path = {
      start_point: steps[0].start_point,
      end_point: steps[steps.length - 1].end_point,
      steps,
    };

    this.state = {
      path
    };

    this.createPath = this.createPath.bind(this);
  }

  update(stepIdx) {
    return (e) => {
      let path = this.state.path;
      path.steps[stepIdx].direction = e.target.value;
      this.setState({
        path
      });
    };
  }

  handleCheckIn() {
    return () => {

    };
  }

  getPaths() {
    console.log('getPaths');
    axios.get(`/api/paths`).then((res)=>{
      console.log(res.data);
      // return res.data;
    }).catch(err => console.log(err));
  }

  createPath() {
    console.log('createPaths');
    let { path } = this.state;
    axios.post(`/api/paths`, { path }).then((res)=>{
      console.log(res.data);
      // return res.data;
    }).catch(err => console.log(err));
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
        <form
          className='directions'
          id='directions-1'
          onSubmit={this.handleCheckIn}>
          <div className="dir-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea
              onChange={this.update(0)}
              className="dir-textarea mdl-textfield__input"
              type="text" rows= "4" id="sample1" />
            <label
              className="dir-label mdl-textfield__label"
              htmlFor="sample1">A - B Directions
            </label>
          </div>
          <div className='summit-action-buttons'>
            <input
              type='submit'
              value='Arival Check-in'
              className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            </input>
          </div>
        </form>
        <form
          className='directions'
          id='directions-2'
          onSubmit={this.handleCheckIn}>
          <div className="dir-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <textarea
              onChange={this.update(1)}
              className="dir-textarea mdl-textfield__input"
              value={this.state.directions}
              onChange={this.update('path')}
              type="text" rows= "4" id="sample1" />
            <label
              className="dir-label mdl-textfield__label"
              htmlFor="sample1">B - C Directions
            </label>
          </div>
          <div className='summit-action-buttons'>
            <input
              type='submit'
              value='Arival Check-in'
              className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            </input>
          </div>
        </form>
        <div className='summit-action-buttons'>
          <button
            onClick={this.getPaths}
            className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Get Paths
          </button>
            <button
              onClick={this.createPath}
              className="summit-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
              Create Paths
            </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Game);
