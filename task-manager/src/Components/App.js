import React, { Component, Fragment } from 'react';

import Input from './elements/Input';
import Select from './elements/Select';
import Button from './elements/Button';
import { H1 } from './elements/Headers';


import Modal from './Modal';
import TaskItem from './TaskItem';
import ArchivedTask from './ArchivedTask';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
         modal: 'hide',
         modalAction: 'nothing',
         howManyTasks: 0,
         ls: {},
         task: {
            id: '',
            link: '',
            company: '',
            type: '',
            status: '',
            blocked: false,
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
      this.setState({ 'name': ls['name'], workload: ls['workload'], howManyTasks: ls['howManyTasks'], tasklist: ls['tasklist'], archive: ls['archive'] });
   
   updateLocalFromState = () => {
      const { name, workload, tasklist, archive, howManyTasks } = this.state;
      localStorage.setItem('es-tm', JSON.stringify({
         name,
         workload,
         howManyTasks,
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

   updateTask = async (newVal, name) => {
      switch(name) {
         case 'Clarizen': 
            if(newVal === this.state.task.link) return;
            await this.setState({ task: { ...this.state.task, link: newVal } });
            break;
         case 'company Name':
            if(newVal === this.state.task.company) return;
            await this.setState({ task: { ...this.state.task, company: newVal } });
            break;
         case 'Task Name':
            if(newVal === this.state.task.type) return;
            await this.setState({ task: { ...this.state.task, type: newVal } });
            break;
         case 'status':
            if(newVal === this.state.task.status) return;
            await this.setState({ task: { ...this.state.task, status: newVal } });
            break;
         case 'Blocked':
            console.log(newVal);
            if(newVal === this.state.task.status) return;
            await this.setState({ task: { ...this.state.task, blocked: newVal } });
            break;
         case 'Due date':
            if(newVal === this.state.task.completionDate) return;
            await this.setState({  task: { ...this.state.task, completionDate: newVal }  });
            break;
         default:
            console.error({ name, newVal });
      }
   }

   saveTask = async (e, task = null) => {
      const { link, company, type, blocked, status, completionDate } = task || this.state.task;
      const { id = `task-${this.state.tasklist.length}-${company}` } = task || this.state.task;
      e.stopPropagation();
      if(e.target.classList.contains('save')) {
         if(!link || !status) return;
         this.setState(
            { 
               tasklist: [ 
                  ...this.state.tasklist, 
                  {
                     id: `task-${this.state.howManyTasks}-${company.split(' ').join('')}`, 
                     link, company, type, status, blocked, completionDate
                  }
               ]
            }, 
         () => this.updateLocalFromState());
         this.setState({ howManyTasks: this.state.howManyTasks + 1 });
      }
      if(e.target.classList.contains('edit')) {
         const updateTask = { id, link, company, type, blocked, status, completionDate };
         this.setState(
            { tasklist: 
               [
                  ...this.state.tasklist.map(task => {
                     if(task.id === updateTask.id) {
                        return updateTask
                     }
                     return task;
                  })
               ]
            }, 
         () => this.updateLocalFromState());
      }
      if(e.target.classList.contains('archive')) {
         this.setState(
            { 
               tasklist: [
                  ...this.state.tasklist.filter(task => task.id !== id)
               ]
            }, 
         () => this.updateLocalFromState());
         this.setState({
            archive: [
               ...this.state.archive, { id, type, company, link }
            ]
         }, 
         () => this.updateLocalFromState());
      }
      if(e.target.classList.contains('delete')) {
         this.setState(
            { tasklist: 
               [
                  ...this.state.tasklist.filter(task => task.id !== id)
               ]
            }, 
         () => this.updateLocalFromState());
      }
      this.closeModal(e);
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
               blocked: false,
               status: '',
               completionDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}` 
            } 
         });
      if(action === 'edit') {
         const { id, task, link, company, type, blocked, status, completionDate } = editableTask;
         this.setState({
            task: {
               id, task, link, company, type, blocked, status, completionDate
            }
         });
      }
      this.setState({ modal: 'show', modalAction: action });
   }

   closeModal = e => {
      if(e.target.classList.contains('modal') || 
         e.target.classList.contains('close') || 
         e.target.classList.contains('save') ||
         e.target.classList.contains('edit') ||
         e.target.classList.contains('delete') || 
         e.target.classList.contains('archive')) {
            e.stopPropagation();
            this.setState({ modal: 'hide', modalAction: 'hidden' });
      }
   }

   // --------------------------------------- Drag and Drop

   handleDragEnd = async (result) => {
      if (!result.destination) return;

      const items = Array.from(this.state.tasklist);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      await this.setState({ tasklist: [ ...items ]});
      this.updateLocalFromState();
   }

   // --------------------------------------- Oh yeah the notes

   copyNotes = () => {
      const todaysDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
      let notesString = `<span style="font-weight: bold;">Name:</span> ${this.state.name}<br /><span style="font-weight: bold;">Date:</span> ${todaysDate}<br /><span style="font-weight: bold;">Workload:</span> ${this.state.workload}<br /><br />`;

      this.state.tasklist.forEach(task => {
         const date = 
         `${new Date(task.completionDate).getDate()}/${new Date(task.completionDate).getMonth() + 1}/${new Date(task.completionDate).getFullYear()}`; 
         notesString += `
            <span style="font-weight: italic;">${task.type}</span> for <span style="font-weight: italic;">${task.company}</span><br />
            <span style="font-weight: bold;">Clarizen:</span> <a href="${task.link}" target="_blank">${task.link}</a> | <span style="font-weight: bold;">Due Date:</span> ${date}<br />
            <span style="font-weight: bold;">Blocked:</span> ${task.blocked ? 'Yes' : 'No'}<br />
            <span style="font-weight: bold;">Notes:</span> ${task.status}<br /><br />`;
      });
      const newElement = document.createElement('div');
      newElement.setAttribute('id', 'copy');
      newElement.innerHTML = notesString.trim();
      document.querySelector('#root').appendChild(newElement);
      // Select
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStartBefore(newElement);
      range.setEndAfter(newElement);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');      
      window.getSelection().removeAllRanges();
      newElement.remove();
   }

   // --------------------------------------- Lifecycle Methods
   componentDidMount() {
      const ls = this.getLocalStorage();
      if(ls) this.updateStateFromLocal(ls);
      if(!ls) localStorage.setItem('es-tm', JSON.stringify({ name: '', workload: '', howManyTasks: 0, tasklist: [], archive: []}));
   }

   componentDidUpdate() {
      if(this.state.name !== this.state.ls.name ||
         this.state.workload !== this.state.ls.workload) this.updateLocalFromState();
   }

   render() {
      return(
         <Fragment>
            <Modal 
               extraClass={this.state.modal} 
               action={this.state.modalAction} 
               updateTask={this.updateTask}
               saveTask={this.saveTask}
               closeModal={this.closeModal} 
               task={this.state.task} />
            <header className="headerBar">
               <section className="container">
                  <H1 text='TaskMaster' classes='' />
                  <div className="addName">
                     <Input 
                        name="name" 
                        type="text"
                        displayName={false}
                        placeholder="What is your name?"
                        content={this.state.name} 
                        update={this.updateState} />
                  </div>
               </section>
            </header>
            <div className="container">
               <div className="tasksHeader">
                  <h2>
                     Tasks
                     <Button 
                        text="+" 
                        action={() => this.createModal('create')} 
                        classes='addTask' />                  
                  </h2> 
                  <div className="actions">
                     <Select 
                        name="workload"
                        displayName={false}
                        content={this.state.workload} 
                        options={this.workloadFields} 
                        update={this.updateState} />
                     <Button 
                        text="Notes" 
                        action={this.copyNotes}
                        classes="copyNotes" />
                  </div>
               </div>
               <main className="listContainer">
                  <section className="list">
                     <DragDropContext onDragEnd={this.handleDragEnd}>
                        <Droppable droppableId="tasks">
                           {(provided) => (
                              <section className="tasklist" 
                                 {...provided.droppableProps} 
                                 ref={provided.innerRef}
                              >
                                 {
                                    this.state.tasklist.map((task, index) => {
                                       return (
                                          <Draggable key={task.id} draggableId={task.id} index={index}>
                                             {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                   <TaskItem 
                                                      key={task.id}
                                                      task={task} 
                                                      openModal={this.createModal}
                                                      saveTask={this.saveTask} />
                                                </div>)}
                                          </Draggable>
                                    )})
                                 }
                                 {provided.placeholder}
                              </section>
                           )}
                        </Droppable>
                     </DragDropContext>               
                  </section>
                  {
                     this.state.archive.length > 0 ? 
                        <section className="list">
                           <h2>Archived</h2>
                           <section className="archiveList">
                              { this.state.archive.map(task => <ArchivedTask key={`archived-${task.id}`} />) }
                           </section>
                        </section>
                     : null
                  }
               </main>
            </div>
            {/* <button onClick={async () => {
               console.log(this.state);
            }}> State </button> */}

            {/* <button onClick={async () => {
               console.log(this.state.tasklist);
            }}> State </button>
            <button onClick={async () => {
               await this.setState({ tasklist: [ 
                  ...this.state.tasklist.map((task, index) => {
                     let newtask = null;
                     if(task.id === "task-6-Access Group") {
                        newtask = { ...task, id: `task-${this.state.howManyTasks}-${task.company.split(' ').join('')}`};
                        this.setState({ howManyTasks: this.state.howManyTasks + 1});
                     }                     
                     return newtask || task;
                  })
               ]});
            }}>
               tasks
            </button> */}
         </Fragment>
      )
   }
}

export default App;