export default function Button({
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}
