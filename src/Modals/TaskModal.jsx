import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'element-react';
import Modal from 'react-responsive-modal';
import styles from './modalStyles';
import { FIELD_IS_REQUIRED, ENTER_VALID_EMAIL } from '../constants/general'

const formFields = {
  username: null,
  email: null,
  text: null,
  status: 0
};

class TaskModal extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    editingMode: PropTypes.bool
  }

  static defaultProps = {
    editingMode: false
  }

  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
        open: false,
        form: { ...formFields, ...data },
        rules: {
            username: [
                { required: true, message: FIELD_IS_REQUIRED, trigger: 'blur' }
            ],
            email: [
              { required: true, message: FIELD_IS_REQUIRED, trigger: 'blur' },
              { type: 'email', message: ENTER_VALID_EMAIL, trigger: 'blur' }
            ]
        },
    }
    this.formRef = React.createRef();
  }

  validateForm () {
    const self = this;
    return new Promise((resolve, reject) => {
      self.formRef.current.validate(valid => {
        if (valid) {
          resolve();
        } else {
          reject(new Error('validate failed'));
        }
      })
    });
  }

  openModal (taskID = null) {
    const { tasks } = this.props;
    const task = taskID ? tasks.find(t => t.id === taskID) : {};
    this.setState({ 
      open: true, 
      form: { ...formFields, ...task }
    });
  }

  handleClose = () => {
    this.setState({ 
      open: false, 
      form: { ...formFields }
    });
  }

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    const { form } = this.state;
    this.validateForm()
      .then(() => {
        onSubmit && onSubmit(form);
        this.handleClose();
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  onFieldChange(field, value) {
    const { form } = this.state;
    form[field] = value;
    this.setState({ form });
  }

  render() {
    const { open, form, form: { username, email, text, status }, rules } = this.state;
    const { editingMode } = this.props;
    return (
      <Modal
        open={open}
        styles={styles}
        onClose={this.handleClose}
        center
      >
        <Form
          ref={this.formRef}
          model={form}
          rules={rules}
        >
          <Form.Item 
            prop='username'
          >
            <Input 
              placeholder='Enter username'
              value={username}
              onChange={v => this.onFieldChange('username', v)}
              disabled={editingMode ? true : false}
            />
          </Form.Item>

          <Form.Item 
            prop='email'
          >
            <Input 
              placeholder='Enter email'
              value={email}
              onChange={v => this.onFieldChange('email', v)}
              disabled={editingMode ? true : false}
            />
          </Form.Item>

          <Form.Item 
            prop='text'
          >
            <Input 
              type='textarea'
              autosize={{ minRows: 2}}
              placeholder='Enter text'
              value={text}
              onChange={v => this.onFieldChange('text', v)}
            />
          </Form.Item>

          {editingMode && <Form.Item 
            prop='status'
          >
            <Select 
              value={status}
              onChange={v => this.onFieldChange('status', v)}
            >
              <Select.Option value={0} label='Не выполнено' />
              <Select.Option value={10} label='Выполнено' />
            </Select>
          </Form.Item>}

          <Button onClick={this.handleSubmit}>Save</Button>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const { tasks } = state.toJS();
  return { tasks }
}

export default connect(mapStateToProps, null, null, { forwardRef : true })(TaskModal);