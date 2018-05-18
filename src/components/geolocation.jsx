import React, { Component } from 'react';


class Geolocation extends Component {

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      let text = document.getElementById('geo-location');
      text.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  showPosition(position) {
    let text = document.getElementById('geo-location');
    text.innerHTML = "Latitude: " + position.coords.latitude +
    "<br />Longitude: " + position.coords.longitude;
  }

  render() {
    this.getLocation();
    return (
      <div className='geolocation-div'>
        <p id='geo-location'></p>
      </div>
    );
  }
}

export default Geolocation;
