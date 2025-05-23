export async function attemptLogin(email, pass) {
  const apiUrl = process.env.REACT_APP_API;
  return await fetch(`${apiUrl}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, pass }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return { status: response.status };
      }
    })
    .catch((error) => {
      return { error: error.message };
    });
}
