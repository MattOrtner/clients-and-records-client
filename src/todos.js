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
