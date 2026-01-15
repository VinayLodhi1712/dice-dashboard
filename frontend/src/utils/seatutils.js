export function groupSeatsByRow(seats) {
    const rows = {};
  
    seats.forEach((seat) => {
      if (!rows[seat.row]) {
        rows[seat.row] = [];
      }
      rows[seat.row].push(seat);
    });
  
    return Object.entries(rows).map(([rowNumber, seats]) => ({
      rowNumber,
      seats: seats.sort((a, b) => a.column - b.column),
    }));
  }
  