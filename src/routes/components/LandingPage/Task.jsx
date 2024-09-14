import { Draggable } from "react-beautiful-dnd";

const Task = ({ index, task, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="text-gray-800 font-medium break-words w-full pr-4">
            {task.content}
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded-lg w-[45px] flex-shrink-0 hover:bg-red-600 transition-colors"
            onClick={() => deleteTask(task.id)}
          >
            X
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
