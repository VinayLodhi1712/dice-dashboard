export default function SeatLegend() {
  return (
    <div className="flex gap-4 text-xs mb-4 flex-wrap items-center">
      <LegendUnavailable />
      <LegendFree />
      <LegendOutOfPolicy />
      <LegendExit />
      <LegendXL />
    </div>
  );
}

function LegendUnavailable() {
  return (
    <LegendWrapper label="Unavailable">
      <div className="w-4 h-4 rounded bg-gray-300" />
    </LegendWrapper>
  );
}

function LegendFree() {
  return (
    <LegendWrapper label="Free Seat">
      <div className="relative w-4 h-4 rounded border border-gray-300 bg-white">
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-green-500 rounded-t" />
      </div>
    </LegendWrapper>
  );
}

function LegendOutOfPolicy() {
  return (
    <LegendWrapper label="Out of policy">
      <div className="relative w-4 h-4 rounded border border-gray-300 bg-white">
        <span className="absolute top-0 left-0 w-full h-[3px] bg-red-500 rounded-t" />
      </div>
    </LegendWrapper>
  );
}

function LegendExit() {
  return (
    <LegendWrapper label="Exit Row">
      <div className="w-4 h-4 rounded bg-green-100 border border-green-600" />
    </LegendWrapper>
  );
}

function LegendXL() {
  return (
    <LegendWrapper label="Extra Legroom">
      <div className="relative w-4 h-4 rounded border border-gray-300 bg-white">
        <span className="absolute -top-2 -right-2 bg-black text-white text-[7px] px-[2px] rounded">
          XL
        </span>
      </div>
    </LegendWrapper>
  );
}

function LegendWrapper({ label, children }) {
  return (
    <div className="flex items-center gap-1">
      {children}
      <span className="text-gray-800">{label}</span>
    </div>
  );
}
