export default function ConflictResolver({ online, offline, onResolve }) {
  return (
    <div className="mt-4 border rounded bg-yellow-50 p-3 text-sm">
      <p className="font-semibold mb-3 text-yellow-800">
        You edited this form while offline.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white p-2 border rounded">
          <b>Online</b>
          <p>Name: {online.name || "-"}</p>
          <p>Gender: {online.gender || "-"}</p>
        </div>

        <div className="bg-white p-2 border rounded">
          <b>Offline</b>
          <p>Name: {offline.name || "-"}</p>
          <p>Gender: {offline.gender || "-"}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onResolve("online")}
          className="flex-1 border px-3 py-2 rounded"
        >
          Keep Online
        </button>

        <button
          onClick={() => onResolve("offline")}
          className="flex-1 bg-black text-white px-3 py-2 rounded"
        >
          Keep Offline
        </button>
      </div>
    </div>
  );
}
