import React, { useState, useRef, useEffect } from 'react';
import { Code2, ChevronDown, Menu, LogOut, Settings } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = ({ onLogout, onEditPlatforms }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) onLogout();
  };

  const handleEditPlatforms = () => {
    setIsDropdownOpen(false);
    if (onEditPlatforms) onEditPlatforms();
  };

  return (
    <nav className="bg-white shadow-md border-b border-slate-200">
      <div className="container px-1 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo*/}
          <div className="flex items-center">
            <div className="p-1 rounded-lg bg-blue-100 mr-2">
              <img src={logo} alt="CodeProfile Logo" className="w-10 h-10" />
            </div>
            <h1
              className="text-3xl text-black-600 tracking-tight mt-2"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              CodeProfile
            </h1>
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className=""
            >

              <Menu
                className={`w-10 h-7 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : ''
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                <button
                  onClick={handleEditPlatforms}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors duration-150 text-left"
                >
                  <div className="p-1.5 bg-blue-100 rounded">
                    <Settings className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Edit Platforms</span>
                </button>

                <div className="h-px bg-slate-200"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors duration-150 text-left"
                >
                  <div className="p-1.5 bg-red-100 rounded">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-red-600 font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;