import { redirect, Form, useLoaderData } from "react-router-dom";
import { getSession, deleteSession } from "../sessions";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiAlphaXCircleOutline } from "@mdi/js";
import { useState } from "react";

import reverseDate from "../reverseDate";

export async function loader({ params }) {
  const session = await getSession(params);
  return { session };
}
export async function action({ request, params }) {}

export default function SessionPage() {
  const { session } = useLoaderData();
  const { date, time, paid, notes } = session;

  const reversedDate = reverseDate(date);

  const [isEditing, setIsEditing] = useState(false);
  const handleSave = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const [sessionNotes, setSessionNotes] = useState(notes || "Add a note.");
  const handleNotes = (e) => {
    const value = e.target.value;
    setIsEditing(true);
    setSessionNotes(value);
  };

  return (
    <div className="flex flex-col w-full gap-8 mt-8 h-full px-4">
      <InfoCluster reversedDate={reversedDate} time={time} paid={paid} />
      <div className="flex gap-8">
        <h1 className="text-3xl">Notes</h1>
        {isEditing ? (
          <button onClick={handleSave} className="bg-blue-300">
            Save
          </button>
        ) : (
          <button>Edit</button>
        )}
      </div>
      <div className="flex flex-col w-full h-1/2  rounded-lg">
        <Form>
          <textarea
            rows="15"
            cols="39"
            id="NOTES"
            value={sessionNotes}
            onChange={handleNotes}
          ></textarea>
        </Form>
      </div>
    </div>
  );
}

function InfoCluster({ reversedDate, time, paid }) {
  return (
    <div className="flex flex-col items-end text-xl gap-2">
      <div className=" flex gap-2">
        <p>{reversedDate}</p>
      </div>
      <div className="flex gap-2">
        <h2>Time:</h2>
        {time ? <p>{time}</p> : <p>-</p>}
      </div>
      <div className="flex gap-2">
        <h2 className="text-xl">Paid:</h2>
        {paid ? (
          <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
        ) : (
          <Icon path={mdiAlphaXCircleOutline} size={1.25} color="red" />
        )}
      </div>
      <Form method="post" action="delete">
        <button type="submit" className="delete-button">
          Delete
        </button>
      </Form>
    </div>
  );
}
