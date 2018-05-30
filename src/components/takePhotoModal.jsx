import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
const CLOUDINARY_URL = require('../../config/cloudinary.js');

class TakePhotoModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadPreset: "mq30rlbh",
      selectedFile: null,
      path: null,
      user: null
    };
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }
  componentDidMount() {
    let pathId = this.props.pathId;
    let userId = this.props.userId;
    axios({
      method: 'GET',
      url: `/api/paths/${pathId}`
    }).then(res => this.setState({ path: res.data[0] }));
    axios({
      method: 'GET',
      url: `/api/users/${userId}`
    }).then(res => this.setState({ user: res.data }));
  }

  handleCloseModal() {
    document.getElementById('event-modal')
      .style.display = 'none';
  }

  fileChangedHandler(event) {
    this.setState({selectedFile: event.target.files[0]});
  }

  uploadHandler() {
    console.log(this.state.selectedFile);
    let editPath = this.state.path;
    let editUser = this.state.user;
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('upload_preset', "mq30rlbh");
    axios({
      url: window.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: formData
    }).then((res) => {
      let url = { filename: res.data.secure_url};
      if (!editPath.end_point) {
        editPath.start_point.images.push(url);
        editPath.steps[editPath.steps.length - 1].start_point.images.push(url);
      } else {
        editPath.end_point.images.push(url);
        editPath.steps[editPath.steps.length - 1].end_point.images.push(url);
      }
      this.setState({ path: editPath });
      axios({
        method: 'PATCH',
        url: `/api/paths/${this.props.pathId}`,
        data: { path: editPath }
      }).then(result => console.log(result.data));
      let multiplier = (editPath.steps.length * 0.1) + 1.0;
      editUser.score += (multiplier * 1000);
      this.setState({ user: editUser });
      axios({
        method: 'PATCH',
        url: `/api/users/${this.props.userId}`,
        data: { user: editUser }
      }).then(result => console.log(result.data));
    });
    if (this.state.selectedFile) {
      document.getElementById('photo-modal')
      .style.display = 'none';
    }
  }



// res.data.secure_url
  render() {
    if (!this.state.path || !this.state.user) {
      return (<div>loading!</div>);
    } else {
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
              <button onClick={this.uploadHandler}>Upload</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default TakePhotoModal;
