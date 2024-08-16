import { useSubmit, Form, useLoaderData } from "react-router-dom";
import { getSession, deleteSession, updateSession } from "../sessions";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import { useState } from "react";
import NavBackButton from "./components/NavBackButton";
import reverseDate from "../reverseDate";
import standardTime from "../standardTime";

export async function loader({ params }) {
  const session = await getSession(params);
  return { session };
}
export async function action({ request, params }) {
  const { contactId, sessionId } = params;
  const formData = await request.formData();
  const updatedNotes = Object.fromEntries(formData);
  console.log("updatedNotes", updatedNotes);
  const updatedSession = await updateSession(
    contactId,
    sessionId,
    updatedNotes
  );
  console.log("updatedSession", updatedSession);
  return updatedSession;
}

export default function SessionPage() {
  const { session } = useLoaderData();
  const submit = useSubmit();
  const { date, time, paid, notes } = session;

  const [isEditing, setIsEditing] = useState(false);
  const [sessionNotes, setSessionNotes] = useState(notes);

  // add some cute saved animation
  const handleSave = () => {
    console.log("awesome?");
    setIsEditing((isEditing) => !isEditing);
    submit(sessionNotes);
  };

  const handleNotes = (e) => {
    const value = e.target.value;
    setIsEditing(true);
    setSessionNotes(value);
  };

  return (
    <div className="flex flex-col w-full gap-8 mt-8 h-full px-4">
      <NavBackButton />
      <InfoCluster date={date} time={time} paid={paid} />
      <Form method="post" className="h-[60%]">
        <div className="flex gap-8 mb-4">
          <h1 className="text-3xl">Notes</h1>
          {isEditing && (
            <button type="submit" className="bg-blue-300">
              Save
            </button>
          )}
        </div>
        <textarea
          id="NOTES"
          placeholder="Add some session notes."
          value={sessionNotes}
          onChange={handleNotes}
          name="notes"
          className="outline-blue-300"
        ></textarea>
      </Form>
    </div>
  );
}

function InfoCluster({ date, time, paid }) {
  const reversedDate = reverseDate(date);
  const newTime = standardTime(time);
  return (
    <div className="flex flex-col items-end text-xl gap-2">
      <div className=" flex gap-2">
        <p>{reversedDate}</p>
      </div>
      <div className="flex gap-2 font text-2xl">
        <h2>Time:</h2>
        {newTime ? <p>{newTime}</p> : <p>-</p>}
      </div>
      <div className="flex gap-2">
        <h2 className="text-xl">Paid:</h2>
        {paid ? (
          <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
        ) : (
          <Icon path={mdiMinusCircleOutline} size={1.25} color="red" />
        )}
      </div>
      <Form method="post" action="delete">
        <button type="submit" className="delete-button">
          Remove
        </button>
      </Form>
    </div>
  );
}
