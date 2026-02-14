import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h2 className="font-bold text-lg">Admin Panel</h2>
        <button onClick={() => setIsOpen(true)} className="text-xl">
          ☰
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0
          h-full w-64
          bg-gray-900 text-white
          p-6 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Desktop Title */}
      
        <nav className="space-y-4">
          <Link
            to="/"
            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/blogs"
            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            All Blogs
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
