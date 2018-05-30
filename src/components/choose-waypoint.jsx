import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import locationData from '../../locationData';
import axios from 'axios';
class ChooseWaypoint extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.state = {
      pathId: this.props.match.params.pathId,
      path: null,
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
    // testing current location
    axios({
      method: "GET",
      url: `/api/paths/${this.state.pathId}`
    }).then(res => this.setState({ path: res.data[0] }));

    let currentPos = {
      lat: 37.791666666666664,
      lng: -122.41027777777778,
    };

    let gmaps = window.google.maps;
    let map = new gmaps.Map(document.getElementById('waypoint-map'), {
      zoom: 10,
      center: currentPos,
      streetViewControl: false,
      mapTypeControl: false,
    });

    const bounds = new gmaps.LatLngBounds();

    locationData.sort((a, b) => {
      let posA = this.locationToPos(a);
      let posB = this.locationToPos(b);
      return this.distance(currentPos, posA) - this.distance(currentPos, posB);
    });

    let alphabet = Array(26).fill(1).map((val, idx) => {
      return String.fromCharCode(val + idx + 64);
    });

    locationData.slice(0, 5).forEach((point, idx) => {
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
          directions: null
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
          }).then(res => console.log(res));
          // this.props.history.push(`/${this.userId}/${this.state.pathId}/game`);
        }
        // infowindow.open(map, marker);
      });
    });

    map.fitBounds(bounds);
  }

  handleCloseModal() {
    document.getElementById('modal')
      .style.display = 'none';
  }

  render() {
    return (
      <div className='choose-waypoint-div'>
        <div id="modal" className="modal">
          <div className="modal-content">
            <span className="close"
              onClick={this.handleCloseModal}>&times;</span>
            <p>Please choose your next waypoint. Be aware that farther waypoints present more chances for events!</p>
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
