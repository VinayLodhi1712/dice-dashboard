export default function SeatItem({ seat, selected, onSelect }) {
    const isDisabled = seat.booked || !seat.inPolicy;
  
    let base =
      "w-10 h-10 rounded text-xs flex items-center justify-center border";
  
    if (isDisabled) base += " bg-gray-200 text-gray-400";
    else if (selected) base += " bg-green-600 text-white";
    else base += " bg-white hover:bg-green-100";
  
    return (
      <button
        disabled={isDisabled}
        onClick={() => onSelect(seat)}
        className={base}
      >
        {seat.code}
      </button>
    );
  }
  