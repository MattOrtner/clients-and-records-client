import { NavLink } from "react-router-dom";
import standardTime from "../../../standardTime";

const AgendaSession = ({ session }) => {
  return (
    <NavLink to={`/contacts/${session.contactId}/sessions/${session.id}`}>
      <li
        className=" flex text-lg justify-between items-center border
              border-slate-300 rounded-md py-1 m w-full cursor-pointer"
      >
        <div className="pl-2 flex gap-2">
          <div>{session.first}</div>
          <div>{session.last}</div>
        </div>
        <div className="pr-2">{standardTime(session.time)}</div>
      </li>
    </NavLink>
  );
};
export default AgendaSession;
