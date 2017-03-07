import React, { Component } from "react";
import logo from "./logo.svg";
import Botonera from './Botonera';
import Displayer from './Displayer';
import "./App.css";
import dateFormat from 'dateformat';

class App extends Component {

constructor(props)
{
        super(props);
        this.state = { alreadySearched: false,
                       listadoNoticias: [] } ;
        this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit = async e => {
    e.preventDefault();
    let termino = e.target.qname.value;
    let fini = dateFormat(e.target.finicio.value, 'yyyymmdd');
    let ffin = dateFormat(e.target.ffinal.value, 'yyyymmdd');
    
    // solicitamos la informacion al service (nuestro)      
    let urlGet = `api/search/${termino}/${fini}/${ffin}`;

    const response = await fetch(urlGet);
    const listadoNoticias = await response.json();
    this.setState({
      listadoNoticias: listadoNoticias,
      alreadySearched: true
    });
  };

render() {
    return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />         
              <h2>New York Times searcher</h2>
            </div>
            <Botonera onSubmit={this.handleSubmit}/>
            <Displayer listadoNoticias={this.state.listadoNoticias} alreadySearched={this.state.alreadySearched} />
          </div>
          );
  }
}

export default App;

