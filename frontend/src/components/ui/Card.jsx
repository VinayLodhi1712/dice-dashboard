export default function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}