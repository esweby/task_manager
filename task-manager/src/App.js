// Libraries
import React, { Fragment } from 'react';

// Modules
import Filters from './Components/Filters/Filters';
import Cards from './Components/Cards/Cards';

const App = () => {

    return(
        <Fragment>
            <Filters />
            <Cards />
        </Fragment>
    );
};

export default App;