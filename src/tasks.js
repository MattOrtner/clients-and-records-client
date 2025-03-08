export async function getTodaysTasks(userId) {
  return await fetch(`${process.env.REACT_APP_API}${userId}/tasks`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("client: getClientsApi(): ", error);
    });
}

export async function createTask(newTask) {
  return await fetch(`${process.env.REACT_APP_API}tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
}

export async function deleteTask(id) {
  return await fetch(`${process.env.REACT_APP_API}tasks`, {
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
