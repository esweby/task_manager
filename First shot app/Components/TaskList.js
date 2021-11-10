import React, { useState, useEffect, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import TaskItem from './TaskItem';
import Task from './Task';

const TaskList = ({ ls, setLS }) => {
   const [ tasks, setTasks ] = useState(null);
   const [ modal, setModal ] = useState(null);

   useEffect(() => {
      if(ls.tasklist.length > 0) {
         setTasks(
            ls.tasklist.map(task => 
               <TaskItem 
                  open={openTaskModal} close={closeModal} 
                  task={task} ls={ls} setLS={setLS}  />)
         );
      }
   }, [ ls ]);

   const openTaskModal = () => {
      setModal(<Task action="new" close={closeModal} ls={ls} setLS={setLS} />);
   }

   const closeModal = e => {
      if(e !== undefined) e.stopPropagation();
      setModal(null);
   }

   return(
      <Fragment>
         {modal}
         <div>
            <div className="controls">
               <button className="btn modalOpen" onClick={openTaskModal}>Add Task</button>
            </div>
            <DragDropContext>
               <Droppable droppableId="tasks">
                  <div className="tasklist" dragover>
                     {tasks}
                  </div>
               </Droppable>
            </DragDropContext>
         </div>   
      </Fragment>
   )
}

export default TaskList;