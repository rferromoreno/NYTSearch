import React, { Component } from 'react';
import Item from './Item';

class Displayer extends Component{
render()
        {

           const item=
           {  title: "Hola Mundo",
              snippet: "y esto?",
              url: "www.hexacta.com",
              isAvailable: "true"  

           }

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
           <Item>{item}</Item>

        </tbody>
           
        </table>
          );

        }

}
export default Displayer;