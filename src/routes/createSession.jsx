import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { createSession, getSession, updateSession } from "../sessions";

export async function action({ request, params }) {
  switch (request.name) {
    case "save": {
      const formData = await request.formData();
      const sessionInfo = Object.fromEntries(formData);
      await createSession(params.contactId, sessionInfo);
      return redirect(`/contacts/${params.contactId}`);
    }
    case "cancelle": {
      return redirect(`/contacts/${params.contactId}`);
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}

export async function loader({ params }) {
  const session = await getSession(params);
  return { session };
}

export default function CreateSession() {
  const { session } = useLoaderData();

  return (
    <div className="w-full h-full flex justify-center items-center gap-8">
      <Form method="post">
        <p className="flex flex-col gap-4 font-light">
          <span className="text-2xl fixed top-40">New Session</span>
          <span className="text-xl">Date</span>
          <input
            aria-label="date"
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
          <span className="text-xl">Time</span>
          <input type="time" name="time" aria-label="time of day" />
          <label>
            <div className="flex gap-4 w-[50%]">
              <label className="text-xl">Paid</label>
              <input
                className="w-[50%]"
                aria-label="payment"
                type="checkbox"
                name="paid"
              />
            </div>
          </label>
        </p>
        <div className="fixed flex bottom-14 right-10 h-9 min-w-[50%] gap-4 ">
          <button
            className=" flex-1 bg-red-400 text-white items-center"
            type="submit"
            name="cancelle"
          >
            Cancelle
          </button>
          <button className="flex-1" name="save" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
