export async function getTodaysTodos(userId) {
  return await fetch(`http://localhost:3001/${userId}/todos`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("client: getCliensApi(): ", error);
    });
}

export async function createTodo(newTodo) {
  return await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
}

export async function deleteTodo(id) {
  return await fetch(`http://localhost:3001/todos`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.error(
          `Failed to delete todo: ${response.status} ${response.statusText}`
        );
      }
    })
    .catch((error) => {
      console.error(
        "client: deleteTodo(): Error deleting todo with id",
        id,
        error
      );
    });
}
