import React from 'react';

import Task from './Task';

const TaskItem = ({ open, close, task, ls, setLS}) => {
   return(
      <div className="tasklist-item" onMouseDown={e => console.log(e)} draggable>
         <div className="details">
            <h4>{task.name} - {task.type}</h4>
            <p>{task.status}</p>
         </div>
         <div>
            <button onClick={() => open()}>Edit</button>
         </div>
      </div>
   )
}

export default TaskItem;