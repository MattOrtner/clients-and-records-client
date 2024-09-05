import { Draggable } from "react-beautiful-dnd";

const Task = ({ index, task, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className=" flex text-lg justify-between items-center border border-slate-300 rounded-md p-2 mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
          <button
            className="text-red-600 w-[45px] rounded-lg"
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
