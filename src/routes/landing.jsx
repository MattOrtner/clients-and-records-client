import { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useLoaderData, useOutletContext } from "react-router-dom";
import TodoColumn from "./components/LandingPage/TodoColumn";
import Agenda from "./components/LandingPage/Agenda";
import CurrentDay from "../currentDay";
import { getTodaysSessions } from "../sessions";
import { getTodaysTodos } from "../todos";

const Landing = () => {
  const [user, setUser] = useOutletContext();

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodaysTodos = async () => {
      const todos = await getTodaysTodos(user.id);
      setTodos(todos);
    };
    fetchTodaysTodos();
  }, [user]);

  const sessions = [];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const updatedTasks = Array.from(todos);
    const [removedTask] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removedTask);
    setTodos(updatedTasks);
  };

  const deleteTask = (taskId) => {
    setTodos(todos.filter((task) => task.id !== taskId));
  };

  /**
   * uuid is created cclient side
   * uuid is sent to server as the id for the task that was just added
   */

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
            title="todos"
            todos={todos}
            setTodos={setTodos}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default Landing;
