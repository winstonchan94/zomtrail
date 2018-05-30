import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.history.push("/game");
  }

  render() {
    return (
    <div className="scoreboard-div"
      id="scoreboard-div" >
      <h2>Hight Scores</h2>
      <table className='scoreboard-table'>
        <tbody>
        <tr>
          <td>1.</td>
          <td>1234567</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>9002</td>
        </tr>
        <tr>
          <td>3.</td>
          <td>9001</td>
        </tr>
        <tr>
          <td>4.</td>
          <td>9000</td>
        </tr>
        </tbody>
      </table>
      <div className="back-buttons">
        <button className="back-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.handleBack}>Back</button>
      </div>
    </div>
    );
  }
}

export default withRouter(Scoreboard);
