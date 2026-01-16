export default function SeatItem({ seat, selected, onSelect }) {
  const disabled = seat.isBooked || seat.isEmpty;

  const displayLabel =
    seat.label && seat.label.includes("-")
      ? seat.label
      : `${seat.row}-${String.fromCharCode(64 + seat.column)}`;

  let base =
    "relative w-10 h-10 rounded-md text-xs flex items-center justify-center font-medium transition";

  switch (true) {
    case disabled:
      base += " bg-gray-300 text-gray-500 cursor-not-allowed";
      break;

    case selected:
      base += " bg-green-600 text-white border border-green-700";
      break;

    case seat.isExitRow:
      base += " bg-green-100 border border-green-600";
      break;

    default:
      base += " bg-white border border-gray-300 hover:bg-blue-50 cursor-pointer";
  }

  return (
    <div
      className={base}
      onClick={() => !disabled && onSelect(seat)}
      title={`₹${seat.price}`}
    >
      {!selected && seat.isFree && (
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-green-500 rounded-t-md" />
      )}

      {!selected && seat.isOutOfPolicy && (
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-red-500 rounded-t-md" />
      )}

      {seat.isExtraLegroom && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] px-1 rounded">
          XL
        </span>
      )}

      {displayLabel}
    </div>
  );
}
