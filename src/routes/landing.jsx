import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useOutletContext } from "react-router-dom";
import TaskColumn from "./components/LandingPage/TaskColumn";
import CurrentDay from "../currentDay";
import { getTodaysTasks, deleteTask } from "../tasks";

const Landing = () => {
  const [user] = useOutletContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTodaysTasks(user.id);
      if (tasks) {
        setTasks(tasks);
      }
    };
    fetchTasks();
  }, [user]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const updatedTasks = Array.from(tasks);
    const [removedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removedTask);
    setTasks(updatedTasks);
  };

  const handleDelete = async (taskId) => {
    const response = await deleteTask(taskId);
    if (response.status !== 200) {
      alert(
        `Error deleting task, please try again. Status Code: ${response.statusText}`,
      );
      console.error("Error deleting task:", response.statusText);
      return;
    }
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-y-auto">
      <h1 className="text-4xl text-gray-800 font-serif mb-10 p-2">
        Happy {CurrentDay} {user.first}!
      </h1>
      <div className="mt-5 flex-grow pb-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskColumn
            title="To Do"
            tasks={tasks}
            setTasks={setTasks}
            handleDelete={handleDelete}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default Landing;
