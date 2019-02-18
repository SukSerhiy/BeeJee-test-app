import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'element-react';
import { AuthorizationModal } from './Modals'
import { setAuthorized, setUnauthorized } from './actions/isAuthorized';
import { VALID_LOGIN, VALID_PASSWORD, INVALID_LOGIN_OR_PASSWORD_WAS_ENTERED } from './constants/general';
import { ErrorAlert } from './Alerts';

const tryAuthorize = (params, onOK) => {
  const { login, password } = params;
  if (login === VALID_LOGIN && password === VALID_PASSWORD) {
    onOK();
  } else {
    throw new Error(INVALID_LOGIN_OR_PASSWORD_WAS_ENTERED);
  }
}

class Authorize extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      isAuthorized: props.isAuthorized
    };
  }

  componentDidUpdate() {
    if (this.state.isAuthorized !== this.props.isAuthorized) {
      this.setState({ isAuthorized: this.props.isAuthorized });
    }
  }

  openModal = () => {
    this.modalRef.current.openModal();
  }

  handleLogin = (params) => {
    const { setAuthorized } = this.props;
    try {
      tryAuthorize(params, setAuthorized);
    } catch(err) {
      console.error(err);
      ErrorAlert(err.message);
    }
  }

  handleLogout = () => {
    const { setUnauthorized } = this.props;
    setUnauthorized();
  }

  render() {
    const { isAuthorized } = this.state;
    return (
      <Fragment>
        {!isAuthorized && <Button onClick={this.openModal}>Войти</Button>}
        {isAuthorized && <Button onClick={this.handleLogout}>Выйти</Button>}

        <AuthorizationModal 
          ref={this.modalRef} 
          onSubmit={this.handleLogin}
        />
      </Fragment>
    )
  }
}

const mapStateToProps  = state => {
  const { isAuthorized } = state.toJS();
  return { isAuthorized };
};

const mapDispatchToProps = dispatch => ({
  setAuthorized: payload => dispatch(setAuthorized(payload)),
  setUnauthorized: payload => dispatch(setUnauthorized(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);