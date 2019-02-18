import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';

const Task = props => {
  const { data: { username, email, text } } = props;

  const onEdit = () => {
    const { data: { id }, onEdit, isAuthorized } = props;
    isAuthorized && onEdit && onEdit(id);
  }

  const { isAuthorized, data: { status } } = props;
console.log(status)
  return (
    <div className='task'>
      {status === 10 && <div className='check' />}
      {isAuthorized && <div 
        className='edit-button' 
        onClick={onEdit}
      />}
      <div className='author'>
        <span>{username}</span>
        <span>{email}</span>
      </div>
      <div className='text'>
        {text}
      </div>
    </div>
  )
}

Task.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.number
  }),
  onEdit: PropTypes.func
};

const mapStateToProps = state => {
  const { isAuthorized } = state.toJS();
  return { isAuthorized };
}

export default connect(mapStateToProps)(Task);
