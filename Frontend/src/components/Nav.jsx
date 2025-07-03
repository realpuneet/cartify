import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Nav = () => {
  const user = useSelector((state) => state.user.user);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const baseLink = "block text-xl px-4 py-2 hover:text-blue-500 transition-colors";
  const activeLink = "text-red-500 underline";
  const inactiveLink = "text-gray-800";

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center bg-gradient-to-b from-[#C0E4F5] via-[#B6DDF2] to-[#c0edf2] px-5 py-4 shadow-md relative">
        
        {/* Logo */}
        <span className="text-2xl font-bold">
          Ca<span className="text-red-600">r</span>tify
        </span>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
            About
          </NavLink>
          {user ? (
            <>
              <NavLink to="/settings" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                Profile
              </NavLink>
              {user?.isAdmin && (
                <NavLink to="/create-product" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                  Create Product
                </NavLink>
              )}
              <NavLink to="/cart" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                Carts
              </NavLink>
            </>
          ) : (
            <NavLink to="/signin" className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
              Signin
            </NavLink>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-gray-700">
            {showMenu ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Sidebar for Mobile */}
        <div className={`fixed top-0 right-0 h-full w-60 bg-white shadow-lg p-5 z-50 transform transition-transform ${showMenu ? "translate-x-0" : "translate-x-full"}`}>
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">
              Ca<span className="text-red-600">r</span>tify
            </span>
            <button onClick={toggleMenu} className="text-2xl">
              <IoClose />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
              About
            </NavLink>
            {user ? (
              <>
                <NavLink to="/settings" onClick={toggleMenu} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                  Profile
                </NavLink>
                {user?.isAdmin && (
                  <NavLink to="/create-product" onClick={toggleMenu} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                    Create Product
                  </NavLink>
                )}
                <NavLink to="/cart" onClick={toggleMenu} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                  Carts
                </NavLink>
              </>
            ) : (
              <NavLink to="/signin" onClick={toggleMenu} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                Signin
              </NavLink>
            )}
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
