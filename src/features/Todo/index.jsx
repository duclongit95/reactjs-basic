import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { addTodo, removeTodo } from "./todoSlice";

function Todo(props) {
  const [fillterStatus, setFilterStatus] = useState("all");
  const dispatch = useDispatch();

  const todoList = useSelector((state) => state.todos);

  const onDeleleTodo = (todo, index) => {
    // const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    // setTodoList(newTodoList);

    // const index = todoList.findIndex((todo) => todo.id === todoId);
    // if (index <= -1) return;

    // const newTodoList = [...todoList];
    // newTodoList[index].status = !newTodoList[index].status;
    // setTodoList(newTodoList);

    const action = removeTodo(index);
    dispatch(action);
  };

  // const onDeleleTodo = (todo, index) => {
  //   const newTodoList = [...todoList];

  //   newTodoList[index] = {
  //     ...newTodoList,
  //     status: [index].status === "new" ? "completed" : "new",
  //   };
  //   setTodoList(newTodoList);
  // };

  const handleShowAllClick = () => {
    setFilterStatus("all");
  };

  const handleShowCompletedClick = () => {
    setFilterStatus("completed");
  };

  const handleShowNewClick = () => {
    setFilterStatus("new");
  };

  const renderTodoList = todoList.filter(
    (todo) => fillterStatus === "all" || fillterStatus === todo.status
  );

  const handleTodoFormSubmit = (value) => {
    const newTodo = {
      id: Math.random(),
      name: value.title,
      status: "new",
    };

    dispatch(addTodo(newTodo));
  };

  return (
    <div className="todo">
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todoList={renderTodoList} onDeleleTodo={onDeleleTodo} />
      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowNewClick}>Show New</button>
      </div>
    </div>
  );
}

export default Todo;
