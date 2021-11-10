import React from 'react';

import Button from './elements/Button';
import Input from './elements/Input';
import Textarea from './elements/Textarea';

const Modal = ({ action, closeModal }) => {
   return(
      <div className="modal show" onClick={e => closeModal(e)}>
         <div className="screen">
            <h2>{`${action.split('')[0].toUpperCase()}${action.slice(1)}`} a Task</h2>
            <section className="task-details">
               <Input name="link" placeholder="Clarizen Link" />
               <Input name="company" placeholder="Company Name" />
               <Input name="type" placeholder="Clarizen Link" />
               <Input name="completion date" placeholder="Company Name" />
               <Textarea name="status" placeholder="Please update the status" />
            </section>
            <section className="actions">
               <Button text='Cancel' action={console.log} />
               <Button text='Save' action={console.log} />
               <Button text='Archive' action={console.log} />
            </section>
         </div>
      </div>
   );
}

export default Modal;