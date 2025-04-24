import { Form } from "react-router-dom";
import { useState } from "react";
import { attemptLogin } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("default@mail.com");
  const [pass, setPass] = useState("");

  const handleLoginInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPass(value);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      alert("Ensure that both the email and password fields are not empty.");
      return;
    }
    const response = await attemptLogin(email, pass);
    if (response.status !== 200) {
      alert("Invalid email/pass combination");
    } else {
      // setUser({ id: response.id, first: response.first });
      setEmail("");
      setPass("");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center b-orange">
      <div className="w-[300px] flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl font-serif w-full ">Welcome</h1>
        <Form method="POST" className="flex flex-col gap-4 self-end w-full">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleLoginInput}
          />
          <input
            className="p-2 border-2 border-gray-300 rounded-md"
            type="password"
            placeholder="password"
            name="pass"
            value={pass}
            onChange={handleLoginInput}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleLoginSubmit}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
