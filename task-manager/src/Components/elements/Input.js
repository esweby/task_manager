import React from 'react';

const Input = ({ name, placeholder, content, update }) => {

   return(
      <div>
         <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3>
         <input 
            name={name} 
            placeholder={placeholder}
            value={content} 
            onChange={e => update(e.target.value, name)} />
      </div>
   )
}

export default Input;