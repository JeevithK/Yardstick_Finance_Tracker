import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-purple-600 text-white px-6 py-4 rounded-b-2xl shadow-md">
      <div className="flex items-center justify-between">
        {/* Left - Title */}
        <h1 className="text-2xl font-bold">💰 Finance Tracker</h1>

        {/* Right - Buttons */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-white text-purple-700 font-semibold px-5 py-2 rounded-xl hover:bg-purple-100 transition"
          >
            🏠 Home
          </Link>
          <Link
            to="/setbudget"
            className="bg-white text-purple-700 font-semibold px-5 py-2 rounded-xl hover:bg-purple-100 transition"
          >
            📝 Set Budget
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
