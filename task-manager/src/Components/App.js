import React, { Component, Fragment } from 'react';

import Input from './elements/Input';
import Select from './elements/Select';
import Button from './elements/Button';
import Modal from './Modal';

class App extends Component {
   constructor(props) {
      super(props)
      this.state = {
         modal: null,
         ls: {},
         name: '',
         workload: '',
         tasklist: [],
      }
   }

   workloadFields = [
      'Light (< 50% Workload - > than 3 hours free)',
      'Busy (50-85% Workload - 1-3 hours available)',
      'Full (85-100% Workload - < 1 hour available)',
      'Overloaded (> 100% Workload - Risk to deadlines)'
   ];

   getLocalStorage = () => 
      JSON.parse(localStorage.getItem('es-tm')) || false;

   updateStateFromLocal = ls => 
      this.setState({ 'name': ls['name'], workload: ls['workload'], tasklist: ls['tasklist'] });
   
   updateLocalFromState = () => {
      const { name, workload, tasklist } = this.state;
      localStorage.setItem('es-tm', JSON.stringify({
         name,
         workload,
         tasklist,
      }));
      this.setState({ ...this.state, ls: this.getLocalStorage() });
   }

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

   createModal = (action) => {
      this.setState({
         modal: <Modal action={action} closeModal={this.closeModal}>

         </Modal>
      })
   }

   closeModal = e => {
      if(e.target.classList.contains('modal')) {
         e.stopPropagation();
         this.setState({ modal: null });
      }
   }

   componentDidMount() {
      const ls = this.getLocalStorage();
      if(ls) this.updateStateFromLocal(ls);
      if(!ls) localStorage.setItem('es-tm', JSON.stringify({ name: '', workload: '', tasklist: []}));
   }

   componentDidUpdate() {
      if(this.state.name !== this.state.ls.name ||
         this.state.workload !== this.state.ls.workload) this.updateLocalFromState();
   }

   render() {
      return(
         <Fragment>
            {this.state.modal}
            <div className="container">
               <h1>TaskMaster</h1>
               <h3>Details</h3>
               <section className="details">
                  <Input 
                     name="name" 
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
            </div>
         </Fragment>
      )
   }
}

export default App;