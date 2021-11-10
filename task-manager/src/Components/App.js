import React, { Component, Fragment } from 'react';

import Input from './elements/Input';
import Select from './elements/Select';
import Button from './elements/Button';

import Modal from './Modal';
import TaskItem from './TaskItem';

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
         modal: 'hide',
         modalAction: 'nothing',
         ls: {},
         task: {
            id: '',
            link: '',
            company: '',
            type: '',
            status: '',
            completionDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
         },
         name: '',
         workload: '',
         tasklist: [],
         archive: [],
      }
   }

   workloadFields = [
      'Light (< 50% Workload - > than 3 hours free)',
      'Busy (50-85% Workload - 1-3 hours available)',
      'Full (85-100% Workload - < 1 hour available)',
      'Overloaded (> 100% Workload - Risk to deadlines)'
   ];

   // --------------------------------------- Managing Local Storage

   getLocalStorage = () => 
      JSON.parse(localStorage.getItem('es-tm')) || false;

   updateStateFromLocal = ls => 
      this.setState({ 'name': ls['name'], workload: ls['workload'], tasklist: ls['tasklist'], archive: ls['archive'] });
   
   updateLocalFromState = () => {
      const { name, workload, tasklist, archive } = this.state;
      localStorage.setItem('es-tm', JSON.stringify({
         name,
         workload,
         tasklist,
         archive
      }));
      this.setState({ ...this.state, ls: this.getLocalStorage() });
   }

   // --------------------------------------- Managing State

   updateState = (newVal, name) => {
      if(newVal === this.state[name]) return;
      switch(name) {
         case 'name': 
            this.setState({ name: newVal });
            break;
         case 'workload':
            this.setState({ workload: newVal });
            break;
         default:
            console.error({ newVal });
      }
   }

   updateTask = (newVal, name) => {
      switch(name) {
         case 'link': 
            if(newVal === this.state.task.link) return;
            this.setState({ task: { ...this.state.task, link: newVal } });
            break;
         case 'company':
            if(newVal === this.state.task.company) return;
            this.setState({ task: { ...this.state.task, company: newVal } });
            break;
         case 'type':
            if(newVal === this.state.task.type) return;
            this.setState({ task: { ...this.state.task, type: newVal } });
            break;
         case 'status':
            if(newVal === this.state.task.status) return;
            this.setState({ task: { ...this.state.task, status: newVal } });
            break;
         case 'completion date':
            if(newVal === this.state.task.completionDate) return;
            this.setState({  task: { ...this.state.task, completionDate: newVal }  });
            break;
         default:
            console.error({ name, newVal });
      }
   }

   saveTask = e => {
      e.stopPropagation();
      const { link, company, type, status, completionDate } = this.state.task;
      if(!link || !status) return;
      this.setState(
         { 
            tasklist: [ 
               ...this.state.tasklist, 
               {
                  id: `task-${this.state.tasklist.length}-${company}`,
                  link, company, type, status, completionDate
               }
            ]
         }, 
         () => this.updateLocalFromState());
      this.closeModal(e)
   }

   // --------------------------------------- Managing Modal

   createModal = (action, editableTask) => {
      if(action === 'create') 
         this.setState({ 
            task: { 
               id: '', 
               link: '', 
               company: '', 
               type: '', 
               status: '',
               completionDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}` 
            } 
         });
      if(action === 'edit') {
         const { id, task, link, company, type, status, completionDate } = editableTask;
         this.setState({
            task: {
               id, task, link, company, type, status, completionDate
            }
         });
      }
      this.setState({ modal: 'show', modalAction: action });
   }

   closeModal = e => {
      if(e.target.classList.contains('modal') ||
         e.target.classList.contains('close') ||
         e.target.classList.contains('save')) {
            e.stopPropagation();
            this.setState({ modal: 'hide', modalAction: 'hidden' });
      }
   }

   // --------------------------------------- Lifecycle Methods

   componentDidMount() {
      const ls = this.getLocalStorage();
      if(ls) this.updateStateFromLocal(ls);
      if(!ls) localStorage.setItem('es-tm', JSON.stringify({ name: '', workload: '', tasklist: [], archive: []}));
   }

   componentDidUpdate() {
      if(this.state.name !== this.state.ls.name ||
         this.state.workload !== this.state.ls.workload) this.updateLocalFromState();
      // console.log(this.state);
   }

   render() {
      return(
         <Fragment>
            <Modal extraClass={this.state.modal} action={this.state.modalAction} 
               updateTask={this.updateTask}
               saveTask={this.saveTask}
               closeModal={this.closeModal} 
               task={this.state.task} />
            <div className="container">
               <h1>TaskMaster</h1>
               <h3>Details</h3>
               <section className="details">
                  <Input 
                     name="name" 
                     type="text"
                     placeholder="What is your name?"
                     content={this.state.name} 
                     update={this.updateState} />
                  <Select 
                     name="workload" 
                     content={this.state.workload} 
                     options={this.workloadFields} 
                     update={this.updateState} />
               </section>
               <section>
                  <Button 
                     text="New Task" 
                     action={() => this.createModal('create')} 
                     classes='' />
               </section>
               <section className="tasklist">
                  {
                     this.state.tasklist.length > 0 ?
                        this.state.tasklist.map(task => 
                           <TaskItem 
                              key={task.id}
                              task={task} 
                              openModal={this.createModal} />) :
                        <h4>Create a task! What are you waiting for?</h4>

                  }
               </section>
            </div>
         </Fragment>
      )
   }
}

export default App;