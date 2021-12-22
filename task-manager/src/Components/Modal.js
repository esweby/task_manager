import React from 'react';

import Button from './elements/Button';
import Input from './elements/Input';
import Textarea from './elements/Textarea';
import Checkbox from './elements/Checkbox';

import { H2 } from './elements/Headers';

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
            <H2 text={`${action.split('')[0].toUpperCase()}${action.slice(1)} Task`} />
            <section className="task-details">
               <Input 
                  name="Task Name" 
                  type="text" 
                  placeholder="e.g. Marketo, template, JS" 
                  content={task.type}
                  update={updateTask} />
               <Input 
                  name="company Name" 
                  type="text" 
                  placeholder="Business Name" 
                  content={task.company}
                  update={updateTask} />
               <Input 
                  name="Clarizen" 
                  type="text" 
                  placeholder="https://whatever.com/" 
                  content={task.link}
                  update={updateTask} />
               <Input 
                  name="Due date" 
                  type="date" 
                  content={task.completionDate} 
                  update={updateTask} />
               {
                  action === 'edit' ?
                     <Checkbox 
                        name="Blocked" 
                        type="checkbox" 
                        content={task.blocked} 
                        update={updateTask} /> 
                     : null
               }
               <Textarea 
                  name="status" 
                  placeholder="Please update the status" 
                  content={task.status} 
                  update={updateTask} />
            </section>
            <section className="actions">
               <div>
                  <Button text='Cancel' action={e => closeModal(e)} classes="close" />
                  { action === 'edit' ? <Button text='Delete' action={e => saveTask(e)} classes="delete" /> : null }
               </div>
               <div className="end">
                  {/* { action === 'edit' ? <Button text='Archive' action={e => saveTask(e)} classes="archive" /> : null } */}
                  {
                     action === 'edit' ? 
                        <Button text='Save' action={e => saveTask(e)} classes="edit"  /> : 
                        <Button text='Save' action={e => saveTask(e)} classes="save"  />
                  }
                  
               </div>
            </section>
         </div>
      </div>
   );
}

export default Modal;