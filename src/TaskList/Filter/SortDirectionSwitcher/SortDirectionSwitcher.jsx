import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortDirections as sortDirectionEnum } from '../../../enums';
import './style.css';

class SortDirectionSwitcher extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    sortDirection: this.props.sortDirection
  };

  setAscending = () => {
    const { onChange } = this.props;
    const value = sortDirectionEnum.ASC;
    this.setState({ sortDirection: value });
    onChange && onChange(value);
  }

  setDescending = () => {
    const { onChange } = this.props;
    const value = sortDirectionEnum.DESC;
    this.setState({ sortDirection: value });
    onChange && onChange(value);
  }

  render() {
    const { sortDirection } = this.state;
    return (
      <div className='sort-direction-switcher'>
        {sortDirection === sortDirectionEnum.ASC && <div 
          className='asc' 
          onClick={this.setDescending}
        />}
        {sortDirection === sortDirectionEnum.DESC && <div
          className='desc'
          onClick={this.setAscending}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { sortDirection } = state.toJS();
  return { sortDirection };
};

export default connect(mapStateToProps)(SortDirectionSwitcher);