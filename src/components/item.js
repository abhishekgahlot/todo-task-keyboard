import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoContext } from './todoContext';

export function Item({ todo, idx }) {
  const { updateTodo, deleteTodo, currEditIndex } = React.useContext(TodoContext);
  const { id, completed } = todo;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const inputEl = useRef(null);

  const handleEdit = () => setEditing(true);
  const handleChange = event => setName(event.target.value);
  const handleBlur = () => {
    updateTodo({ ...todo, name });
    setEditing(false);
  };

  useEffect(() => {
    if (currEditIndex === idx) {
      setEditing(true);
    }
  }, [currEditIndex, editing]);

  useEffect(() => {
    if (editing) {
      inputEl.current.focus();
    }
  }, [editing]);

  return (
    <li className={classNames({ completed, editing })} data-testid="todo-item" data-todokey={todo.id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => updateTodo({ ...todo, completed: !completed })}
        />
        <label onDoubleClick={handleEdit} data-testid="todo-name">
          {todo.name}
        </label>
        <button className="destroy" onClick={() => deleteTodo(id)} data-testid="todo-remove" />
      </div>
      {editing && (
        <input
          ref={inputEl}
          className="edit"
          value={name}
          onInput={handleChange}
          onBlur={handleBlur}
          onChange={() => {}}
        />
      )}
    </li>
  );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired
};
