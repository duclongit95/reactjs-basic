import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./TodoList.scss";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onDeleleTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todoList: [],
  onDeleleTodo: null,
};

function TodoList({ todoList, onDeleleTodo }) {
  const handleTodoClick = (todo, index) => {
    if (!onDeleleTodo) return;
    onDeleleTodo(todo, index);
  };

  return (
    <ul className="todo-list">
      {todoList.map((todo, index) => (
        <li
          className={classnames({ completed: todo.status === "completed" })}
          style={{ cursor: "pointer" }}
          onClick={() => handleTodoClick(todo, index)}
          key={index}
        >
          {todo.name}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
