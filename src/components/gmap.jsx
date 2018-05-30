import React, { Component } from 'react';
import locationData from '../../locationData';
import TutorialModal from './tutorialModal';
import * as _ from 'geolocation-marker';

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.path = this.props.path;
    this.geoMarker = null;
  }

  componentWillUnmount() {
    // sovling problem with visit scoreboard and back
    this.geoMarker.setMap();
  }

  componentDidMount() {
    let pos = {lat: 37.7807117, lng: -122.4114988};
    let gmaps = window.google.maps;
    let destIcon = 'https://maps.google.com/mapfiles/kml/paddle/ylw-stars.png';
    let map = new gmaps.Map(document.getElementById('game-map'), {
      zoom: 10,
      center: pos,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });

    this.geoMarker = new window.GeolocationMarker(map);
    this.geoMarker.setCircleOptions({ visible: false });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        pos.lat = position.coords.latitude;
        pos.lng = position.coords.longitude;
        let locations = [];
        let markers = [];
        let labels = "123456789";
        var bounds = new gmaps.LatLngBounds();
        let posCurrent = {
          lat: pos.lat,
          lng: pos.lng
        };
        console.log(this.path.steps);
        if (this.path.steps.length > 0) {
          for (let i = 0; i < this.path.steps.length; i++) {
            locations.push( { lat: this.path.steps[i].start_point.latitude, lng: this.path.steps[i].start_point.longitude } );
            console.log(locations);
          }
          if (this.path.end_point) {
            locations.push( { lat: this.path.end_point.latitude, lng: this.path.end_point.longitude });
            console.log(locations);
          }
        }

        for (let i = 0; i < locations.length; i++) {
          if (!(i == locations.length - 1)) {
            markers.push(new gmaps.Marker({
              position: locations[i],
              label: labels[i],
              map: map
            }));
          } else {
            markers.push(new gmaps.Marker({
              position: locations[i],
              icon: destIcon,
              map: map
            }));
          }
          bounds.extend(locations[i]);
        }

        bounds.extend(posCurrent);


        // let markerUser = new gmaps.Marker({
        //   position: posCurrent,
        //   icon: {
        //     url: '/walk.png',
        //   },
        //   map: map
        // });
        // let markerA = new gmaps.Marker({
        //   position: posA,
        //   label: 'A',
        //   map: map
        // });
        // let markerB = new gmaps.Marker({
        //   position: posB,
        //   label: 'B',
        //   map: map
        // });
        // let markerC = new gmaps.Marker({
        //   position: posC,
        //   label: 'C',
        //   map: map
        // });
        // bounds.extend(posA);
        // bounds.extend(posB);
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
    let text = "This is the map overview. Use this map to find out where you are and where you need to go.";

    return (
      <div>
        <div className='game-map' id="game-map"></div>
        <TutorialModal name='map' text={text}/>
      </div>
    );
  }
}

export default Gmap;
