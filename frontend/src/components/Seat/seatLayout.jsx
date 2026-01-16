import SeatLegend from "./seatLegend";
import SeatGrid from "./seatGrid";
import plane from "../../assets/plane.svg";
import planetail from "../../assets/planetail.svg";

export default function SeatLayout({
  rows,
  selectedSeats,
  onSelect,
  onConfirm,
  showClose = false,
  onClose,
  footerFixed = false,
}) {
  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-[#ffece5] p-4 rounded-lg relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Select Seat</h2>
        {showClose && (
          <button onClick={onClose} className="text-sm">
            ✕ Close
          </button>
        )}
      </div>

      <SeatLegend />

      <div className="flex justify-center">
        <div className="w-[360px] flex flex-col items-center">
          <img src={plane} className="w-full" />

          <div className="bg-white rounded-b-[6px] rounded-t-[6px] px-2 py-4 shadow-sm">
            <SeatGrid
              rows={rows}
              selectedSeats={selectedSeats}
              onSelect={onSelect}
            />
          </div>

          <img src={planetail} className="w-full" />
        </div>
      </div>

      <div
        className={`${
          footerFixed ? "fixed bottom-0 left-0 w-full" : "mt-4"
        } bg-white p-4 flex justify-between border-t`}
      >
        <div className="font-medium">Seat Charges ₹{totalAmount}</div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={onConfirm}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Select
        </button>
      </div>
    </div>
  );
}
