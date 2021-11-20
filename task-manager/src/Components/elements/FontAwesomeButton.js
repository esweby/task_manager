import React from 'react';

const FontAwesomeButton = ({ 
   action, 
   classes = '',
   fontAwesome = '',
   imgClasses = '',
   }) => {
   return(
      <button 
         className={`${classes}`} 
         onClick={e => {
            e.preventDefault();
            action(e);
         }}
      >
         <i className={`${fontAwesome} ${imgClasses}`}></i>
      </button>
   );
}

export default FontAwesomeButton;