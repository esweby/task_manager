import React from 'react';

const Input = ({ 
   name, 
   displayName = true, 
   type, 
   placeholder = null, 
   content, 
   update }) => {

   return(
      <div className="input">
         {
            displayName ?
               <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3> :
               null
         }
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