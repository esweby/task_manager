import React from 'react';

const Checkbox = ({ name, content, update }) => {
    return(
        <input 
            type="checkbox" 
            name={name} 
            value={content} 
            onChange={e => update(e.target.checked, name)} />
    )
}

export default Checkbox;