import { useState } from "react";
import CurrentDay from "../currentDay";
import TodoColumn from "./components/LandingPage/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { getTodaysSessions } from "../sessions";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const sessions = await getTodaysSessions();
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
    <div className="flex flex-col h-full w-full gap-6 p-2">
      <h1 className="text-4xl font-serif">Happy {CurrentDay}</h1>
      <div>
        <h2 className="text-2xl bg-blue-200 pl-4 pb-2">Agenda:</h2>
        <ul className="bg-green">
          {sessions.length &&
            sessions.map((session) => (
              <div
                key={session.id}
                className=" flex text-lg justify-between 
                border border-slate-300 rounded-md pl-2 py-2"
              >
                <div>{session.first}</div>
                <div>{session.last}</div>
                <div>{session.time}</div>
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
