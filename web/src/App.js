import React, { Component } from "react";
import dateFormat from 'dateformat';
import logo from "./logo.svg";
import Botonera from './Botonera';
import Displayer from './Displayer';
import Mensajeria from './Mensajeria';
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
        let termino = encodeURIComponent(event.target.qname.value);
        let fini = encodeURIComponent(dateFormat(event.target.finicio.value, 'yyyymmdd'));
        let ffin = encodeURIComponent(dateFormat(event.target.ffinal.value, 'yyyymmdd'));
    
        // solicitamos la informacion a la apiº (nuestro)      
        let urlGet = `api/search/${termino}/${fini}/${ffin}`;
       
        fetch(urlGet)
        .then((response)=>{
            // El fetch devuelve una promesa, hay que parsear a resultado
            return response.json();
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

       let mensaje="";

        if (this.state.errorPresent) {
            mensaje=this.state.errorMessage;         
        }
        if (this.state.alreadySearched){
            mensaje="La búsqueda ha arrojado los siguientes resultados:";
        } else{
                mensaje="Escriba una consulta y seleccione las fechas para realizar la búsqueda.";
        }
        if(this.state.alreadySearched & this.state.listadoNoticias.length===0){
            mensaje="No se han encontrado reusltados.";
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />         
                    <h2>New York Times searcher</h2>
                </div>
                <Botonera onSubmit={ this.handleSubmit }/>
                <Mensajeria mensaje={mensaje} />
                <Displayer listadoNoticias={ this.state.listadoNoticias } alreadySearched={this.state.alreadySearched} />
             </div>
             );
    }
}
