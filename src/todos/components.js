import React, { PropTypes } from 'react';

export function Todo({ todo }) {
  if (todo.isDone) {
    return <strike>{todo.text}</strike>;
  }
  return <span>{todo.text}</span>;
}
Todo.propTypes = {
  todo: PropTypes.object.isRequired,
};


export function TodoList({ todos, toggleTodo, addTodo }) {
  const onSubmit = (event) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which === 13);
    const isLongEnough = text.length > 0;

    if (isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  };

  const toggleClick = id => event => toggleTodo(id); // eslint-disable-line no-unused-vars

  return (
    <div className="todo">
      <input
        type="text"
        placeholder="Add todo"
        className="todo__entry"
        onKeyDown={onSubmit}
      />
      <p> Hello world <strong>of Redux</strong></p>
      <ul className="todo__list">
        {todos.map(t => (
          <li
            key={t.get('id')}
            className="todo__item"
            onClick={toggleClick(t.get('id'))}
          >
            <Todo todo={t.toJS()} />
          </li>
        ))}
      </ul>
    </div>
  );
}
TodoList.propTypes = {
  todos: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};
