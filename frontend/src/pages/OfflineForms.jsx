import  useOnlineStatus from "../hooks/useOnlineStatus";
import { useState } from "react";
import { loadForms, saveForms } from "../utils/offlineStorage";

export default function OfflineForms() {
  const [forms, setForms] = useState(loadForms());

  const isOnline = useOnlineStatus((wasOnline, nowOnline) => {
    setForms(prev => {
      let updated = prev;

      if (wasOnline && !nowOnline) {
        updated = prev.map(f => ({
          ...f,
          offline: { ...f.online },
          offlineBase: { ...f.online },
          offlineReady: true,
          editedOffline: false,
          showConflict: false,
        }));
      }

      if (!wasOnline && nowOnline) {
        updated = prev.map(f => {
          const changed =
            f.offline.name !== f.offlineBase.name ||
            f.offline.gender !== f.offlineBase.gender;

          return {
            ...f,
            showConflict: f.editedOffline && changed,
          };
        });
      }

      saveForms(updated);
      return updated;
    });
  });

  function updateField(i, field, value) {
    setForms(prev => {
      const updated = [...prev];
      const f = updated[i];

      if (isOnline) {
        f.online[field] = value;
      } else {
        f.offline[field] = value;
        f.editedOffline = true;
      }

      saveForms(updated);
      return updated;
    });
  }

  function resolve(i, keep) {
    setForms(prev => {
      const updated = [...prev];
      const f = updated[i];

      if (keep === "offline") {
        f.online = { ...f.offline };
      } else {
        f.offline = { ...f.online };
      }

      f.editedOffline = false;
      f.showConflict = false;
      f.offlineReady = false;

      saveForms(updated);
      return updated;
    });
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Offline / Online Forms</h1>

      <span
        className={`inline-block mb-6 px-3 py-1 rounded text-sm font-medium ${
          isOnline
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>

      <div className="grid md:grid-cols-3 gap-4">
        {forms.map((f, i) => {
          const data =
            !isOnline && f.offlineReady ? f.offline : f.online;

          return (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Form {i + 1}</h2>

              <label className="text-sm">Name</label>
              <input
                className="w-full border px-3 py-2 rounded mb-3"
                value={data.name}
                onChange={e =>
                  updateField(i, "name", e.target.value)
                }
              />

              <label className="text-sm">Gender</label>
              <div className="flex gap-4 mb-3">
                {["Male", "Female"].map(g => (
                  <label key={g} className="flex gap-2">
                    <input
                      type="radio"
                      checked={data.gender === g}
                      onChange={() =>
                        updateField(i, "gender", g)
                      }
                    />
                    {g}
                  </label>
                ))}
              </div>

              {f.showConflict && (
                <div className="mt-4 p-4 border rounded bg-yellow-50 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="border p-2 rounded bg-white">
                      <p className="font-medium mb-1">Online</p>
                      <p>Name: {f.online.name || "-"}</p>
                      <p>Gender: {f.online.gender || "-"}</p>
                    </div>

                    <div className="border p-2 rounded bg-white">
                      <p className="font-medium mb-1">Offline</p>
                      <p>Name: {f.offline.name || "-"}</p>
                      <p>Gender: {f.offline.gender || "-"}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 border px-3 py-2 rounded"
                      onClick={() => resolve(i, "online")}
                    >
                      Keep Online
                    </button>

                    <button
                      className="flex-1 bg-black text-white px-3 py-2 rounded"
                      onClick={() => resolve(i, "offline")}
                    >
                      Keep Offline
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
