import { useState } from "react";
import Navbar from "../Navbar";
import { Sidebar } from "../Sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className={`
            flex-1 mt-16 p-6 transition-all duration-300
            ${sidebarOpen ? "ml-64 md:ml-64" : "ml-0 md:ml-64"}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
