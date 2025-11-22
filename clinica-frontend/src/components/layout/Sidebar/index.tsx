import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/patients", label: "Patients", icon: "👥" },
  { path: "/vital-records", label: "Vital Records", icon: "❤️" },
  { path: "/alerts", label: "Alerts", icon: "🔔" },
];

export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { logout } = useAuth();
  if (typeof window !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }

  return (
    <>
      <aside
        className={`
    bg-white border-r border-gray-200 z-50 flex flex-col justify-between

    /* MOBILE drawer */
    fixed inset-y-0 left-0 w-64 transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    /* DESKTOP: fixo, altura máxima 100vh, sempre visível */
    md:fixed md:top-16 md:left-0 md:h-[calc(100vh-4rem)] md:w-64 md:translate-x-0
  `}
      >
        <div className="overflow-y-auto p-4 flex-1">
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-2xl"
          >
            ✕
          </button>

          <nav className="space-y-2 mt-8 md:mt-0">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            className="w-full text-left text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
