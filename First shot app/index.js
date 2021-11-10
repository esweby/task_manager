// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Modules
import App from './Components/App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
};