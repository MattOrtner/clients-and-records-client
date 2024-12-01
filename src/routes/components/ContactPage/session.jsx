import { mdiCheckCircleOutline, mdiEmoticonFrownOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink } from "react-router-dom";
import reverseDate from "../../../reverseDate";

function Session({ session, contactId }) {
  const slicedDate = session.date.slice(0, 10);
  const reversedDate = reverseDate(slicedDate);
  const sessionId = session.id;
  return (
    <NavLink
      to={`/contacts/${contactId}/sessions/${sessionId}`}
      className="flex justify-evenly items-center w-[90%]
      h-12 rounded-md border border-gray-300 gap-4 font-verdana"
    >
      <div className="py-2 px-4 rounded-md">
        <p>{reversedDate}</p>
      </div>
      <p>
        {session.paid ? (
          <Icon path={mdiCheckCircleOutline} size={1.25} color="green" />
        ) : (
          <Icon path={mdiEmoticonFrownOutline} size={1.25} color="red" />
        )}
      </p>
    </NavLink>
  );
}

export default Session;
