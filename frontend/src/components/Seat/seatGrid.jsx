import SeatRow from "./SeatRow";

export default function SeatGrid({ rows, selectedSeat, onSelect }) {
  return (
    <div className="overflow-y-auto max-h-[70vh] px-4">
      {rows.map((row) => (
        <SeatRow
          key={row.rowNumber}
          row={row}
          selectedSeat={selectedSeat}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
