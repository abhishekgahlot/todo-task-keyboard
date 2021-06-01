import React, { useRef, useEffect, useState } from 'react';
import { TodoContext } from './todoContext';

const ENTER_KEY = 'Enter';

export function Header() {
  const [name, setName] = useState('');
  const inputEl = useRef(null);
  const { addTodo, currEditIndex, handleManualClick } = React.useContext(TodoContext);

  useEffect(() => {
    if (currEditIndex === -1) {
      inputEl.current.focus();
    }
  }, [currEditIndex]);

  const handleChange = event => setName(event.target.value);

  const handleSubmit = event => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    addTodo(name);
    setName('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={inputEl}
        className="new-todo"
        placeholder="What needs to be done?"
        value={name}
        onInput={handleChange}
        onKeyUp={handleSubmit}
        onChange={() => {}}
        data-testid="todo-create"
        onClick={e => handleManualClick(e, -1)}
      />
    </header>
  );
}
