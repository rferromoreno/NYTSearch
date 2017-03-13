import React, { Component } from "react";
import dateFormat from 'dateformat';
import logo from "./logo.svg";
import Botonera from './Botonera';
import Displayer from './Displayer';
import "./App.css";

export default 
  class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            alreadySearched: false,
            listadoNoticias: [],
            errorPresent: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let termino = event.target.qname.value;
        let fini = dateFormat(event.target.finicio.value, 'yyyymmdd');
        let ffin = dateFormat(event.target.ffinal.value, 'yyyymmdd');
    
        // solicitamos la informacion a la apiº (nuestro)      
        let urlGet = `api/search/${termino}/${fini}/${ffin}`;
       
        fetch(urlGet)
        .then((promise)=>{
            return promise.json();
        })
        .then((response)=>{
            let listadoNoticias=response;
            //check what do we received
            if (listadoNoticias.statusCode) { //there was an error on the server
                console.log('Hubo error: ', listadoNoticias.statusCode);
                this.setState({
                errorPresent: true,
                errorMessage: listadoNoticias.text

             });
            }
            else{     
                console.log('noticias', listadoNoticias);
                this.setState({
                listadoNoticias: listadoNoticias,
                alreadySearched: true,
                errorPresent: false

            });
            }
        })
            .catch((error)=>{
                console.log('Error en la respuesta del servidor', error);
                this.setState({
                errorPresent: true,
                errorMessage: 'Error en la comunicación con el servidor, intentelo nuevamente'
             });
            });

    
    }

    render() {
        let elementToShow=(
                <Displayer listadoNoticias={ this.state.listadoNoticias } alreadySearched={this.state.alreadySearched} />      
        );

        if (this.state.errorPresent) {
            elementToShow=(       
                <div className="errorPresent">
                    {this.state.errorMessage}
                </div>
            );
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />         
                    <h2>New York Times searcher</h2>
                </div>
                <Botonera onSubmit={ this.handleSubmit }/>
                     {elementToShow}
             </div>
             );
    }
}
