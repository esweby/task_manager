import React, { Fragment } from 'react';

const Textarea = ({ name, placeholder, content, update }) => {
   return(
      <Fragment>
         <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3>
         <textarea 
            placeholder={placeholder} 
            value={content}
            onChange={e => update(e.target.value, name)}></textarea>
      </Fragment>
   )
}

export default Textarea;