import { useState } from "react";
import CurrentDay from "../currentDay";
import TodoColumn from "./components/LandingPage/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import "@atlaskit/css-reset";

export async function loader({ params }) {
  return {};
}
export async function action({ request, params }) {
  return {};
}

const Landing = () => {
  const [tasks, setTasks] = useState([
    { id: "task-1", content: "Take out the garbage" },
    { id: "task-2", content: "Watch my favorite show" },
    { id: "task-3", content: "Charge my phone" },
    { id: "task-4", content: "Cook dinner" },
  ]);
  console.log("tasks: ", tasks);
  // const initialData = {
  //   tasks: [

  //   ],
  //   columns: {
  //     "column-1": {
  //       id: "column-1",
  //       title: "To do",
  //       taskIds: ["task-1", "task-2", "task-3", "task-4"],
  //     },
  //   },
  //   columnOrder: ["column-1"],
  // };

  const onDragEnd = (result) => {
    console.log("result: ", result);
  };

  const deleteTask = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };

  return (
    <div className="flex flex-col h-full w-full gap-6 p-4">
      <h1 className="text-5xl">Happy {CurrentDay}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoColumn title="For today" tasks={tasks} deleteTask={deleteTask} />
      </DragDropContext>
    </div>
  );
};

export default Landing;

{
  /* <div>
        <h2 className="text-2xl">Appointments:</h2>
        <ul className="p-4">
          <li>Appointment 1</li>
          <li>Appointment 2</li>
          <li>Appointment 3</li>
        </ul>
      </div> */
}
