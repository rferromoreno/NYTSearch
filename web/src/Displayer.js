import React, { Component } from 'react';
import Item from './Item';

class Displayer extends Component{


render()
        {
           var rows = [];
           var aux=0;
           this.props.listadoNoticias.forEach((noticia) => {
                rows.push(<Item url={noticia.url} title={noticia.title} isAvailable={noticia.isAvailable} snippet={noticia.snippet}  key={aux}></Item>)
                aux++; });

            let body=null;                              

            if (rows.length===0){
                body=  <div className="sinResultados">
                        No se han encontrado resultados... </div>}

                        else {
                            body=<table><thead><tr><th>Título</th><th>Snippet</th><th>Url</th></tr></thead><tbody>{rows}</tbody></table>}
         
         
          return (<div>{body}</div>);

        }

}
export default Displayer;