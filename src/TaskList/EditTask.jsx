import React, { Component } from 'react';
import { TaskModal } from '../Modals'
import { editTask } from '../api';
import { DEVELOPER } from '../constants/general';


class EditTask extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  onOpen = (id) => {
    this.modalRef.current.openModal(id);
  }

  onSubmit() {
    editTask(DEVELOPER, {});
  }

  render() {
    return (
      <TaskModal 
        ref={this.modalRef}
        editingMode={true}
      />
    )
  }
}

export default EditTask;