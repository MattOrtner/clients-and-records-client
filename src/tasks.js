export async function getTodaysTasks(userId) {
  return await fetch(`http://localhost:3001/${userId}/tasks`, {
    method: "GET",
  })
    .then((response) => {
      console.log("response: ", response);
      return response.json();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function createTask(newTask) {
  return await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
}

export async function deleteTask(id) {
  return await fetch(`http://localhost:3001/tasks`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.error(
          `Failed to delete task: ${response.status} ${response.statusText}`
        );
      }
    })
    .catch((error) => {
      console.error(
        "client: deleteTask(): Error deleting task with id",
        id,
        error
      );
    });
}
