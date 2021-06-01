import React, { useState, useEffect } from 'react';
import { Header } from './header';
import { List } from './list';
import { TodoContext } from './todoContext';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

import { moveDown, moveUp } from '../utils/utils';

const INITIAL_TODOS = [
  {
    name: 'Todo 1',
    completed: false,
    id: 0
  },
  {
    name: 'Todo 2',
    completed: true,
    id: 1
  }
];

export function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [arrowUp, arrowDown, shiftEnter] = useKeyboardShortcuts();
  const [currEditIndex, setCurrEditIndex] = useState(-1);

  const updateTodo = todo => {
    const copy = Array.from(todos);
    const old = copy.find(t => t.id === todo.id);
    old.name = todo.name;
    old.completed = todo.completed;
    setTodos(copy);
  };
  const addTodo = name => setTodos([...todos, { name, id: Date.now() }]);
  const deleteTodo = id => setTodos(Array.from(todos).filter(t => t.id !== id));

  const handleManualClick = (e, overrideIdx = false) => {
    if (overrideIdx) {
      setCurrEditIndex(overrideIdx);
      return;
    }
    e.stopPropagation();
    const nearestTodo = e.target.closest('li');
    setCurrEditIndex(Number(nearestTodo.getAttribute('data-todokey')));
  };

  useEffect(() => {
    if (arrowUp) {
      setCurrEditIndex(moveUp(currEditIndex));
    } else if (arrowDown) {
      setCurrEditIndex(moveDown(currEditIndex, todos.length));
    } else if (shiftEnter) {
      if (currEditIndex > -1) {
        const getTodoByIdx = { ...todos[currEditIndex], completed: !todos[currEditIndex].completed };
        updateTodo(getTodoByIdx);
      }
    }
  }, [arrowUp, arrowDown, shiftEnter]);

  return (
    <div id="app">
      <section className="todoapp">
        <TodoContext.Provider value={{ todos, updateTodo, deleteTodo, addTodo, currEditIndex, handleManualClick }}>
          <Header />
          {todos.length && <List />}
        </TodoContext.Provider>
      </section>
    </div>
  );
}
