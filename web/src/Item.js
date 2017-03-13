import React, { Component } from 'react';

/*
* Esta clase se ocupa de manejar el componente ¨Item¨ que será el encargado de mostrar una noticia
* que devuele la consulta a nuestra API
*/

export default 
  class Item extends Component {
    render() {
        let noticia = this.props.noticia;
        //Noticia disponible => URL con link : sino URL 
        let itemUrl = (noticia.isAvailable) 
                    ? (
                        <td> 
                            <a href={ noticia.url }>{ noticia.url }</a> 
                            <span className="disponible"> Disponible </span> 
                        </td> 
                    ) : (
                        <td>
                            { noticia.url } 
                            <span className="noDisponible"> No disponible </span> 
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
