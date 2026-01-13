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
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
      className="bg-white p-5 rounded w-[400px] outline-none"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button onClick={onClose}>X</button>
      </div>

      {children}
    </Modal>
  );
}
