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

  render() {
    return (
      <div>
        <div className='map' id="map-locations">Locations</div>
      </div>
    );
  }
}

export default Locations;
