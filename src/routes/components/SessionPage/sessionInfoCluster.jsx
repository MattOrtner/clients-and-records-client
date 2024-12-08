import { useState } from "react";
import { Form } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import sliceDate from "../../../slicedDate";

function SessionInfoCluster({ date, time, paid, handleSave }) {
  const slicedDate = sliceDate(date);
  const [selectedDate, setSelectedDate] = useState(slicedDate);

  const [selectedTime, setSelectedTime] = useState(time);
  const [isSessionPaid, setIsSessionPaid] = useState(paid);
  const [isDelete, setisDelete] = useState(false);

  const handlePaid = () => {
    setIsSessionPaid(!isSessionPaid);
    if (isSessionPaid) {
      handleSave({ key: "paid", value: "" });
    } else {
      handleSave({ key: "paid", value: "on" });
    }
  };

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
            <Icon
              path={mdiCheckCircleOutline}
              size={1.25}
              onClick={handlePaid}
              color="green"
            />
          ) : (
            <Icon
              path={mdiMinusCircleOutline}
              onClick={handlePaid}
              size={1.25}
              color="red"
            />
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

export default SessionInfoCluster;
