import React, { Component } from 'react';

/*
* Esta clase se ocupa de manejar el componente ¨Item¨ que será el encargado de mostrar una noticia
* que devuele la consulta a nuestra API
*/

export default 
  class Item extends Component {
    render() {
        let noticia = this.props.noticia;
        
        //Noticia disponible => URL con link
        let itemUrl = (noticia.isAvailable)? (
                        <td> 
                            <a href={ noticia.url }>{ noticia.url }</a> 
                            <spam className="disponible"> Disponible </spam> 
                        </td> ) : (
                        <td>
                            { noticia.url } 
                            <spam className="noDisponible"> No disponible </spam> 
                        </td>
                      );

        return (
            <tr>
                <td> {noticia.title} </td>
                <td> {noticia.snippet} </td>
                { itemUrl }
            </tr>
       );
    }
}
