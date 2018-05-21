import React, { Component } from 'react';

function midPoint(pos1, pos2) {
  return {
    lat: (pos1.lat + pos2.lat) / 2.0,
    lng: (pos1.lng + pos2.lng) / 2.0
  };
}

class Gmap extends Component {
  componentDidMount() {
    let pos = {lat: 37.7807117, lng: -122.4114988};
    let gmaps = window.google.maps;
    let map = new gmaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: pos,
      streetViewControl: false,
      mapTypeControl: false,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;

        let pos1 = pos;
        let pos2 = {lat: pos.lat, lng: pos.lng+0.01};
        let pos3 = {lat: pos.lat, lng: pos.lng-0.01};
        var bounds = new gmaps.LatLngBounds();

        let markerA = new gmaps.Marker({
          position: pos3,
          label: 'A',
          map: map
        });
        let markerUser = new gmaps.Marker({
          position: pos1,
          icon: {
            url: '/walk.png',
          },
          map: map
        });
        let markerB = new gmaps.Marker({
          position: pos2,
          label: 'B',
          map: map
        });

        bounds.extend(pos1);
        bounds.extend(pos2);
        bounds.extend(pos3);
        // map.panTo(midPoint(pos1, pos2));
        map.fitBounds(bounds);
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
      </div>
    );
  }
}
// <p className='map-info'></p>

export default Gmap;

// <iframe className='gmap' width="400" height="200" frameBorder="0" style={{border:0}}
//   src="https://www.google.com/maps/embed/v1/view?zoom=11&center=37.7749%2C-122.4194&key=AIzaSyA7hmahITQBcIC2CHBzCbZPkaNRM1feCpI" allowFullScreen></iframe>
