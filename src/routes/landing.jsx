import { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useLoaderData, useOutletContext } from "react-router-dom";
import TaskColumn from "./components/LandingPage/TaskColumn";
import Agenda from "./components/LandingPage/Agenda";
import CurrentDay from "../currentDay";
import { getTodaysSessions } from "../sessions";
import { deleteTask } from "../tasks";

const Landing = () => {
  const [user, setUser] = useOutletContext();

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // const fetchTasks = async () => {
    //   const tasks = await getTodaysTasks(user.id);
    //   setTasks(tasks);
    // };
    // fetchTasks();
  }, [user]);

  console.log("user", user);

  const testAPICall = async () => {
    const getTodaysTasks = async () => {
      await fetch(`${process.env.REACT_APP_API}`, {
        method: "GET",
      })
        .then((response) => {
          console.log("response", response);
          return response.json();
        })
        .catch((error) => {
          console.error("client: getClientsApi(): ", error);
        });
    };
    const result = await getTodaysTasks();
    if (result) {
      // Handle the result, e.g., update the state or show a notification
      setTasks(result);
    } else {
      // Handle the error, e.g., show an error message to the user
      console.error("Failed to fetch tasks");
    }
  };

  const sessions = [];

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
    console.log("response", response);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-y-auto">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={testAPICall}
      >
        Test API Call
      </button>
      <div className="">
        <h1 className="text-5xl text-gray-800 font-serif mb-10">
          Happy {CurrentDay}
        </h1>
        <Agenda sessions={sessions} />
      </div>
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
