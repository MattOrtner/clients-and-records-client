import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { createSession, getSession, updateSession } from "../sessions";

export async function action({ request, params }) {
  // contact and session used similar switch statements, check git diff
  const formData = await request.formData();
  const sessionInfo = Object.fromEntries(formData);
  const session = await updateSession(
    params.contactId,
    params.sessionId,
    sessionInfo
  );
  console.log("session:", session);
  return redirect(`/contacts`);
}

function useCancelleForm() {
  // return redirect(`/contacts/${contactId}`);
}

export async function loader({ params }) {
  const session = await getSession(params);
  return { session };
}

export default function CreateSession() {
  const { session } = useLoaderData();

  return (
    // <div className="w-full h-full flex justify-center items-center gap-8">
    <div className="w-[85%] h-full flex flex-col justify-center mt-10 gap-8">
      <Form method="post">
        <p className="flex flex-col gap-4 font-light">
          <span className="text-2xl">New Session</span>
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
            <div className="flex justify-center items-center gap-4 ">
              <label className="text-xl">Paid</label>
              <input
                className="h-6 w-6"
                aria-label="payment"
                type="checkbox"
                name="paid"
              />
            </div>
          </label>
        </p>
        <div className="flex gap-2 pt-4">
          <button
            className=" bg-red-400 text-white items-center"
            name="cancelle"
            // onClick={useCancelleForm}
          >
            Cancelle
          </button>
          <button className="flex-1" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
