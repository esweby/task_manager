import React, { Fragment } from 'react';

const Textarea = ({ name, placeholder }) => {
   return(
      <Fragment>
         <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3>
         <textarea placeholder={placeholder}>

         </textarea>
      </Fragment>
   )
}

export default Textarea;