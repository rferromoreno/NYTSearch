import React, { Component } from 'react';


class Item extends Component{

    
    
render()
        {

            const isAvailable = this.props.isAvailable;
             let td = null;
            if(isAvailable) 
            {td= <td>{this.props.url}<spam> Disponible </spam> </td> 

             }
             else
                {td= <td>{this.props.url}<spam> No disponible </spam> </td> 

                }

          return (
              
         <tr>
                <td>{this.props.title}</td>
                <td>{this.props.snippet}</td>
                {td}
        </tr>
          );

        }

}
export default Item;