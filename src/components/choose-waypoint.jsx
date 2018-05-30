import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import locationData from '../../locationData';

class ChooseWaypoint extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.match.params.userId;
    this.state = {
      pathId: null
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
        `<p>${point.discription}</p>`;
        // `<p>${point.address}</p>`;

      const infowindow = new gmaps.InfoWindow({
          content: contentString
        });

      marker.addListener('click', () => {
        // map.panTo(pos);
        let confirmed = confirm(`Do you want to go to ${point.discription} next?`);
        if (confirmed) {
          this.props.history.push(`/${this.userId}/game`);
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
