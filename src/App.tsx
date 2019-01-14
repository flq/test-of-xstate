import React, { Component } from 'react';
import './App.css';
import Play from './controls/Play';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Play disabled={false} active={true} />
      </div>
    );
  }
}

export default App;
