export default function SeatLegend() {
    return (
      <div className="flex gap-4 text-xs mb-4">
        <span>⬜ Free</span>
        <span>⬛ Unavailable</span>
        <span className="text-green-600">⬤ Selected</span>
        <span>EXIT</span>
        <span>XL</span>
      </div>
    );
  }
  