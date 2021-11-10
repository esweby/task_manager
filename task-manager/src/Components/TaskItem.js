import React from 'react';

const TaskItem = ({ task, openModal }) => {
    return(
        <div className="tasklist-item">
            <div className="details">
                <h4>{task.link} - {task.company}</h4>
                <p>{task.status}</p>
            </div>
            <button onClick={() => openModal('edit', task)}>Edit</button>
        </div>
    );
}

export default TaskItem;