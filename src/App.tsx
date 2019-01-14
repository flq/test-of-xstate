import React, { Component } from "react";
import "./App.css";
import { Spool, Stop, Play } from "./controls";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="controls">
          <Spool role="backward" disabled={false} active={false} />
          <Stop disabled={false} active={false} />
          <Play disabled={false} active={true} />
          <Spool role="forward" disabled={false} active={false} />
        </div>
        <div className="state">Test</div>
      </div>
    );
  }
}

export default App;
