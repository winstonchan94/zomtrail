import React, { Component } from 'react';

class Gmap extends Component {
  componentDidMount() {
    let pos = {lat: 37.7807117, lng: -122.4114988};
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: pos,
      streetViewControl: false,
      mapTypeControl: false,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;

        let marker = new window.google.maps.Marker({
          position: pos,
          map: map
        });
        let marker2 = new window.google.maps.Marker({
          position: {lat: pos.lat, lng: pos.lng -0.01},
          map: map
        });
        map.panTo(pos);
      });
    } else {
      let text = document.getElementById('map-info');
      text.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  render() {
    return (
      <div>
        <div className='map' id="map"></div>
        <p className='map-info'></p>
      </div>
    );
  }
}

export default Gmap;

// <iframe className='gmap' width="400" height="200" frameBorder="0" style={{border:0}}
//   src="https://www.google.com/maps/embed/v1/view?zoom=11&center=37.7749%2C-122.4194&key=AIzaSyA7hmahITQBcIC2CHBzCbZPkaNRM1feCpI" allowFullScreen></iframe>
