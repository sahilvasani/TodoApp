import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const TaskList = ({ tasks, setStateTasks, setValueOfTask }) => {
  /**
   * @description - for #DRAGSTART to do task
   */
  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  /**
   * @description - for #DRAGEND to do task
   */
  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  /**
   * @description - for #DRAGENTER to do task
   */
  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  /**
   * @description - for #DRAGLEAVE to do task
   */
  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  /**
   * @description - for #DRAGOVER to do task
   */
  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  /**
   * @description - for #DROP to do task
   */
  const onDrop = (evt, value) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let updated = tasks.map((task) => {
      if (task.id === data) task.done = value;
      return task;
    });
    setStateTasks(updated);
  };

  /**
   * @description - for #DELETE to do task
   */
  const onDeleteTask = (e) => {
    var filteredArray = tasks?.filter((item) => item.id !== e.id);
    setStateTasks(filteredArray);
  };

  /**
   * @description - for #FILTER to do task
   */
  let pending = tasks.filter((t) => !t.done);
  let done = tasks.filter((t) => t.done);

  return (
    <div className="container">
      <div
        className="pending small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false)}
      >
        <h3>pending</h3>
        {pending?.map((task) => (
          <div
            className="task"
            key={task.id}
            id={task.id}
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
          >
            <div className="task-card">
              <div className="task-data">
                <p className="card-text">{task.title}</p>
                <p className="card-text">{task.description}</p>
              </div>
              <div className="task-button">
                <FaEdit
                  onClick={() => {
                    setValueOfTask(task);
                  }}
                />
                <MdDeleteForever onClick={() => onDeleteTask(task)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="done small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true)}
      >
        <h3>Done</h3>
        {done?.map((task) => (
          <div
            className="task"
            key={task.id}
            id={task.id}
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
          >
            <div className="task-card">
              <div className="task-data">
                <p className="card-text">{task.title}</p>
                <p className="card-text">{task.description}</p>
              </div>
              <div className="task-button">
                <FaEdit
                  onClick={() => {
                    setValueOfTask(task);
                  }}
                />
                <MdDeleteForever onClick={() => onDeleteTask(task)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
