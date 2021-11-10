// Libraries
import React, { 
    useState, 
    useEffect } from 'react';

// Modules
import TaskList from './TaskList.js';


const App = () => {
    // Supporting functions
    const updateLocalStorage = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));
    const getLocalStorage = (name) => JSON.parse(localStorage.getItem(name));

    // State
    const [ lsName ] = useState('es-tm');
    const [ ls, setLS ] = useState({ name: '', workload: 'none', tasklist: [], });
    
    // Use Effect Area
    useEffect(() => {
        if(getLocalStorage(lsName) === null) updateLocalStorage(lsName, ls);
        if(getLocalStorage(lsName) !== null) setLS(getLocalStorage(lsName));
    }, []);

    useEffect(() => {
        updateLocalStorage(lsName, ls);
        console.log(ls);
    }, [ ls ]);

    // Rendering
    return(
        <main className="container"> 
            <div>
                <h1>TaskMaster</h1>
            </div>
            <div className="details">
                <h3>Details</h3>
                <input type="text" value={ls.name} onChange={e => setLS({ ...ls, name: e.target.value.trim()})} />
                <select value={ls.workload} onChange={e => setLS({ ...ls, workload: e.target.value.trim()})}>
                    <option value="none">Select Capacity</option>
                    <option value="Light">Light {`(< 50% Workload - > than 3 hours free)`}</option>
                    <option value="Busy">Busy {`50-85% Workload - 1-3 hours available`}</option>
                    <option value="Full">Full {`85-100% Workload - < 1 hour available`}</option>
                    <option value="Overloaded">Overloaded {`> 100% Workload - Risk to deadlines`}</option>
                </select>
            </div>
            <div>
                <h3>Tasklist</h3>
                <TaskList ls={ls} setLS={setLS} />
            </div>
        </main>
    );
};

export default App;