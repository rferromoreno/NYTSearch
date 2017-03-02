import React, { Component } from 'react';

import './App.css';
import Botonera from './Botonera';
import Displayer from './Displayer';



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">

          
          <h2>New York Times searcher</h2>
        </div>
        <Botonera/>

         <Displayer/>
      </div>


     
    );
  }
}

export default App;

