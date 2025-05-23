import { mdiCheckCircleOutline, mdiCurrencyUsdOff } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink, useOutletContext } from "react-router-dom";
import reverseDate from "../../../reverseDate";
import sliceDate from "../../../slicedDate";
import formatSessionTime from "../../../formatSessionTime";

function Session({ session, contactId }) {
  const slicedDate = sliceDate(session.date);
  const sessionDate = reverseDate(slicedDate);
  const sessionId = session.id;
  const sessionTime = formatSessionTime(session.time);
  const [user, _] = useOutletContext();

  return (
    <NavLink
      to={`/${user.id}/clients/${contactId}/sessions/${sessionId}`}
      className="flex justify-evenly items-center w-[90%] sm:w-[40%] max-w-[500px] h-12 rounded-md border border-gray-300 gap-4"
    >
      <div className="font-verdana">{sessionDate}</div>
      <div className="font-verdana">
        <p>{sessionTime}</p>
      </div>
      <>
        {session.paid ? (
          <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
        ) : (
          <Icon path={mdiCurrencyUsdOff} size={1.25} color="red" />
        )}
      </>
    </NavLink>
  );
}

export default Session;
