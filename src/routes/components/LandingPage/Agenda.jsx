import CurrentDay from "../../../currentDay";
import AgendaSession from "./AgendaSession";

const Agenda = ({ sessions }) => {
  return (
    <>
      <h1 className="text-4xl text-center font-serif">Happy {CurrentDay}</h1>
      <div className="p-2">
        <div>
          <h2 className="text-2xl pb-2 font-serif">Today's Agenda:</h2>
          <ul className="flex flex-col">
            {sessions.length ? (
              sessions.map((session) => (
                <AgendaSession session={session} key={session.id} />
              ))
            ) : (
              <li
                className=" flex text-lg justify-between items-center border
              border-slate-300 rounded-md py-1 m w-full"
              >
                <div className="pl-2">No sessions today 🤗</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Agenda;
