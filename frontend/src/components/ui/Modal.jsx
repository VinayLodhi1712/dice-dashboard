import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AppModal({
  isOpen,
  onClose,
  title,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-md p-6 w-full max-w-md max-h-[80vh] overflow-y-auto outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div>{children}</div>
    </Modal>
  );
}
