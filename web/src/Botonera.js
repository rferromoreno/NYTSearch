import React, { Component } from 'react';

/*Esta clase se ocupa de manejar el componente ¨Botonera ¨ que será el encargado de manejar los inputs
para las fechas y la query */

class Botonera extends Component{

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {

    this.props.onSubmit(event);
   
  }


render()
        {
          return (
        <form onSubmit={this.handleSubmit}>
            <fieldset>
                  <div  className="Botonera">
                    <div className="busqueda">
                        <legend> Buscar:  </legend>
                    
                        <input type="text" name="qname" required/>
                    </div>

                    <div className="inicio">
                      <legend> Fecha de inicio: </legend>
                  
                      <input type="date" name="finicio" required/>
                    </div>

                    <div className="inicio">
                      <legend> Fecha final: </legend>
                
                      <input type="date" name="ffinal" required/>
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