import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../../data/sidebar";

function MenuItem({ item, collapsed, onMobileClose, level = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      setIsOpen(!isOpen);
      onMobileClose();
    } else if (!hasChildren) {
      onMobileClose();
    }
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const indentWidth = level * 20; // 20px per level

  return (
    <div>
      {/* Parent/Child Item */}
      <NavLink
        to={item.path || "#"}
        onClick={handleClick}
        className={({ isActive }) =>
          `block py-2.5 text-[15px] transition-colors duration-150 relative ${
            isActive && !hasChildren
              ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
              : "text-gray-800 hover:bg-gray-50"
          } ${collapsed && level === 0 ? "flex items-center justify-center" : ""}`
        }
        style={!collapsed ? { paddingLeft: `${16 + indentWidth}px`, paddingRight: '16px' } : {}}
        title={collapsed ? item.name : ""}
      >
        {collapsed && level === 0 ? (
          <span className="text-lg font-semibold">{item.name.charAt(0)}</span>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span>{item.name}</span>
            {!collapsed && hasChildren && (
              <button
                onClick={handleIconClick}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label={isOpen ? "Collapse" : "Expand"}
              >
                <svg
                  className="w-4 h-4 text-gray-500 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        )}
      </NavLink>

      {/* Children Items - Recursive */}
      {!collapsed && isOpen && hasChildren && (
        <div>
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              collapsed={collapsed}
              onMobileClose={onMobileClose}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
        className={`h-screen bg-white border-r py-6 transition-all duration-300 
          ${collapsed ? "w-20 px-2" : "w-64 px-0"}
          md:relative md:translate-x-0
          fixed top-0 left-0 z-40
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto scrollbar-thin
        `}
        style={{ 
          maxHeight: '100vh',
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBD5E0 transparent'
        }}
      >
        <div
          className={`flex items-center mb-8 ${
            collapsed ? "justify-center" : "justify-between px-5"
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

        <nav>
          {sidebarItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              collapsed={collapsed}
              onMobileClose={() => setMobileOpen(false)}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}