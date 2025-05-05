import { useSubmit, Form, useLoaderData } from "react-router-dom";
import { getSession, updateSession } from "../sessions";
import { useState } from "react";

import NavBackButton from "./components/NavBackButton";
import SessionInfoCluster from "./components/SessionPage/sessionInfoCluster";

export async function loader({ params }) {
  const [session] = await getSession(params);
  return session;
}
export async function action({ request, params }) {
  const { clientId, sessionId } = params;
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);
  const updatedSession = await updateSession(clientId, sessionId, updatedData);
  return updatedSession;
}

export default function SessionPage() {
  const submit = useSubmit();
  const sessionData = useLoaderData();
  const [sessionNotes, setSessionNotes] = useState(sessionData.notes || "");
  const handleSave = ({ key, value }) => {
    submit({ [key]: value }, { method: "post" });
  };

  const handleNotes = (e) => {
    const value = e.target.value;
    setSessionNotes(value);
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 mt-4 px-4 overflow-visible sm:w-1/2 sm:h-4/5 sm:justify-center max-w-[800px]">
      <NavBackButton />
      <div className="text-right sm:flex sm:gap-8 sm:mb-4">
        <h2 className="text-3xl">{`${sessionData.first} ${sessionData.last}`}</h2>
      </div>
      <SessionInfoCluster sessionData={sessionData} handleSave={handleSave} />
      <Form method="post" className="h-[60%]">
        <div className="flex gap-8 mb-4">
          <h1 className="text-3xl">Notes</h1>
        </div>
        <textarea
          id="NOTES"
          placeholder="Add some session notes."
          value={sessionNotes}
          name="notes"
          onChange={handleNotes}
          className="outline-blue-300"
          onBlur={() => handleSave({ key: "notes", value: sessionNotes })}
        ></textarea>
      </Form>
    </div>
  );
}
