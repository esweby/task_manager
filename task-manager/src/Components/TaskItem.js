import React from 'react';
import Button from './elements/Button';

const TaskItem = ({ task, openModal }) => {
    return(
        <div className="tasklist-item">
            <div className="details">
                <h4>{task.link} - {task.company}</h4>
                <p>{task.status}</p>
            </div>
            <Button text='Edit' action={() => openModal('edit', task)} />
        </div>
    );
}

export default TaskItem;