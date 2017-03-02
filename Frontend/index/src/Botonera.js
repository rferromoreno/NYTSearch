import React, { Component } from 'react';


class Botonera extends Component{

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    alert('Apretastee' );
    event.preventDefault();
  }


render()
        {
          return (
        <form onSubmit={this.handleSubmit}>
            <fieldset>
                  <div  className="Botonera">
                    <div className="busqueda">
                        <legend> Buscar:  </legend>
                    
                        <input type="text" name="qname"/>
                    </div>

                    <div className="inicio">
                      <legend> Fecha de inicio: </legend>
                  
                      <input type="date" name="finicio"/>
                    </div>

                    <div className="inicio">
                      <legend> Fecha final: </legend>
                
                      <input type="date" name="ffinal"/>
                    </div>

                    <div className="boton">
                     <input type="submit" value="Search" />
                    </div>

                  </div>
               </fieldset>

          </form>
          );

        }

}
export default Botonera;