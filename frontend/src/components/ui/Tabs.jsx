export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b flex gap-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-2 text-sm font-medium transition ${
            activeTab === tab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
