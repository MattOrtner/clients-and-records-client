import { mdiCheckCircleOutline, mdiEmoticonFrownOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { NavLink, useOutletContext } from "react-router-dom";
import reverseDate from "../../../reverseDate";
import sliceDate from "../../../slicedDate";

function Session({ session, contactId }) {
  const slicedDate = sliceDate(session.date);
  const reversedDate = reverseDate(slicedDate);
  const sessionId = session.id;
  const [user, _] = useOutletContext();

  return (
    <NavLink
      to={`/${user.id}/clients/${contactId}/sessions/${sessionId}`}
      className="flex justify-evenly items-center w-[90%]
      h-12 rounded-md border border-gray-300 gap-4"
    >
      <div className="py-2 px-4  font-verdana">
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
