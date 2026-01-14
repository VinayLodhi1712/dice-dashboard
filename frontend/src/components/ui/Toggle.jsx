export default function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}