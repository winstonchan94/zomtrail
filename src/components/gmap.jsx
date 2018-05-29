import React, { Component } from 'react';
import locationData from '../../locationData';
import * as _ from 'geolocation-marker';

class Gmap extends Component {
  componentDidMount() {
    let pos = {lat: 37.7807117, lng: -122.4114988};
    let gmaps = window.google.maps;
    let map = new gmaps.Map(document.getElementById('game-map'), {
      zoom: 10,
      center: pos,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;

        let GeoMarker = new window.GeolocationMarker(map);
        GeoMarker.setCircleOptions({ visible: false });

        let posB = {
          lat: locationData[30].latitude,
          lng: locationData[30].longitude
        };
        let posA = {
          lat: locationData[31].latitude,
          lng: locationData[31].longitude
        };
        // let posC = {
        //   lat: locationData[26].latitude,
        //   lng: locationData[26].longitude,
        // };
        // let posCurrent = {
        //   lat: (posB.lat + posA.lat) / 2,
        //   lng: (posB.lng + posA.lng) / 2
        // };
        var bounds = new gmaps.LatLngBounds();

        // let markerUser = new gmaps.Marker({
        //   position: posCurrent,
        //   icon: {
        //     url: '/walk.png',
        //   },
        //   map: map
        // });
        let markerA = new gmaps.Marker({
          position: posA,
          label: 'A',
          map: map
        });
        let markerB = new gmaps.Marker({
          position: posB,
          label: 'B',
          map: map
        });
        // let markerC = new gmaps.Marker({
        //   position: posC,
        //   label: 'C',
        //   map: map
        // });
        // bounds.extend(posCurrent);
        bounds.extend(posA);
        bounds.extend(posB);
        // bounds.extend(posC);
        // bounds.extend(pos);
        map.fitBounds(bounds);
      });
    } else {
      let text = document.getElementById('map-info');
      text.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  render() {
    return (
      <div className='game-map' id="game-map"></div>
    );
  }
}
// <p className='map-info'></p>

export default Gmap;
