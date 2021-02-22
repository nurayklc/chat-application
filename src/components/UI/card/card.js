import React from 'react'
import './card.css'

/**
* @author
* @function Card
**/

const Card = (props) => {
  return(
    <div className="card">
        {props.children}
    </div>
   )

 }

export default Card