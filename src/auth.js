export async function attemptLogin(email, pass) {
  return await fetch(`${process.env.REACT_APP_API}login`, {
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
      console.log("error", error);

      console.error("client: loginAttempt(): ", error);
    });
}
