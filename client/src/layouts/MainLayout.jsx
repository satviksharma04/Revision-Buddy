import {
  BookOpen,
  FileText,
  Home,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";


const MainLayout = ({ children }) => {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);


  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully.");

    navigate("/login");

  };


  const closeMobile = () => {
    setMobileOpen(false);
  };


  return (

    <div className="min-h-screen bg-[#f7f7fb]">


      {/* =========================================
          Desktop Sidebar
      ========================================== */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">

        <div className="flex h-full flex-col">


          {/* Logo */}

          <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <BookOpen size={19} />
            </div>

            <div>

              <p className="text-sm font-bold text-gray-900">
                Revision Buddy
              </p>

              <p className="text-[11px] text-gray-400">
                Study smarter
              </p>

            </div>

          </div>


          {/* Navigation */}

          <nav className="flex-1 px-3 py-6">

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Workspace
            </p>


            <NavItem
              to="/"
              icon={<Home size={17} />}
              label="Dashboard"
            />


            <NavItem
              to="/upload"
              icon={<FileText size={17} />}
              label="Upload PDF"
            />


            <NavItem
              to="/topic"
              icon={<BookOpen size={17} />}
              label="Enter Topic"
            />

          </nav>


          {/* Bottom */}

          <div className="border-t border-gray-100 p-3">

            <NavItem
              to="/profile"
              icon={<UserRound size={17} />}
              label="Profile"
            />


            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >

              <LogOut size={17} />

              Logout

            </button>

          </div>

        </div>

      </aside>


      {/* =========================================
          Mobile Header
      ========================================== */}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:hidden">

        <div className="flex items-center gap-2.5">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen size={17} />
          </div>

          <span className="text-sm font-bold text-gray-900">
            Revision Buddy
          </span>

        </div>


        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50"
        >
          <Menu size={20} />
        </button>

      </header>


      {/* =========================================
          Mobile Menu
      ========================================== */}

      {mobileOpen && (

        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeMobile}
          />


          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">

            <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">

              <span className="text-sm font-semibold text-gray-900">
                Menu
              </span>

              <button
                type="button"
                onClick={closeMobile}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50"
              >
                <X size={19} />
              </button>

            </div>


            <nav className="p-4">

              <NavItem
                to="/"
                icon={<Home size={17} />}
                label="Dashboard"
                onClick={closeMobile}
              />

              <NavItem
                to="/upload"
                icon={<FileText size={17} />}
                label="Upload PDF"
                onClick={closeMobile}
              />

              <NavItem
                to="/topic"
                icon={<BookOpen size={17} />}
                label="Enter Topic"
                onClick={closeMobile}
              />

              <NavItem
                to="/profile"
                icon={<UserRound size={17} />}
                label="Profile"
                onClick={closeMobile}
              />

            </nav>


            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-4">

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600"
              >

                <LogOut size={17} />

                Logout

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =========================================
          Main Content
      ========================================== */}

      <main className="px-5 py-8 sm:px-8 lg:ml-64 lg:px-10 lg:py-10">

        {children}

      </main>

    </div>

  );
};


/* =========================================
   Navigation Item
========================================= */

const NavItem = ({
  to,
  icon,
  label,
  onClick,
}) => {

  return (

    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        mb-1
        flex
        items-center
        gap-3
        rounded-lg
        px-3
        py-2.5
        text-sm
        font-medium
        transition
        ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
    >

      {icon}

      {label}

    </NavLink>

  );
};


export default MainLayout;