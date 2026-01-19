const KEY = "offline_online_forms_final_clean";

export function loadForms() {
  const saved = localStorage.getItem(KEY);
  if (saved) return JSON.parse(saved);

  const initial = Array.from({ length: 3 }, () => ({
    online: { name: "", gender: "" },
    offline: { name: "", gender: "" },
    offlineBase: { name: "", gender: "" },
    offlineReady: false,
    editedOffline: false,
    showConflict: false,
  }));

  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

export function saveForms(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
