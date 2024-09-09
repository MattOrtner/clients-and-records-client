import { useState } from "react";
import TodoColumn from "./components/LandingPage/TodoColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { getTodaysSessions } from "../sessions";
import { useLoaderData } from "react-router-dom";
import Agenda from "./components/LandingPage/Agenda";

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
    { id: "task-1", content: "Confirm with Michelle about tomorrows session." },
    { id: "task-2", content: "ORDER LUNCH 🍕" },
    { id: "task-3", content: "Plan weekend retreat" },
    { id: "task-4", content: "Call mom 🧓🏼." },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
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
      <Agenda sessions={sessions} />
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoColumn
          title="Tasks"
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
        />
      </DragDropContext>
    </div>
  );
};

export default Landing;
