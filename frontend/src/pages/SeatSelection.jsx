import { useState } from "react";
import seatMapData from "../data/seatMap.json";
import { groupSeatsByRow } from "../utils/seatutils";
import SeatModal from "../components/Seat/seatModal";

export default function SeatSelection() {
  const [open, setOpen] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = seatMapData.seatMap.map[0].seats;
  const rows = groupSeatsByRow(seats);

  return (
    <SeatModal
      open={open}
      onClose={() => setOpen(false)}
      rows={rows}
      selectedSeat={selectedSeat}
      onSelect={setSelectedSeat}
    />
  );
}
