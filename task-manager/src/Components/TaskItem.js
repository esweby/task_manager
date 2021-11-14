import React from 'react';
import Button from './elements/Button';
import Detail from './elements/Detail'

const TaskItem = ({ task, openModal }) => {
    return(
        <div className="tasklistItem">
            <div className="details">
                <section>
                    <Detail detailName="Name" detailContent={task.company} extraClass='small' />:&nbsp; 
                    <Detail detailName="Task" detailContent={task.type} extraClass='small' /> 
                </section>
                <section>
                    <Detail detailType="link" detailName="Clarizen" detailContent={task.link} extraClass='small' />
                </section>
                <section>
                <strong>Due:</strong>&nbsp;<Detail detailName="Due Date" 
                            detailContent={
                                `${
                                    new Date(task.completionDate).getDate()
                                }/${
                                    new Date(task.completionDate).getMonth() + 1
                                }/${new Date(task.completionDate).getFullYear()}`} 
                        extraClass=''/>
                </section>
                <strong>Status:</strong> <Detail detailContent={task.status} extraClass='full' />
            </div>
            <Button text='Edit' action={() => openModal('edit', task)} />
        </div>
    );
}

export default TaskItem;