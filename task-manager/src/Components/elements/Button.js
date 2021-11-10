import React from 'react';

const Button = ({ text, action, classes}) => {
   return(
      <button className={`btn ${classes}`} onClick={e => {
         e.preventDefault();
         action(e);
      }}>
         {text}
      </button>
   );
}

export default Button;