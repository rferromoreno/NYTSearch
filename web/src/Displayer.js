import React, { Component } from 'react';
import Item from './Item';

/*
* Esta clase se ocupa de manejar el componente ¨Displayer¨ que será el encargado de mostrar las noticias
* que devuele la consulta a nuestra API
*/

export default 
  class Displayer extends Component {
    render() {
        let rows = [];
        let aux = 0;

        //No renderizo nada sino buscaron
        if (!this.props.alreadySearched) 
            return null;

        //Creo una fila (Item) por noticia
        this.props.listadoNoticias.forEach((noticia) => {
            rows.push(
                <Item noticia={ noticia } key={ aux } />
            );
            aux++; 
        });   

      
            return (  
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Snippet</th> 
                            <th>Url</th>
                        </tr>
                    </thead> 
                    <tbody>
                        { rows } 
                    </tbody>
                </table>
            );
        
    }
}