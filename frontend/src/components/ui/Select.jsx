export default function Select({ label, options = [], className = "", ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className}`}
        {...props}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
}
