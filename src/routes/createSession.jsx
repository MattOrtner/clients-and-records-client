import { Form, redirect, useLoaderData } from "react-router-dom";
import { createSession } from "../sessions";

export async function action({ request, params }) {
  const { userId, clientId } = params;
  const formData = await request.formData();
  let intent = formData.get("intent");

  if (intent === "cancel") {
    // await deleteSession(params);
    return redirect(`/${params.userId}/clients`);
  } else {
    const sessionInfo = Object.fromEntries(formData);
    await createSession(clientId, sessionInfo);
    return redirect(`/${userId}/clients/${clientId}`);
  }
}

export async function loader({ params }) {
  // const session = await getSession(params);
  // return { session };
  return { session: {} };
}

export default function CreateSession() {
  const { session } = useLoaderData();

  return (
    <div className="w-[85%] h-full flex flex-col justify-center">
      <div className="text-3xl font-light mb-28">Book a Session</div>
      <Form method="POST">
        <p className="flex flex-col gap-4 font-light">
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
            <label className="text-xl flex justify-center items-center gap-4 pt-8">
              Paid
              <input
                className="h-6 w-6 "
                aria-label="payment"
                type="checkbox"
                name="paid"
              />
            </label>
          </label>
        </p>
        <div className="flex w-full gap-2 pt-8">
          <div className="flex flex-1">
            <button
              className="flex-1 items-center"
              name="intent"
              value="cancel"
            >
              Cancel
            </button>
          </div>
          <div className="flex flex-1">
            <button className="flex-1 bg-blue-300" type="submit">
              Save
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
