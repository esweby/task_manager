import React, { Fragment } from 'react';

const Detail = ({ detailType = 'regular', detailName = '', detailContent, extraClass = '' }) => {
   return(
      <Fragment>
         { detailType === 'link' ? 
            <a 
               href={`${detailContent}`}
               className={`${extraClass}`} 
               target="_blank">{detailName}</a> : 
            <p className={`${extraClass}`}>{detailContent}</p>
         }
      </Fragment>
   );
}

export default Detail;