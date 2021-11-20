import React from 'react';

const Checkbox = ({ 
    name,
    displayName = true,
    content, 
    update, }) => {
    return(
        <div className="checkbox">
            {
                displayName ?
                    <h3>{`${name.split('')[0].toUpperCase()}${name.slice(1)}`}</h3> :
                null
            }
            <input 
                type="checkbox" 
                name={name} 
                value={content}
                checked={content}
                id={name}
                onChange={e => update(e.target.checked, name)} />
            <label htmlFor={name}></label>
        </div>
    )
}

export default Checkbox;