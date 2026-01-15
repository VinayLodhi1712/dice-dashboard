import SeatLegend from "./seatLegend";
import SeatGrid from "./seatGrid";

export default function SeatModal({
  open,
  onClose,
  rows,
  selectedSeat,
  onSelect,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-[900px] rounded-lg p-4">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Select Seat</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <SeatLegend />

        <SeatGrid
          rows={rows}
          selectedSeat={selectedSeat}
          onSelect={onSelect}
        />

        <div className="flex justify-between mt-4 border-t pt-3">
          <span>
            Seat Charges ₹{selectedSeat?.amount || 0}
          </span>
          <button className="bg-black text-white px-6 py-2 rounded">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
