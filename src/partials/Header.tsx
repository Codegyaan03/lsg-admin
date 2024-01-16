import React, { useState } from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import UserMenu from "./header/UserMenu";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({
  setSidebarOpen,
  setSidebarExpanded,
}) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="sticky top-0 bg-white rounded-2xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <button
            className="flex"
            onClick={() => {
              setSidebarOpen((prev) => !prev);
              setSidebarExpanded((prev) => !prev);
            }}
          >
            <HiOutlineMenuAlt2 className={"icon"} />
          </button>

          {/* Header: Right side */}
          <div className="flex items-center">
            <button
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && "bg-slate-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSearchModalOpen(true);
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <HiOutlineSearch className={"icon"} />
            </button>
            <SearchModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            />
            <Notifications />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
