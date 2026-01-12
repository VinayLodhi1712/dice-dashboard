import { NavLink } from "react-router-dom";
import { sidebarItems } from "../../data/sidebar";
import logo from "/vite.svg";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r px-4 py-6">
      <div className="flex items-center gap-3 px-2 mb-10">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">Dice</span>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
