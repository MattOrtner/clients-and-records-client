import { redirect, Form, useLoaderData } from "react-router-dom";
import { getSession, deleteSession } from "../sessions";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiAlphaXCircleOutline } from "@mdi/js";
import NavigateHomeButton from "../navigation";
import { useState } from "react";

export async function loader({ params }) {
  const session = await getSession(params);
  return { session };
}
export async function action({ request, params }) {}

export default function SessionPage() {
  const { session } = useLoaderData();
  const { date, time, paid, notes } = session;
  const [isEditing, setIsEditing] = useState(false);

  const handleNotes = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleSesssionInfo = () => {};
  // Save button for notes
  /* <button type="submit" intent="save">Save</button> */

  return (
    <div className="flex w-full h-full flex-col m-8">
      <NavigateHomeButton />
      <div className="flex flex-col gap-8 mt-8 h-full">
        <div className="flex flex-col w-full items-end text-xl gap-2">
          <div className=" flex gap-2">
            <p>{date}</p>
          </div>
          <div className="flex gap-2">
            <h2>Time:</h2>
            <p>{time}</p>
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
        <h1 className="text-3xl">Notes</h1>
        <div
          className="flex flex-col w-full h-1/2 bg-red-
        200 p-2 border rounded-lg"
        >
          <p>
            {notes.length
              ? notes
              : "You don't have any notes for this session yet."}
          </p>
        </div>
        {isEditing ? (
          <button onClick={handleNotes}>Save</button>
        ) : (
          <button onClick={handleNotes}>Edit</button>
        )}
      </div>
    </div>
  );
}
