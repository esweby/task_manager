import React from 'react';

const H1 = ({ text, classes }) => {
   return <h1 className={`${classes}`}>{text}</h1>
}

const H2 = ({ text, classes }) => {
   return <h2 className={`${classes}`}>{text}</h2>
}

const H3 = ({ text, classes }) => {
   return <h3 className={`${classes}`}>{text}</h3>
}

export { H1, H2, H3 };