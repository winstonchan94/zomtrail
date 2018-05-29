import React, { Component } from 'react';

class TakePhotoModal extends Component {

  handleCloseModal() {
    document.getElementById('event-modal')
      .style.display = 'none';
  }

  componentDidMount() {
    const button = document.querySelector('#screenshot-button');
    const img = document.querySelector('#screenshot-img');
    const video = document.querySelector('#screenshot-video');

    const canvas = document.createElement('canvas');

    button.onclick = video.onclick = function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
    };

    function handleSuccess(stream) {
      video.srcObject = stream;
    }

    navigator.mediaDevices.getUserMedia({video: true}).
      then(handleSuccess).catch((err) => console.log(err));
  }

  render() {
    return (
    <div id="photo-modal" className="photo-modal modal">
      <div className="photo-modal-content modal-content">
        <h4>Approaching Waypoint!</h4>
        <img className='photo-pic' src='/pic/Random-Zombies.png'></img>
        <p>How'd we miss them? Quick! RUN AWAY!</p>
        <div className='continue-buttons'>
          <button
            onClick={this.handleCloseModal}
            className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            OK
          </button>
        </div>
        <video className='screenshot-video' id='screenshot-video' autoPlay></video>
        <img id='screenshot-img' src="" />
        <canvas style={{display: "none"}}></canvas>
        <button id='screenshot-button'>Take screenshot</button>
      </div>
    </div>
    );
  }
}

export default TakePhotoModal;
