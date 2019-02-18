import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'element-react';
import { FIELD_IS_REQUIRED } from '../constants/general'
import styles from './modalStyles';
import Modal from 'react-responsive-modal';

const formFields = {
  login: null,
  password: null
};

class AuthorizationModal extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        form: { ...formFields },
        rules: {
            login: [
                { required: true, message: FIELD_IS_REQUIRED, trigger: 'blur' }
            ],
            password: [
              { required: true, message: FIELD_IS_REQUIRED, trigger: 'blur' }
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
      });
    });
  }

  openModal() {
    this.setState({ 
      open: true, 
      form: { ...formFields }
    });
  }

  handleClose = () => {
    this.setState({ 
      open: false, 
      form: { ...formFields }
    });
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { form } = this.state;
    this.validateForm()
      .then(() => {
        onSubmit && onSubmit(form);
        this.handleClose();
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  onFieldChange(field, value) {
    const { form } = this.state;
    form[field] = value;
    this.setState({ form });
  }

  render() {
    const { open, form, form: { login, password }, rules } = this.state;
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
            prop='login'
          >
            <Input 
              placeholder='Логин'
              value={login}
              onChange={v => this.onFieldChange('login', v)}
            />
          </Form.Item>

          <Form.Item 
            prop='password'
          >
            <Input 
              placeholder='Пароль'
              value={password}
              onChange={v => this.onFieldChange('password', v)}
              type='password'
            />
          </Form.Item>

          <Button onClick={this.handleSubmit}>Save</Button>
        </Form>
      </Modal>
    )
  }
}

export default AuthorizationModal;