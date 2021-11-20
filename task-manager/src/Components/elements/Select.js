import React from 'react';

const Input = ({ name, displayName = true, content, options, update }) => {

   return(
      <div className="select">
         {
            displayName ?
               <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3> :
               null
         }
         <select name={name} value={content} onChange={e => update(e.target.value, name)}>
            <option value>Please pick a value</option>
            {options.map(option => <option key={option} value={`${option}`}>{option}</option>)}
         </select>
      </div>
   )
}

export default Input;