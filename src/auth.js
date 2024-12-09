export async function attemptLogin(email, pass) {
  return await fetch(`http://localhost:3001/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pass }),
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        return { status: response.status };
      }
    })
    .catch((error) => {
      console.log("error", error);

      console.error("client: loginAttempt(): ", error);
    });
}
