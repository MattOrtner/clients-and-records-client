import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { getUnpaidSessions, updateSession } from "../sessions";
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

  const sessionsGroupedByClient = sessions.reduce((acc, session) => {
    const client_id = session.client_id;
    if (!acc[client_id]) {
      acc[client_id] = [];
    }
    acc[client_id].push(session);
    return acc;
  }, {});
  return { sessions, sessionsGroupedByClient };
}

const Payments = () => {
  const [user, _] = useOutletContext();
  const { sessions, sessionsGroupedByClient } = useLoaderData();

  return (
    <div className="h-full w-full sm:w-1/2 p-4 max-w-[900px]">
      <h1 className="text-3xl text-gray-800 font-serif mb-6 sm:text-5xl">
        Unpaid Sessions
      </h1>
      <div className="flex flex-col h-[85%] gap-2 overflow-scroll">
        {sessions.length > 0 ? (
          Object.keys(sessionsGroupedByClient).map((clientId) => (
            <Link to={`/${user.id}/clients/${clientId}`} key={clientId}>
              <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md border border-slate-200">
                <h2 className="text-lg font-bold sm:text-xl sm:font-semibold">
                  {sessionsGroupedByClient[clientId][0].first}{" "}
                  {sessionsGroupedByClient[clientId][0].last}
                </h2>
                {sessionsGroupedByClient[clientId].map((session) => (
                  <div
                    key={session.session_id}
                    className="flex justify-between items-center"
                  >
                    <h2 className="text-lg">{session.date}</h2>
                    <h2 className="text-lg">{session.time}</h2>
                  </div>
                ))}
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
