import Modal from "react-modal";

export default function TicketConfirmModal({
  open,
  onCancel,
  onConfirm,
  totalAmount,
  seatCount,
}) {
  return (
    <Modal
      isOpen={open}
      className="bg-white rounded-lg p-6 w-[400px] mx-auto mt-40 outline-none"
      overlayClassName="fixed inset-0 bg-black/50 z-[9999]"
    >
      <h2 className="text-lg font-semibold mb-4">Confirm Ticket</h2>

      <p className="text-sm mb-2">
        Seats Selected: <b>{seatCount}</b>
      </p>

      <p className="text-sm mb-6">
        Total Price: <b>₹{totalAmount}</b>
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}
