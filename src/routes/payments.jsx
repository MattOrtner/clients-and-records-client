import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { getUnpaidSessions } from "../sessions";
import sliceDate from "../slicedDate";
import reverseDate from "../reverseDate";
import formatSessionTime from "../formatSessionTime";

export async function loader({ params }) {
  const sessions = await getUnpaidSessions(params.userId);
  sessions.forEach((session) => {
    session.date = sliceDate(session.date);
    session.date = reverseDate(session.date);
    session.time = formatSessionTime(session.time);
  });
  return sessions;
}

const Payments = () => {
  const [user, _] = useOutletContext();
  const sessions = useLoaderData();

  return (
    <div className="h-full w-full p-4">
      <h1 className="text-4xl flex justify-between text-gray-800 font-serif mb-10">
        Unpaid Sessions
      </h1>
      <div className="flex flex-col h-[85%] overflow-scroll">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <Link
              to={`/${user.id}/clients/${session.client_id}`}
              key={session.session_id}
            >
              <div className="flex flex-col gap-2 mb-4 p-4 bg-white rounded-lg shadow-md border border-slate-200">
                <h2 className="text-lg font-bold">{`${session.first} ${session.last}`}</h2>
                <div className="flex justify-between px-2">
                  <h2 className="text-lg">{session.date}</h2>
                  <h2 className="text-lg">{session.time}</h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-4xl w-full h-full flex justify-center items-center gap-8">
            <div>🎉</div>
            <div>🥳</div>
            <div>🎊</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Payments;
