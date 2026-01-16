import parseSeatCode from "./parseseatutils";

export function normalizeSeat(seat) {
  const parsed = parseSeatCode(seat.code);
   const columnLetter = String.fromCharCode(64 + seat.column);

  return {
    id: seat.code,
    row: seat.row,
    column: seat.column,

    label: parsed.label || `${seat.row}-${columnLetter}`,
    price: parsed.price || seat.amount || 0,

    isBooked: seat.booked,
    isEmpty: seat.empty,

    isExitRow: seat.exitRow,
    isExtraLegroom: parsed.hasExtraLegroom || seat.legroom,

    isOutOfPolicy: seat.inPolicy === false,

    isFree:
      seat.amount === 0 &&
      seat.booked === false &&
      seat.inPolicy === true,
  };
}

export function groupSeatsByRow(seats = []) {
  if (!Array.isArray(seats)) return [];

  const rows = {};
  seats.forEach((seat) => {
    if (!rows[seat.row]) rows[seat.row] = [];
    rows[seat.row].push(seat);
  });

  return Object.values(rows).map((row) =>
    row.sort((a, b) => a.column - b.column)
  );
}
