import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
    this.state = {
      scorers: null
    };
  }

  handleBack() {
    this.props.history.push(`/${this.props.match.params.userId}/${this.props.match.params.pathId}/game`);
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: "/api/users"
    }).then(res => this.setState({ scorers: res.data }));
  }
  render() {
    if (!this.state.scorers) {
      return (<div>loading</div>);
    } else {
      let arr = this.state.scorers;
      let scoreNum;
      if (arr.length <= 10) {
        scoreNum = arr.length;
      }  else {
        scoreNum = 10;
      }
      let grid = arr.slice(0,10).map((scorer, idx) => {
        return (<tr key={idx}><td className="high-score-names">{idx+1}. {scorer.name.split(" ")[0]}</td><td>{scorer.score}</td></tr>);
      });

      return (
        <div className="scoreboard-div"
          id="scoreboard-div" >
          <h2>High Scores</h2>
          <table className='scoreboard-table'>
            <tbody>
              {grid}
            </tbody>
          </table>
          <div className="back-buttons">
            <button className="back-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={this.handleBack}>Back to Game</button>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Scoreboard);
