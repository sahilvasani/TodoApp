import React, { useState } from "react";
import TaskList from "./components/TaskList";
import "./styles.css";
import { ExportCSV } from "./components/ExcelList";

function App() {
  const [stateTasks, setStateTasks] = useState([]);
  const [valueOfTask, setValueOfTask] = useState({
    id: "",
    title: "",
    description: "",
    done: false,
  });

  /**
   * @description - for #ADD to do task
   */
  const handleAdd = () => {
    var task = {
      title: valueOfTask.title.trim(),
      description: valueOfTask.description.trim(),
      id: Math.random().toString(16).slice(2),
      done: false,
    };
    setStateTasks([...stateTasks, task]);
    setValueOfTask({
      id: "",
      title: "",
      description: "",
      done: false,
    });
  };

  /**
   * @description - for #UPDATE to do task
   */
  const handleUpdate = () => {
    let temp = stateTasks;
    var findId = stateTasks.findIndex((data) => data.id === valueOfTask.id);
    temp[findId] = valueOfTask;
    setStateTasks(temp);
    setValueOfTask({
      id: "",
      title: "",
      description: "",
      done: false,
    });
  };

  return (
    <div className="App">
      <p className="App-label">Todo App</p>
      <div className="input-main-div">
        <div className="input-wrapper-button">
          <input
            type="text"
            className="textfield"
            placeholder="Enter task title"
            name="title"
            value={valueOfTask.title}
            onChange={(e) => {
              setValueOfTask({
                ...valueOfTask,
                title: e.target.value,
              });
            }}
          />
          <input
            type="text"
            className="textfield"
            placeholder="Enter task description"
            name="description"
            value={valueOfTask.description}
            onChange={(e) => {
              setValueOfTask({
                ...valueOfTask,
                description: e.target.value,
              });
            }}
          />
        </div>
        <button
          className="submit-button"
          disabled={
            valueOfTask.title.trim() === "" ||
            valueOfTask.description.trim() === ""
          }
          onClick={() => {
            valueOfTask.id ? handleUpdate() : handleAdd();
          }}
          style={{
            opacity:
              valueOfTask.title.trim() === "" ||
              valueOfTask.description.trim() === ""
                ? 0.8
                : 1,
          }}
        >
          Submit
        </button>
        <ExportCSV csvData={stateTasks} />
      </div>
      <TaskList
        tasks={stateTasks}
        setStateTasks={setStateTasks}
        setValueOfTask={setValueOfTask}
      />
    </div>
  );
}

export default App;
