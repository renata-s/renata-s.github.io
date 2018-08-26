import React, { Component } from 'react';
import '../App.css';
import Map from './Map.js';

class App extends Component {
  render() {
    return (

      <div>
        <header className="App-header">
          <h1 className="App-title" tabindex="1">Neighborhood Map project</h1>
        </header>
        <Map />
      </div>
    );
  }
}
export default App;
