export default function Seat({ seat, selected, onSelect }) {
  const isDisabled = seat.booked || seat.empty;

  let base =
    "w-9 h-9 rounded border text-xs flex items-center justify-center transition";

  switch (true) {
    case seat.booked:
      base += " bg-gray-200 text-gray-400 cursor-not-allowed";
      break;

    case !seat.inPolicy:
      base += " bg-red-100 border-red-400 cursor-not-allowed";
      break;

    case seat.exitRow:
      base += " bg-green-100 border-green-500 cursor-pointer";
      break;

    case seat.legroom:
      base += " bg-green-50 border-green-400 cursor-pointer";
      break;

    default:
      base += " bg-white border-gray-300 hover:bg-blue-50 cursor-pointer";
  }

  if (selected) {
    base += " bg-green-600 text-white border-green-700";
  }

  return (
    <button
      disabled={isDisabled}
      onClick={() => onSelect(seat)}
      className={base}
      title={seat.code}
    >
      {seat.row}-{String.fromCharCode(64 + seat.column)}
    </button>
  );
}
