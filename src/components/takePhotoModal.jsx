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

    button.onclick = video.onclick = function(e) {
      e.preventDefault();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      // Other browsers will fall back to image/png
      img.src = canvas.toDataURL('image/webp');
    };

    function handleSuccess(stream) {
      video.srcObject = stream;
    }

    let constraints = {
      video: { width: 1280, height: 720 },
      facingMode: "environment",
    };

    navigator.mediaDevices.getUserMedia(constraints).
      then(handleSuccess).catch((err) => console.log(err));
  }

  render() {
    return (
    <div id="photo-modal" className="photo-modal modal">
      <div className="photo-modal-content modal-content">
        <h4>Approaching Waypoint!</h4>
        <video className='screenshot-video' id='screenshot-video' autoPlay></video>
        <img className='screenshot-img' id='screenshot-img' src="" />
        <canvas className='screenshot-canvas'></canvas>
        <p>Your group needs a photo to as a marker for when they pass. Please take one of the landmark</p>
        <div className='continue-buttons'>
          <button
            onClick={this.handleCloseModal}
            id='screenshot-button'
            className="continue mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Take screenshot
          </button>
        </div>
      </div>
    </div>
    );
  }
}

export default TakePhotoModal;
