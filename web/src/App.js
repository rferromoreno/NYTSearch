import React, { Component } from "react";
import logo from "./logo.svg";
import Botonera from './Botonera';
import Displayer from './Displayer';
import "./App.css";
var dateFormat = require('dateformat');

class App extends Component {

constructor(props)
{
        super(props);
        this.state = { query: "",
                       fechaIn:"",
                       fechaFin:"",
                       listadoNoticias: [] } ;
        this.handleSubmit = this.handleSubmit.bind(this);
}

  //state = { listadoNoticias: null };

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
      listadoNoticias: listadoNoticias
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
            <Displayer listadoNoticias={this.state.listadoNoticias}/>
          </div>
          );
  }
}

export default App;

