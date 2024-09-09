import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { useState } from "react";

const TodoColumn = ({ title, tasks, setTasks, deleteTask }) => {
  const [task, setTask] = useState("");

  const handleTaskInput = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: `task-${tasks.length + Math.round(Math.random() * 8)}`,
        content: task,
      },
    ]);
    setTask("");
  };

  return (
    <div className="border-b border-slate-400 p-2 pb-4">
      <h3 className="text-2xl font-mono pt-2 font-serif">{title}</h3>
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="task"
          placeholder="add task"
          value={task}
          onChange={handleTaskInput}
          className="border border-slate-300 rounded-md w-full"
        />
        <button onClick={handleAddTask}>
          <Icon path={mdiPlus} color="rgb(59 130 246)" size={1.1} />
        </button>
      </div>
      <Droppable droppableId="main">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, i) => (
              <Task
                key={task.id}
                index={i}
                task={task}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default TodoColumn;
