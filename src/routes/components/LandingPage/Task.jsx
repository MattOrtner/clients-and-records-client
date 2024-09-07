import { Draggable } from "react-beautiful-dnd";

const Task = ({ index, task, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className=" flex text-lg justify-between items-center border border-slate-300 rounded-md my-2 m w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="pl-2">{task.content}</div>
          <div className="flex justify-end">
            <button
              className="text-red-600 w-[45px] rounded-none rounded-r-lg shadow-none"
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Task;
