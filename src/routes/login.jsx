import { Form } from "react-router-dom";

export default function Login({
  handleLoginInput,
  pass,
  email,
  handleLoginSubmit,
}) {
  return (
    <div className="w-screen h-screen flex justify-center items-center login">
      <div className=" h-3/4 w-3/4 flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl font-serif w-full ">Login</h1>
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
