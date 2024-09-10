import { Draggable } from "react-beautiful-dnd";

const Task = ({ index, task, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className=" flex text-lg justify-between items-center border border-slate-300 rounded-md my-2 m w-full shadow-md"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="pl-2 text-wrap">{task.content}</div>
          <div className="flex justify-end">
            <button
              className="text-red-600 w-[45px] font-bold bg-red-100 rounded-lg shadow-none border-none"
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
