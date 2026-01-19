export default function FormCard({
  index,
  form,
  isOnline,
  onChange,
  onResolve,
}) {
  const current = isOnline ? form.online : form.offline;

  const hasConflict =
    isOnline &&
    form.editedOffline &&
    (
      form.online.name !== form.offline.name ||
      form.online.gender !== form.offline.gender
    ) &&
    (
      form.online.name ||
      form.online.gender ||
      form.offline.name ||
      form.offline.gender
    );

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h3 className="font-semibold">Form {index + 1}</h3>

      <label className="text-sm">Name</label>
      <input
        className="w-full border px-3 py-2 rounded"
        value={current.name}
        onChange={(e) =>
          onChange(index, "name", e.target.value, isOnline)
        }
      />

      <label className="text-sm">Gender</label>
      <div className="flex gap-4">
        {["Male", "Female"].map((g) => (
          <label key={g} className="flex items-center gap-2">
            <input
              type="radio"
              checked={current.gender === g}
              onChange={() =>
                onChange(index, "gender", g, isOnline)
              }
            />
            {g}
          </label>
        ))}
      </div>

      {hasConflict && (
        <div className="bg-yellow-50 p-3 rounded border">
          <p className="text-sm mb-2">
            You edited this form while offline.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => onResolve(index, "online")}
              className="flex-1 border px-3 py-1 rounded"
            >
              Keep Online
            </button>

            <button
              onClick={() => onResolve(index, "offline")}
              className="flex-1 bg-black text-white px-3 py-1 rounded"
            >
              Keep Offline
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
