import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

export default class TaskList extends Component {
  constructor() {
    super();
    this.handleSubmit = (event) => {
      event.preventDefault();
      const { id } = event.target;
      const { submitValue } = this.props;
      submitValue(id);
    };
    this.handleChange = (event) => {
      const { value } = event.target;
      const { id } = event.target;
      const { editValue } = this.props;
      editValue(id, value);
    };
  }

  render() {
    const { todoListData, complited, deleted, editBtn } = this.props;
    const elements = todoListData.map((elem) => {
      return (
        <li key={elem.id} id={elem.id} className={elem.name}>
          <Task todoListData={elem} complited={complited} deleted={deleted} editBtn={editBtn} id={elem.id} />
          <form id={elem.id} onSubmit={this.handleSubmit}>
            {elem.name === 'editing' ? (
              <input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                id={elem.id}
                type="text"
                className="edit"
                value={todoListData[elem.id - 1].description}
                onChange={this.handleChange}
              />
            ) : null}
          </form>
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propTypes = {
  todoListData: PropTypes.arrayOf(PropTypes.object).isRequired,
  complited: PropTypes.func.isRequired,
  deleted: PropTypes.func.isRequired,
  editBtn: PropTypes.func.isRequired,
};
