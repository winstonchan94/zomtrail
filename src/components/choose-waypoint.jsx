import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import locationData from '../../locationData';
import axios from 'axios';
import * as _ from 'geolocation-marker';

class ChooseWaypoint extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.state = {
      pathId: this.props.match.params.pathId,
      path: null,
      lastPoint: null,
      secondPoint: null,
    };
  }

  distance(pos1, pos2) {
    let x = Math.abs(pos1.lat - pos2.lat);
    let y = Math.abs(pos1.lng - pos2.lng);

    return Math.sqrt( x * x + y * y);
  }

  locationToPos(location) {
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
  }

  componentDidMount() {
    // for material design lite
    let button = document.querySelector('.continue');
    window.componentHandler.upgradeElement(button);

    let currentPos;
    // testing current location
    axios({
      method: "GET",
      url: `/api/paths/${this.state.pathId}`
    }).then((res) => {
      if (res.data[0].steps.length > 0) {
        this.setState({
          path: res.data[0],
          lastPoint: res.data[0].steps[res.data[0].steps.length - 1].end_point,
          secondPoint: res.data[0].steps[res.data[0].steps.length - 1].start_point
        });
      } else {
        this.setState({
          path: res.data[0]
        });
      }
    })
      .then(() => {
        let end = this.state.path.end_point;
        let start = this.state.path.start_point;
        let filterNum = 10;
        if (end) {
          currentPos = { lat: end.latitude, lng: end.longitude };
        } else if (start) {
          currentPos = { lat: start.latitude, lng: start.longitude };
        } else {
          currentPos = { lat: 37.7807117, lng: -122.4114988 };
          filterNum = 40;
        }
        let gmaps = window.google.maps;
        let map = new gmaps.Map(document.getElementById('waypoint-map'), {
          zoom: 10,
          center: currentPos,
          streetViewControl: false,
          mapTypeControl: false,
        });
        this.geoMarker = new window.GeolocationMarker(map);
        this.geoMarker.setCircleOptions({ visible: false });

        const bounds = new gmaps.LatLngBounds();

        locationData.sort((a, b) => {
          let posA = this.locationToPos(a);
          let posB = this.locationToPos(b);
          return this.distance(currentPos, posA) - this.distance(currentPos, posB);
        });

        let alphabet = Array(26).fill(1).map((val, idx) => {
          return String.fromCharCode(val + idx + 64);
        });
        let lastPointDesc;
        let secondPointDesc;
        if (this.state.lastPoint) {
          lastPointDesc = this.state.lastPoint.description[0];
          console.log("endpoint: " + lastPointDesc);
        }
        if (this.state.secondPoint) {
          secondPointDesc = this.state.secondPoint.description[0];
          console.log("startpoing: " + secondPointDesc);
        }
        locationData.filter(el => (el.description !== lastPointDesc)
          && (el.description !== secondPointDesc))
          .slice(0, 10).forEach((point, idx) => {
            let pos = {lat: point.latitude, lng: point.longitude};
            let marker = new gmaps.Marker({
              position: pos,
              label: alphabet[idx],
              map: map
          });
          bounds.extend(pos);

          const contentString =
            // `<p>${idx}</p>` +
            `<p>Distance: ${this.distance(currentPos, pos) * 100}</p>` +
            `<p>${point.description}</p>`;
            // `<p>${point.address}</p>`;

          const infowindow = new gmaps.InfoWindow({
              content: contentString
            });

          marker.addListener('click', () => {
            // map.panTo(pos);
            let emptyStep = {
              start_point: point,
              end_point: null,
              direction: ""
            };
            let confirmed = confirm(`Do you want to go to ${point.description} next?`);
            if (confirmed) {
              let editPath = this.state.path;
              if (!this.state.path.start_point) {
                editPath.start_point = point;
                editPath.steps.push(emptyStep);
              } else if (!this.state.path.end_point) {
                editPath.end_point = point;
                editPath.steps[0].end_point = point;
              } else {
                let newStart = editPath.end_point;
                editPath.end_point = point;
                editPath.steps.push(emptyStep);
                editPath.steps[editPath.steps.length - 1].start_point = newStart;
                editPath.steps[editPath.steps.length - 1].end_point = point;
              }
              this.setState({ path: editPath });
              axios({
                method: 'PATCH',
                url: `/api/paths/${this.state.pathId}`,
                data: { path: editPath }
              }).then(() => this.props.history.push(`/${this.userId}/${this.state.pathId}/game`));
            }
            // infowindow.open(map, marker);
          });
        });

        map.fitBounds(bounds);

      }
    );


  }

  handleCloseModal() {
    document.getElementById('modal')
      .style.display = 'none';
  }

  render() {
    let modalMessage;
    if (this.state.path && !this.state.path.start_point){
      modalMessage = 'Please choose your starting waypoint. When you arrive, you can check in and begin your journey!';
    } else {
      modalMessage = 'Please choose your next waypoint. Be aware that farther waypoints present more chances for events!';
    }
    return (
      <div className='choose-waypoint-div'>
        <div id="modal" className="modal">
          <div className="modal-content">
            <span className="close"
              onClick={this.handleCloseModal}>&times;</span>
            <p>{modalMessage}</p>
            <div className='continue-buttons'>
              <button
                onClick={this.handleCloseModal}
                className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                OK
              </button>
            </div>
          </div>
        </div>
        <div
          className='waypoint-map'
          id="waypoint-map">Locations</div>
      </div>
    );
  }
}

export default withRouter(ChooseWaypoint);
