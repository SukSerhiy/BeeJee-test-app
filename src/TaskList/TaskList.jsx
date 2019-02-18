import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'element-react';
import Filter from './Filter';
import Task from './Task';
import AddTask from './AddTask';
import { TaskModal } from '../Modals'
import { setTasks } from '../actions/tasks';
import { setTotalTaskCount } from '../actions/totalTaskCount';
import { setSortField } from '../actions/sortField';
import { setSortDirection } from '../actions/sortDirection';
import { setPage } from '../actions/page';
import { getTasks, editTask } from '../api';
import { ErrorAlert } from '../Alerts';
import { DEVELOPER } from '../constants/general';
import './style.css';

/**
 * Maximum count of tasks in a page
 */
const COUNT_ON_PAGE = 3;

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      totalTaskCount: props.totalTaskCount
    };
    this.editigModalRef = React.createRef();
  }

  componentDidMount() {
    this.loadData(null);
  }

  loadData = async (params) => {
    try {
      const { sortField, sortDirection, page, setTasks, setTotalTaskCount } = this.props;
      params = params || { sortField, sortDirection, page };
      const apiParams = params ? { 
        sort_field: params.sortField, 
        sort_direction: params.sortDirection,
        page: params.page
      } : null;
      const response = await getTasks(DEVELOPER, apiParams);
      const { tasks, total_task_count } = response;
      const totalTaskCount = +total_task_count;
      this.setState({ tasks, totalTaskCount });
      setTasks(tasks);
      setTotalTaskCount(totalTaskCount);
    } catch (err) {
        ErrorAlert(err.message);
        console.error(err);
    }
  }

  onPaginationChange = (e) => {
    const { sortField, sortDirection, page, setPage } = this.props;
    const params = { ...{ sortField, sortDirection, page }, page: e };
    setPage(e);
    this.loadData(params);
  }

  onFilter = (prop) => {
    const { sortField, sortDirection, page, setSortField, setSortDirection } = this.props;
    if (prop.sortField === null) {
      prop.sortDirection = null;
    }
    const propKeys = Object.keys(prop);
    if (propKeys.includes('sortField')) {
      setSortField(prop.sortField);
    }
    if (propKeys.includes('sortDirection')) {
      setSortDirection(prop.sortDirection);
    }
    const params = { ...{ sortField, sortDirection, page }, ...prop };
    this.loadData(params);
  }

  openEditModal = (id) => {
    this.editigModalRef.current.openModal(id);
  }

  onEdit = (data) => {
    const { id, text, status } = data;
    const params = { text, status };
    const { tasks } = this.state;
    const task = tasks.find(t => t.id === id);
    const paramsDiff = Object.keys(params).reduce((result, prop) => {
      const value = params[prop];
      if (task[prop] !== value) {
        return { ...result, [prop]: value }
      } else {
        return result;
      }
    }, {});
    if (Object.keys(paramsDiff).length) {
      editTask(DEVELOPER, id, paramsDiff);
    }
    this.loadData();
  }

  render() {
    const { tasks, totalTaskCount } = this.state;
    const showPagination = totalTaskCount - COUNT_ON_PAGE > 0;
    return (
      <div id='task-list'>
        <div className='tools'>
          {totalTaskCount > 0 && <Filter
            onFilter={this.onFilter}
          />}
          <AddTask />
        </div>
        {tasks.map((task, key) => (
          <Task 
            key={key} 
            data={task} 
            onEdit={this.openEditModal} 
          />
        ))}
        {showPagination && <Pagination 
          onCurrentChange={this.onPaginationChange} 
          layout='prev, pager, next' 
          pageSize={COUNT_ON_PAGE} 
          total={totalTaskCount} 
        />}
        {totalTaskCount === 0 && <div className='not-tasks-msg'>
          <span>Задач пока нет</span>
        </div>}
        <TaskModal 
          ref={this.editigModalRef}
          editingMode={true}
          onSubmit={this.onEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { tasks, totalTaskCount, sortField, sortDirection, page } = state.toJS();
  return { tasks, totalTaskCount, sortField, sortDirection, page };
};

const mapDispatchToProps = dispatch => ({
  setTasks: payload => dispatch(setTasks(payload)),
  setTotalTaskCount: payload => dispatch(setTotalTaskCount(payload)),
  setSortField: payload => dispatch(setSortField(payload)),
  setSortDirection: payload => dispatch(setSortDirection(payload)),
  setPage: payload => dispatch(setPage(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);