import React from 'react';

const Detail = ({ detailType = 'regular', detailName = '', detailContent, extraClass = '' }) => {
   return(
      <div className={`detail ${extraClass}`}>
         { detailName.length > 0 ? <h4>{detailName}:</h4> : null }
         { detailType === 'link' ? <a href="{detailContent}" target="_blank">{detailContent.split('/')[5]}</a> : <p>{detailContent}</p>}
      </div>
   );
}

export default Detail;