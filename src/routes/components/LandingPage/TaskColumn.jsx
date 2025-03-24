import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useState } from "react";
import { createTask } from "../../../tasks";
import { useOutletContext } from "react-router-dom";

const TaskColumn = ({ title, tasks, setTasks, handleDelete }) => {
  const [user, _] = useOutletContext();
  const [task, setTask] = useState("");

  const handleTaskInput = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task) return;
    const newTask = {
      content: task,
      index: tasks.length,
      userId: user.id,
    };
    const response = await createTask(newTask);
    if (response.status === 200) {
      setTasks((tasks) => [...tasks, newTask]);
      setTask("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-slate-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          name="task"
          placeholder="Add new task..."
          value={task}
          onChange={handleTaskInput}
          className="border border-slate-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-200 transition-shadow"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center transition-colors"
        >
          <Icon path={mdiPlus} size={1.1} />
        </button>
      </div>
      <Droppable droppableId="main">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {tasks.length ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  index={task.index}
                  task={task}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center text-slate-400 font-semibold py-4">
                No tasks available
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
