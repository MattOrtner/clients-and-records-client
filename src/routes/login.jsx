import { Form } from "react-router-dom";

export default function Login({
  handleLoginInput,
  email,
  pass,
  handleLoginSubmit,
  isLoading,
}) {
  return (
    <div className="absolute top-0 bottom-0 left-0 w-full h-full flex flex-col md:flex-row justify-center items-center bg-green-100 overflow-scroll">
      <div className="flex flex-col items-center justify-evenly p-10 max-w-[800px] mr-4 rounded-lg">
        <div>
          <h1 className="text-4xl font-serif">Welcome to New Leaf</h1>
          <h3 className="text-xl font-serif">
            Easily create and manage client profiles, schedule sessions, track
            payments, and take notes.
          </h3>
          <br />
          <p className="font-serif text-xl">
            Currently being used by therapists and physical trainers.
          </p>
        </div>
        <h3 className="text-2xl font-serif rounded-lg text-end w-4/5 py-2">
          created by Matthew Ortner
        </h3>
      </div>
      <div className="w-[300px] flex flex-col justify-center items-center gap-8 bg-orange-200 p-10 py-16 rounded-md">
        <h1 className="text-3xl font-serif w-full ">Login</h1>
        <Form method="POST" className="flex flex-col gap-4 w-full">
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
          {isLoading ? (
            <button
              className="bg-blue-100 p-2 rounded-md font-serif text-lg hover:bg-blue-300 transition-all duration-300"
              disabled
            >
              Logging in...
            </button>
          ) : (
            <button
              className="bg-blue-100 p-2 rounded-md font-serif text-lg hover:bg-blue-300 transition-all duration-300"
              onClick={handleLoginSubmit}
              // type="submit"
            >
              Login
            </button>
          )}
        </Form>
      </div>
    </div>
  );
}
