import React, { Component } from 'react';
import locationData from '../../locationData';

class Locations extends Component {
  componentDidMount() {
    let gmaps = window.google.maps;
    let map = new gmaps.Map(document.getElementById('map-locations'), {
      zoom: 10,
      center: {lat: 37.7807117, lng: -122.4114988},
      streetViewControl: false,
      mapTypeControl: false,
    });

    const bounds = new gmaps.LatLngBounds();

    locationData.forEach((point, idx) => {
      let pos = {lat: point.latitude, lng: point.longitude};
      let marker = new gmaps.Marker({
        position: pos,
        map: map
      });
      bounds.extend(pos);
      const contentString =
        `<p>${idx}</p>` +
        `<p>${point.discription}</p>` +
        `<p>${point.address}</p>`;
      const infowindow = new gmaps.InfoWindow({
          content: contentString
        });
      marker.addListener('click', function() {
        map.panTo(pos);
        infowindow.open(map, marker);
      });
    });

    map.fitBounds(bounds);
  }



    // let pos1 = pos;
    // let pos2 = {lat: pos.lat, lng: pos.lng+0.01};
    // let pos3 = {lat: pos.lat, lng: pos.lng-0.01};
    // var bounds = new gmaps.LatLngBounds();
    //
    // let markerA = new gmaps.Marker({
    //   position: pos3,
    //   label: 'A',
    //   map: map
    // });
    // let markerUser = new gmaps.Marker({
    //   position: pos1,
    //   icon: {
    //     url: '/walk.png',
    //   },
    //   map: map
    // });
    // let markerB = new gmaps.Marker({
    //   position: pos2,
    //   label: 'B',
    //   map: map
    // });
    //
    // bounds.extend(pos1);
    // bounds.extend(pos2);
    // bounds.extend(pos3);
    // map.panTo(midPoint(pos1, pos2));

  render() {
    return (
      <div>
        <div className='map' id="map-locations">Locations</div>
      </div>
    );
  }
}

export default Locations;
