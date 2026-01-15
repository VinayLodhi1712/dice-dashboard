export default function SimpleModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-[380px] p-4">
          
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
