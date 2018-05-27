import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

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
