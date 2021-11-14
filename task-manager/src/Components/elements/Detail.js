import React, { Fragment } from 'react';

const Detail = ({ detailType = 'regular', detailName = '', detailContent, extraClass = '' }) => {
   return(
      <Fragment>
         { detailType === 'link' ? 
            <a href="{detailContent}" target="_blank">{detailName}</a> : 
            <p>{detailContent}</p>
         }
      </Fragment>
   );
}

export default Detail;