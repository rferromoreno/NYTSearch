import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Botonera from './Botonera';
import Displayer from './Displayer';

var dateFormat = require('dateformat');

/*
Esta clase es el centro de verdad de la aplicación. A partir de ella se obtienen los valores ingresados por el
usuario en la ¨Botonera¨ y se encarga de obtener la información asociada a esa consulta y actualizar el ¨Displayer¨ 
para mostrar al usuario la información.
*/


//Moke de lo obtenido por el web service
 var listadoNoticias= [
           {  title: "Hola Mundo",
              snippet: "y esto?",
              url: "www.hexacta.com",
              isAvailable: "true"  

           }, 
           {  title: "Hola Mundo",
              snippet: "y esto?",
              url: "www.hexacta.com",
              isAvailable: "true"  

           },
           {  title: "Hola Mundo",
              snippet: "y esto?",
              url: "www.hexacta.com",
              isAvailable: "true"  
           }
 ];

class App extends Component {

constructor(props)
{
        super(props);

        this.state = {query: "",
                      fechaIn:"",
                      fechaFin:""};
                      this.handleSubmit = this.handleSubmit.bind(this);
}

/* Funcion que se ocupa de manejar el evento OnSubmit del formulario de la vista.
Actualiza el estado de la clase App con los valores ingresados por el usuario*/

  handleSubmit(event) {

        let termino = event.target.qname.value;
        let fini = dateFormat(event.target.finicio.value, 'yyyymmdd');
        let ffin = dateFormat(event.target.ffinal.value, 'yyyymmdd');

      //actualiza el estado interno
        this.setState({query: event.target.qname.value,
                            fechaIn:event.target.finicio.value,
                          fechaFin:event.target.ffinal.value}, () => {
            console.log(this.state);
      }); 

      // solicitamos la informacion al service (nuestro)      
      let urlGet = `http://localhost:3001/api/search/${termino}/${fini}/${ffin}`;

      console.log(urlGet);
      
      fetch(urlGet)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          listadoNoticias = [];
          listadoNoticias = json;

          /*Ahora debemos renderizar el DOM 
          */ 
            ReactDOM.render(
            <App />,
            document.getElementById('root')
          );


        }).catch(function(ex) {
          console.log('parsing failed', ex)
        });

        event.preventDefault();
  }


  render() {
    return (
          <div className="App">
            <div className="App-header">

              
              <h2>New York Times searcher</h2>
            </div>

            <Botonera onSubmit={this.handleSubmit}/>

            <Displayer listadoNoticias={listadoNoticias}/>
          </div>
          );
  }
}

export default App;

