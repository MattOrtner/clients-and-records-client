export default function Landing() {
  return (
    <div className="flex justify-center items-center gap-2 h-full w-full bg-slate-400">
      <div className="text-3xl text-white pl-8">Hello World.</div>
      <div className="flex-1 bg-blue-500">
        <ul>
          <li>Todos</li>
          <li>Todays Schedule</li>
          <li>Past due</li>
        </ul>
      </div>
    </div>
  );
}
