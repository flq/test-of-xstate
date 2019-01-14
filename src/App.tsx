import React, { Component } from "react";
import "./App.css";
import { Spool, Stop, Play } from "./controls";

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="controls">
          <Spool
            role="backward"
            disabled={false}
            active={false}
            onClick={this.backwardClick}
          />
          <Stop disabled={false} active={false} onClick={this.stopClick} />
          <Play disabled={false} active={true} onClick={this.playClick} />
          <Spool
            role="forward"
            disabled={false}
            active={false}
            onClick={this.forwardClick}
          />
        </div>
        <div className="state">Test</div>
      </div>
    );
  }

  backwardClick = () => {};

  forwardClick = () => {};

  playClick = () => {};

  stopClick = () => {};
}

export default App;
