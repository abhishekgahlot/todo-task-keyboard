import React from 'react';
import { Item } from './item';
import { TodoContext } from './todoContext';

export function List() {
  const { todos, handleManualClick } = React.useContext(TodoContext);

  return (
    <section className="main">
      <ul className="todo-list" onClick={handleManualClick}>
        {todos.map((todo, idx) => (
          <Item key={todo.id} todo={todo} idx={idx} />
        ))}
      </ul>
    </section>
  );
}
