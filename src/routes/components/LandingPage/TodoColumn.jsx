import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const TodoColumn = ({ title, tasks, deleteTask }) => {
  return (
    <div className="m-2 border border-slate-300 rounded-md">
      <h3 className="text-3xl p-2">{title}</h3>
      <Droppable droppableId="1">
        {(provided) => (
          <div
            className="p-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
