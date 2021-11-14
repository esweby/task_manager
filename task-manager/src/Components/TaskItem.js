import React from 'react';
import Button from './elements/Button';
import Detail from './elements/Detail'

const TaskItem = ({ task, openModal }) => {
    return(
        <div className="tasklist-item">
            <div className="logo" alttext={task.company}>
                {task.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="details">
                <Detail detailType="link" detailName="Clarizen" detailContent={task.link} extraClass='small' />
                <Detail detailName="Task" detailContent={task.type} extraClass='small' />
                <Detail detailName="Due Date" 
                            detailContent={
                                `${
                                    new Date(task.completionDate).getDate()
                                }/${
                                    new Date(task.completionDate).getMonth() + 1
                                }/${new Date(task.completionDate).getFullYear()}`} 
                        extraClass=''/>
                <Detail detailContent={task.status} extraClass='full' />
            </div>
            <Button text='Edit' action={() => openModal('edit', task)} />
        </div>
    );
}

export default TaskItem;