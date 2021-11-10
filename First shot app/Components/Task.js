import React, { useState } from 'react';

const Task = ({ action, close, task, ls, setLS }) => {
   const [ link, setLink ] = useState('link');
   const [ name, setName ] = useState('name');
   const [ type, setType ] = useState('type');
   const [ date, setDate ] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`);
   const [ status, setStatus ] = useState('This is interesting');

   const saveTask = () => {
      setLS({
         ...ls, tasklist: [ ...ls.tasklist, { id: ls.tasklist.length, link, name, type, date, status }]
      });
      close();
   }

   return(
      <div className="modal show" id="firstModalClose" onClick={e => {
            if(e.target.id === 'firstModalClose') close(e)
         }}>
         <div className="screen">
            <h3>{action === 'new' ? 'Create' : 'Edit'} a Task</h3>
            <div className="task-details">
               <div>
                  <h4>Clarizen Link</h4>
                  <input type="text" value={link} onChange={e => setLink(e.target.value)} /> 
               </div>
               <div>
                  <h4>Customer Name</h4>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} /> 
               </div>
               <div>
                  <h4>Task Type</h4>
                  <input type="text" value={type} onChange={e => setType(e.target.value)} /> 
               </div>
               <div>
                  <h4>Due date</h4>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} /> 
               </div>
            </div>
            <div className="task-status">
               <h4>Task Updates</h4>
               <textarea value={status} onChange={e => setStatus(e.target.value)}>

               </textarea>
            </div>
            <div className="actions">
               <button className="btn" id="closeModal" onClick={e => {
                  console.log('hey');
                  if(e.target.id === 'closeModal') close(e);
               }}>Cancel</button> {
                  action === 'new' ? 
                     <button className="btn" onClick={saveTask}>Save Task</button> :
                     <button className="btn">Update Task</button> 
                  }
                  {
                     action === 'new' ? null :
                        <button className="btn">Archive Task</button>
                  }               
            </div>
         </div>
      </div>
   );
}

export default Task;