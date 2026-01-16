import { useEffect } from "react";
export default function Toast({ show, message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
      <div className="flex items-center gap-3 bg-green-600 text-white px-4 py-3 rounded-md shadow-lg">
        <span className="bg-white text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
          ✓
        </span>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
