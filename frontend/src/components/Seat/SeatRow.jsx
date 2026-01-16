import SeatItem from "./SeatItem";

export default function SeatRow({ rowSeats, selectedSeats, onSelect }) {
  const isExitRow = rowSeats.some((s) => s.isExitRow);

  return (
    <div className="flex items-center justify-center">
      {isExitRow && (
        <div className="w-6 flex justify-center">
          <div className="bg-red-600 text-white text-[10px] px-1 py-3 rounded">
            EXIT
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {rowSeats.slice(0, 3).map((seat) => (
          <SeatItem
            key={seat.id}
            seat={seat}
            selected={selectedSeats.some((s) => s.id === seat.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="w-6" />

      <div className="flex gap-2">
        {rowSeats.slice(3, 6).map((seat) => (
          <SeatItem
            key={seat.id}
            seat={seat}
            selected={selectedSeats.some((s) => s.id === seat.id)}
            onSelect={onSelect}
          />
        ))}
      </div>

      {isExitRow && (
        <div className="w-6 flex justify-center">
          <div className="bg-red-600 text-white text-[10px] px-1 py-3 rounded">
            EXIT
          </div>
        </div>
      )}
    </div>
  );
}
