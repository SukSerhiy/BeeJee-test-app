import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'element-react';
import { SortDirectionSwitcher } from './SortDirectionSwitcher';
import './style.css';

class Filter extends Component {
  static propTypes = {
    onFilter: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      sortField: props.sortField,
      sortDirection: props.sortDirection
    };
  }

  onSortFieldChange = (v) => {
    const { onFilter } = this.props;
    const value = v || null;
    this.setState({ sortField: value });
    onFilter && onFilter({ sortField: value });
  }

  onSortDirectionChange = (v) => {
    const { onFilter } = this.props;
    this.setState({ sortDirection: v });
    onFilter && onFilter({ sortDirection: v });
  }

  render() {
    const { sortField } = this.state;
    return (
      <div className='filter'>
        <SortDirectionSwitcher
          onChange={this.onSortDirectionChange}
        />
        <Select 
          placeholder='Сортировать по...'
          value={sortField}
          onChange={this.onSortFieldChange}
          clearable={true}
        >
          <Select.Option value='username' label='По имени пользователя' />
          <Select.Option value='email' label='По email' />
          <Select.Option value='status' label='По статусу' />
        </Select>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { sortField, sortDirection } = state.toJS();
  return { sortField, sortDirection };
}

export default connect(mapStateToProps)(Filter);