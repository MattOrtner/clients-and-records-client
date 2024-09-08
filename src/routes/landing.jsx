import { useState } from "react";
import CurrentDay from "../currentDay";
import TodoColumn from "./components/LandingPage/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { getTodaysSessions } from "../sessions";
import { useLoaderData } from "react-router-dom";
import standardTime from "../standardTime";

export async function loader({ params }) {
  const sessions = await getTodaysSessions();
  console.log("sessions: ", sessions);
  return { sessions };
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
  const { sessions } = useLoaderData();
  console.log("sessions: ", sessions);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // if the task didn't move
    if (destination.index === source.index) {
      return;
    }
    const removedTask = tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, removedTask[0]);
    setTasks(tasks);
  };

  const deleteTask = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(index, 1);
    setTasks([...tasks]);
  };

  return (
    <div className="flex flex-col h-full w-full gap-10 p-2">
      <h1 className="text-4xl text-center font-serif">Happy {CurrentDay}</h1>
      <div>
        <h2 className="text-2xl pl-2 pb-2 font-serif">Today's Agenda:</h2>
        <ul className="bg-green">
          {sessions.length &&
            sessions.map((session) => (
              <div
                key={session.id}
                className=" flex text-lg justify-between items-center border
              border-slate-300 rounded-md py-1 m w-full"
              >
                <div className="pl-2 flex gap-2">
                  <div>{session.first}</div>
                  <div>{session.last}</div>
                </div>
                <div className="pr-2">{session.time}</div>
              </div>
            ))}
        </ul>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoColumn
          title="Up Next"
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
        />
      </DragDropContext>
    </div>
  );
};

export default Landing;
