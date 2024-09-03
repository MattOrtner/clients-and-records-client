import { useSubmit, Form, useLoaderData } from "react-router-dom";
import { getSession, updateSession } from "../sessions";
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
  const updatedData = Object.fromEntries(formData);
  console.log("updatedData", updatedData);
  const updatedSession = await updateSession(contactId, sessionId, updatedData);
  return updatedSession;
}

export default function SessionPage() {
  const { session } = useLoaderData();
  const submit = useSubmit();
  const { date, time, paid, notes } = session;
  const [sessionNotes, setSessionNotes] = useState(notes);

  const handleSave = ({ key, value }) => {
    submit({ [key]: value }, { method: "post" });
  };

  const handleNotes = (e) => {
    const value = e.target.value;

    setSessionNotes(value);
  };

  return (
    <div className="flex flex-col w-full gap-8 mt-8 h-full px-4">
      <NavBackButton />
      <SessionInfoCluster
        date={date}
        time={time}
        paid={paid}
        handleSave={handleSave}
      />
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

function SessionInfoCluster({ date, time, paid, handleSave }) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);
  const [isSessionPaid, setIsSessionPaid] = useState(paid);
  const [isDelete, setisDelete] = useState(false);

  const newTime = standardTime(time);

  return (
    <div className="flex flex-col w-full items-end text-xl">
      <Form
        method="post"
        action="update"
        className="flex flex-col items-end gap-2"
      >
        <input
          aria-label="date"
          type="date"
          name="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          onBlur={() => handleSave({ key: "date", value: selectedDate })}
        ></input>
        <div className="flex gap-2 font text-2xl">
          <input
            type="time"
            name="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            onBlur={() => handleSave({ key: "time", value: selectedTime })}
          />
        </div>
        <div className="flex gap-2">
          <h2 className="text-xl">Paid:</h2>
          {isSessionPaid ? (
            <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
          ) : (
            <Icon path={mdiMinusCircleOutline} size={1.25} color="red" />
          )}
        </div>
      </Form>
      {isDelete ? (
        <Form method="post" action="delete" className="pt-2">
          <button type="submit">Confirm</button>
        </Form>
      ) : (
        <button
          type="button"
          onClick={() => setisDelete(!isDelete)}
          className="mt-2"
        >
          Delete
        </button>
      )}
    </div>
  );
}
