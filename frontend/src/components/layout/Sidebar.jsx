import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../../data/sidebar";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border text-gray-600 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`min-h-screen bg-white border-r py-6 transition-all duration-300 
          ${collapsed ? "w-20 px-3" : "w-64 px-5"}
          md:relative md:translate-x-0
          fixed top-0 left-0 z-40
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className={`flex items-center mb-10 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Dice</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-2 transition-colors hidden md:block ${
              collapsed ? "mx-auto" : ""
            }`}
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {collapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              )}
            </svg>
          </button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-center rounded-lg py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                } ${collapsed ? "px-0" : "px-4 justify-start"}`
              }
              title={collapsed ? item.name : ""}
            >
              {collapsed ? (
                <span className="text-lg font-semibold">
                  {item.name.charAt(0)}
                </span>
              ) : (
                <span>{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
