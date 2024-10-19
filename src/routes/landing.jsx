import { useState, useContext } from "react";
import TodoColumn from "./components/LandingPage/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { getTodaysSessions } from "../sessions";
import { useLoaderData } from "react-router-dom";
import Agenda from "./components/LandingPage/Agenda";
import CurrentDay from "../currentDay";

export async function loader({ params }) {
  const sessions = await getTodaysSessions();
  return { sessions };
}

export async function action({ request, params }) {
  return {};
}

const Landing = () => {
  const { sessions } = useLoaderData();
  const [tasks, setTasks] = useState([
    { id: "task-1", content: "Follow up with Michelle" },
    { id: "task-2", content: "ORDER LUNCH 🍕🍕🍕" },
    { id: "task-3", content: "Plan weekend retreat" },
    { id: "task-4", content: "Call mom 💅" },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const updatedTasks = Array.from(tasks);
    const [removedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removedTask);
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 p-4  overflow-y-auto">
      <div className="">
        <h1 className="text-5xl text-gray-800 font-serif mb-10">
          Happy {CurrentDay}
        </h1>
        <Agenda sessions={sessions} />
      </div>
      <div className="mt-10 flex-grow pb-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoColumn
            title="Tasks"
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default Landing;
