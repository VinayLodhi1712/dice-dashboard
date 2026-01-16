import seatData from "../data/seatMap.json";
import { normalizeSeat, groupSeatsByRow } from "../utils/seatutils";
import { useState } from "react";
import SeatLayout from "../components/Seat/seatLayout";
import TicketConfirmModal from "../components/Seat/TicketConfirmModal";
import Card from "../components/ui/Card";
import Toast from "../components/ui/Toast";

export default function SeatSelection() {
  const rawSeats = seatData.seatMap.map[0].seats;
  const rows = groupSeatsByRow(rawSeats.map(normalizeSeat));

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSelect = (seat) => {
    setSelectedSeats((prev) =>
      prev.some((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalAmount = selectedSeats.reduce(
    (sum, s) => sum + s.price,
    0
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Flight Booking</h1>

      <Card
        onClick={() => setSeatModalOpen(true)}
        className="p-5 cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Indore → Pune</h2>
            <p className="text-sm text-gray-500">
              Select seats & confirm booking
            </p>

            {selectedSeats.length > 0 && (
              <p className="text-sm mt-2">
                Seats: <b>{selectedSeats.length}</b> · ₹{totalAmount}
              </p>
            )}
          </div>

          <button className="bg-black text-white px-5 py-2 rounded">
            Book Ticket
          </button>
        </div>
      </Card>

      {seatModalOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/40 flex justify-center items-start overflow-y-auto">
          <div className="bg-white w-[900px] rounded-lg my-6 max-h-[90vh] flex flex-col">
            <SeatLayout
              rows={rows}
              selectedSeats={selectedSeats}
              onSelect={handleSelect}
              showClose
              onClose={() => setSeatModalOpen(false)}
              onConfirm={() => {
                setSeatModalOpen(false);
                setConfirmModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* CONFIRM MODAL */}
      <TicketConfirmModal
        open={confirmModalOpen}
        totalAmount={totalAmount}
        seatCount={selectedSeats.length}
        onCancel={() => {
          setConfirmModalOpen(false);
          setSeatModalOpen(true); 
        }}
        onConfirm={() => {
          setConfirmModalOpen(false);
          setSeatModalOpen(false); 
          setSelectedSeats([]);    
          setShowToast(true);      
        }}
      />
      <Toast
        show={showToast}
        message="Ticket booked successfully"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
