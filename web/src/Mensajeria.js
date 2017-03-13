import React, { Component } from 'react';



export default
  class Mensajeria extends Component {

    render() { 

        let message=this.props.mensaje;

        return (
            <div>
            
                <p>{message}</p>

            </div>
          );
      }
}