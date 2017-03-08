import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/*
* Esta clase se ocupa de manejar el componente ¨Botonera¨ que será el encargado de manejar los inputs
* para las fechas y la query.
*/

export default
  class Botonera extends Component {
    constructor(props) {
        super(props);
        this.state = {
          finicio: null,
          ffinal: null 
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInicio = this.handleInicio.bind(this);
        this.handleFinal = this.handleFinal.bind(this);
    }

    handleSubmit(event) {
        this.props.onSubmit(event);   
    }

    handleInicio(date) {
      this.setState({
        finicio: date
      });
    }

    handleFinal(date) {
      this.setState({
        ffinal: date
      });
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <fieldset>
                    <div  className="Botonera">
                        <div className="busqueda">
                            <legend> Buscar:  </legend>
                            <input type="text" name="qname" required/>
                        </div>

                        <div className="inicio">
                            <legend> Fecha de inicio: </legend>                      
                            <DatePicker name="finicio" selected={this.state.finicio} onChange={this.handleInicio} required />
                        </div>

                        <div className="inicio">
                            <legend> Fecha final: </legend>                    
                            <DatePicker name="ffinal" selected={this.state.ffinal} onChange={this.handleFinal} required />
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