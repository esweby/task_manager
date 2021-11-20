import React from 'react';
import FontAwesomeButton from './elements/FontAwesomeButton';
import Detail from './elements/Detail';

const TaskItem = ({ task, openModal }) => {
    return(
        <div className="tasklistItem">
            <div className="details">
                <section>
                    <Detail detailName="Name" detailContent={task.company} extraClass='small' />:&nbsp; 
                    <Detail detailName="Task" detailContent={task.type} extraClass='small' /> &nbsp; | &nbsp; 
                    <Detail detailType="link" detailName="Clarizen" detailContent={task.link} extraClass='small' /> &nbsp; | &nbsp; 
                    <strong>Due:</strong>&nbsp; <Detail detailName="Due Date" detailContent={
                                `${
                                    new Date(task.completionDate).getDate()}/${
                                    new Date(task.completionDate).getMonth() + 1}/${new Date(task.completionDate).getFullYear()}`} 
                        extraClass=''/>
                </section>
                <Detail 
                    detailContent={task.status} 
                    extraClass='full preview' />
            </div>
            <div className="actions">
                <FontAwesomeButton 
                    classes="img button"
                    fontAwesome="fas fa-edit fa-2x"
                    action={() => openModal('edit', task)}  />
            </div>
        </div>
    );
}

export default TaskItem;