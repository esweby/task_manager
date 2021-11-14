import React from 'react';

const Input = ({ name, type, placeholder = null, content, update }) => {

   return(
      <div className="input">
         <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3>
         <input 
            name={name} 
            type={type}
            placeholder={placeholder}
            value={content} 
            onChange={e => update(e.target.value, name)} />
      </div>
   )
}

export default Input;