import AgendaSession from "./AgendaSession";

const Agenda = ({ sessions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Today's Agenda:
        </h2>
        <ul className="flex flex-col gap-2">
          {sessions && sessions.length ? (
            sessions.map((session) => (
              <AgendaSession session={session} key={session.id} />
            ))
          ) : (
            <li className="text-gray-500 text-center py-4 bg-gray-100 rounded-lg">
              No sessions scheduled for today.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Agenda;
