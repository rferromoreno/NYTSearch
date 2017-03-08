import React, { Component } from "react";
import logo from "./logo.svg";
import Botonera from './Botonera';
import Displayer from './Displayer';
import "./App.css";
import dateFormat from 'dateformat';

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
            console.log('noticias', listadoNoticias);
                this.setState({
                listadoNoticias: listadoNoticias,
                alreadySearched: true

            });
        })
            .catch((error)=>{
                console.log('Error en la respuesta del servidor', error);
                this.setState({
                errorPresent: true

            });
            });

    
    }

    render() {

        let elementToShow=(
            
                <Displayer listadoNoticias={ this.state.listadoNoticias } alreadySearched={this.state.alreadySearched} />
           
        );

        if (this.state.errorPresent){
            elementToShow=(
                <div className="errorPresent">
                    Ha habido un error... Intente nuevamente
                </div>);
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
