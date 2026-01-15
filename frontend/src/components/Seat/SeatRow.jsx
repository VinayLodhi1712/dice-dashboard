import SeatItem from "./seatItem";

export default function SeatRow({ row, selectedSeat, onSelect }) {
  return (
    <div className="flex gap-2 justify-center mb-2">
      {row.seats.map((seat) => (
        <SeatItem
          key={seat.code}
          seat={seat}
          selected={selectedSeat?.code === seat.code}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
