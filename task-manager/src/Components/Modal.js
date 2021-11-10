import React from 'react';

import Button from './elements/Button';
import Input from './elements/Input';
import Textarea from './elements/Textarea';

const Modal = ({ 
      action = 'hidden', 
      extraClass = 'hide',
      saveTask,
      updateTask, 
      closeModal, 
      task }) => {
   return(
      <div className={`modal ${extraClass}`} onClick={e => closeModal(e)}>
         <div className="screen">
            <h2>{`${action.split('')[0].toUpperCase()}${action.slice(1)}`} a Task</h2>
            <section className="task-details">
               <Input 
                  name="link" 
                  type="text" 
                  placeholder="https://clarizen/1241412" 
                  content={task.link}
                  update={updateTask} />
               <Input 
                  name="company" 
                  type="text" 
                  placeholder="Company Name" 
                  content={task.company}
                  update={updateTask} />
               <Input 
                  name="type" 
                  type="text" 
                  placeholder="e.g. Marketo, template, JS" 
                  content={task.type}
                  update={updateTask} />
               <Input 
                  name="completion date" 
                  type="date" 
                  content={task.completionDate} 
                  update={updateTask} />
               <Textarea 
                  name="status" 
                  placeholder="Please update the status" 
                  content={task.status} 
                  update={updateTask} />
            </section>
            <section className="actions">
               <div>
                  <Button text='Cancel' action={e => closeModal(e)} classes="close" />
                  {action === 'update' ? <Button text='Delete' action={e => closeModal(e)} classes="delete" /> : null}
               </div>
               <div className="end">
                  {action === 'update' ? <Button text='Archive' action={console.log} classes="archive" /> : null}
                  <Button text='Save' action={e => saveTask(e)} classes="save"  />
               </div>
            </section>
         </div>
      </div>
   );
}

export default Modal;