import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
const CLOUDINARY_URL = require('../../config/cloudinary.js');

class PicturePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    uploadPreset: "mq30rlbh",
    selectedFile: null,
    };
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }
  fileChangedHandler(event) {
    this.setState({selectedFile: event.target.files[0]});
  }

  uploadHandler() {
    console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('upload_preset', "mq30rlbh");
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Content-Type': "application/x-www-form-urlencoded"
      },
      data: formData
    }).then(res => console.log(res));
  }
  render() {
    return (
      <div>
        <input type="file" label="Camera" onChange={this.fileChangedHandler}
        help="Click to snap a photo" accept="image/*" />
        <button onClick={this.uploadHandler}>upload</button>
      </div>
    );
  }
}
export default withRouter(PicturePage);
