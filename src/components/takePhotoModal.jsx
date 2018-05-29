import React, { Component } from 'react';

class TakePhotoModal extends Component {

  handleCloseModal() {
    document.getElementById('event-modal')
      .style.display = 'none';
  }

  render() {
    return (
    <div id="photo-modal" className="photo-modal modal">
      <div className="photo-modal-content modal-content">
        <h4>Approaching Waypoint!</h4>
        <p>Your group needs a photo to as a marker for when they pass. Please take one of the landmark</p>
        <div className='continue-buttons'>
          <input type="file" label="Camera"
            onChange={this.fileChangedHandler}
            help="Click to snap a photo" accept="image/*">
          </input>
        </div>
      </div>
    </div>
    );
  }
}

export default TakePhotoModal;
