export async function attemptLogin(email, pass) {
  return await fetch(`http://localhost:3001/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pass }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("client: loginAttempt(): ", error);
    });
}
