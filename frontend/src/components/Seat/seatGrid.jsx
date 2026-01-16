import SeatRow from "./SeatRow";

export default function SeatGrid({ rows, selectedSeats, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {rows.map((rowSeats, idx) => (
        <SeatRow
          key={idx}
          rowSeats={rowSeats}
          selectedSeats={selectedSeats}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
