import React, { Component } from 'react';
//import logo from './logo.svg';
import '../App.css';
import Map from './Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Neighborhood Map project</h1>
        </header>
        <Map/>
      </div>
    );
  }
}
export default App;
