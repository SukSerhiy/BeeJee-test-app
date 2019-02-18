import React, { Component } from 'react';
import { Button } from 'element-react';
import { TaskModal } from '../Modals'
import { createTask } from '../api';
import { DEVELOPER } from '../constants/general';
import { ErrorAlert } from '../Alerts';


class AddTask extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  handleClick = (e) => {
    this.modalRef.current.openModal();
  }

  saveTask = async (params) => {
    try {
      createTask(DEVELOPER, params);
    } catch(err) {
      console.error(err);
      ErrorAlert(err.message);
    }
  }

  render() {
    return (
      <div className='add-task'>
         <Button 
            className='add-task-btn'
            onClick={this.handleClick} 
          >
            Добавить задачу
          </Button>
          <TaskModal 
            ref={this.modalRef}
            onSubmit={this.saveTask}
          />
      </div>
    )
  }
}

export default AddTask;