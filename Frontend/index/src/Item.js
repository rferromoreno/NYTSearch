import React, { Component } from 'react';


class Item extends Component{

    
    
render()
        {

            const isAvailable = this.props.isAvailable;
             let td = null;
            if(isAvailable) 
            {td= <td> <a href={this.props.url}>{this.props.url}</a><spam className="disponible"> Disponible </spam> </td> 

             }
             else
                {td= <td>{this.props.url}<spam className="noDisponible"> No disponible </spam> </td> 

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