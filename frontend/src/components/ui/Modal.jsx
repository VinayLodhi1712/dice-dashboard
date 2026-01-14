"use client"

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 pointer-events-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
              ✕
            </button>
          </div>
          {/* Content */}
          {children}
        </div>
      </div>
    </>
  )
}
